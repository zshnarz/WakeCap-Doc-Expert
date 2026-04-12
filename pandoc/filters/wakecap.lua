-- WakeCap Documentation Lua Filter for Pandoc 3.9+
-- Transforms fenced divs into properly styled DOCX elements using raw OpenXML.
--
-- Safety panels:  ::: {.danger|.warning|.caution|.notice}
-- Callout boxes:  ::: {.note|.tip|.important}
-- [TBD] markers:  highlighted in bold
--
-- All styled elements are rendered as raw OpenXML single-cell tables
-- so they display correctly in Word without custom reference.docx styles.

local SAFETY_LEVELS = {
  danger  = { word = "DANGER",  bg = "BD2024", fg = "FFFFFF" },
  warning = { word = "WARNING", bg = "FF7900", fg = "000000" },
  caution = { word = "CAUTION", bg = "EED202", fg = "000000" },
  notice  = { word = "NOTICE",  bg = "004488", fg = "FFFFFF" }
}

local CALLOUT_TYPES = {
  note      = { label = "NOTE",      bg = "EFF6FF", border = "3B82F6", fg = "2563EB" },
  tip       = { label = "TIP",       bg = "F0FDF4", border = "22C55E", fg = "16A34A" },
  important = { label = "IMPORTANT", bg = "FDF4FF", border = "A855F7", fg = "9333EA" }
}

---------------------------------------------------------------------------
-- XML helpers
---------------------------------------------------------------------------

local function esc(s)
  return s:gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;")
end

--- Convert Pandoc inlines to OpenXML runs.
local function inlines_to_xml(inlines)
  local out = {}
  for _, el in ipairs(inlines) do
    if el.t == "Str" then
      out[#out+1] = '<w:r><w:t xml:space="preserve">'
        .. esc(el.text) .. '</w:t></w:r>'
    elseif el.t == "Space" then
      out[#out+1] = '<w:r><w:t xml:space="preserve"> </w:t></w:r>'
    elseif el.t == "SoftBreak" then
      out[#out+1] = '<w:r><w:t xml:space="preserve"> </w:t></w:r>'
    elseif el.t == "LineBreak" then
      out[#out+1] = '<w:r><w:br/></w:r>'
    elseif el.t == "Strong" then
      out[#out+1] = '<w:r><w:rPr><w:b/><w:bCs/></w:rPr>'
        .. '<w:t xml:space="preserve">'
        .. esc(pandoc.utils.stringify(el))
        .. '</w:t></w:r>'
    elseif el.t == "Emph" then
      out[#out+1] = '<w:r><w:rPr><w:i/><w:iCs/></w:rPr>'
        .. '<w:t xml:space="preserve">'
        .. esc(pandoc.utils.stringify(el))
        .. '</w:t></w:r>'
    elseif el.t == "Code" then
      out[#out+1] = '<w:r><w:rPr>'
        .. '<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/>'
        .. '<w:sz w:val="18"/><w:szCs w:val="18"/>'
        .. '</w:rPr><w:t xml:space="preserve">'
        .. esc(el.text) .. '</w:t></w:r>'
    elseif el.t == "Subscript" then
      out[#out+1] = '<w:r><w:rPr><w:vertAlign w:val="subscript"/></w:rPr>'
        .. '<w:t xml:space="preserve">'
        .. esc(pandoc.utils.stringify(el))
        .. '</w:t></w:r>'
    elseif el.t == "Superscript" then
      out[#out+1] = '<w:r><w:rPr><w:vertAlign w:val="superscript"/></w:rPr>'
        .. '<w:t xml:space="preserve">'
        .. esc(pandoc.utils.stringify(el))
        .. '</w:t></w:r>'
    else
      -- Fallback: stringify
      out[#out+1] = '<w:r><w:t xml:space="preserve">'
        .. esc(pandoc.utils.stringify(el))
        .. '</w:t></w:r>'
    end
  end
  return table.concat(out)
end

--- Convert a list of Pandoc blocks to OpenXML paragraphs.
local function blocks_to_xml(blocks)
  local out = {}
  for _, block in ipairs(blocks) do
    if block.t == "Para" or block.t == "Plain" then
      out[#out+1] = '<w:p><w:pPr>'
        .. '<w:spacing w:before="0" w:after="60"/>'
        .. '</w:pPr>'
        .. inlines_to_xml(block.content)
        .. '</w:p>'
    elseif block.t == "BulletList" then
      for _, item in ipairs(block.content) do
        for _, b in ipairs(item) do
          if b.t == "Para" or b.t == "Plain" then
            out[#out+1] = '<w:p><w:pPr>'
              .. '<w:pStyle w:val="ListBullet"/>'
              .. '<w:spacing w:before="0" w:after="40"/>'
              .. '</w:pPr>'
              .. inlines_to_xml(b.content)
              .. '</w:p>'
          end
        end
      end
    elseif block.t == "OrderedList" then
      for _, item in ipairs(block.content) do
        for _, b in ipairs(item) do
          if b.t == "Para" or b.t == "Plain" then
            out[#out+1] = '<w:p><w:pPr>'
              .. '<w:pStyle w:val="ListNumber"/>'
              .. '<w:spacing w:before="0" w:after="40"/>'
              .. '</w:pPr>'
              .. inlines_to_xml(b.content)
              .. '</w:p>'
          end
        end
      end
    else
      -- Fallback
      out[#out+1] = '<w:p><w:pPr>'
        .. '<w:spacing w:before="0" w:after="60"/>'
        .. '</w:pPr>'
        .. '<w:r><w:t xml:space="preserve">'
        .. esc(pandoc.utils.stringify(block))
        .. '</w:t></w:r></w:p>'
    end
  end
  return table.concat(out)
end

---------------------------------------------------------------------------
-- Strip leading signal word from content
---------------------------------------------------------------------------

--- Remove "**SIGNAL_WORD:**" or "SIGNAL_WORD:" prefix from the first paragraph.
local function strip_signal(blocks, word)
  if #blocks == 0 then return blocks end
  local first = blocks[1]
  if first.t ~= "Para" and first.t ~= "Plain" then return blocks end

  local inlines = first.content
  if #inlines == 0 then return blocks end

  local idx = 1
  local el = inlines[idx]

  -- Case 1: **WORD:** or **WORD**
  if el.t == "Strong" then
    local txt = pandoc.utils.stringify(el)
    if txt:match("^" .. word .. ":?$") then
      idx = idx + 1
      -- Skip trailing space, dash, colon
      while idx <= #inlines do
        local nxt = inlines[idx]
        if nxt.t == "Space" or nxt.t == "SoftBreak" then
          idx = idx + 1
        elseif nxt.t == "Str" and nxt.text:match("^[:%-%—]$") then
          idx = idx + 1
        else
          break
        end
      end
    end
  -- Case 2: plain WORD:
  elseif el.t == "Str" and el.text:match("^" .. word .. ":?$") then
    idx = idx + 1
    while idx <= #inlines do
      local nxt = inlines[idx]
      if nxt.t == "Space" then idx = idx + 1
      else break end
    end
  end

  if idx == 1 then return blocks end -- nothing stripped

  local new_inlines = pandoc.List()
  for i = idx, #inlines do
    new_inlines:insert(inlines[i])
  end

  local new_blocks = pandoc.List()
  if #new_inlines > 0 then
    new_blocks:insert(pandoc.Para(new_inlines))
  end
  for i = 2, #blocks do
    new_blocks:insert(blocks[i])
  end
  return new_blocks
end

---------------------------------------------------------------------------
-- Panel builders (raw OpenXML)
---------------------------------------------------------------------------

--- Build a safety panel: colored header row + content row in a single-cell table.
local function safety_panel(level, info, blocks)
  local clean = strip_signal(blocks, info.word)
  local body_xml = blocks_to_xml(clean)

  local xml = string.format(
[[<w:tbl>
<w:tblPr>
<w:tblW w:w="5000" w:type="pct"/>
<w:tblBorders>
<w:top w:val="single" w:sz="8" w:space="0" w:color="%s"/>
<w:left w:val="single" w:sz="8" w:space="0" w:color="%s"/>
<w:bottom w:val="single" w:sz="8" w:space="0" w:color="%s"/>
<w:right w:val="single" w:sz="8" w:space="0" w:color="%s"/>
<w:insideH w:val="none" w:sz="0" w:space="0" w:color="auto"/>
<w:insideV w:val="none" w:sz="0" w:space="0" w:color="auto"/>
</w:tblBorders>
</w:tblPr>
<w:tblGrid><w:gridCol/></w:tblGrid>
<w:tr>
<w:tc>
<w:tcPr>
<w:shd w:val="clear" w:color="auto" w:fill="%s"/>
<w:tcMar>
<w:top w:w="40" w:type="dxa"/>
<w:left w:w="160" w:type="dxa"/>
<w:bottom w:w="40" w:type="dxa"/>
<w:right w:w="160" w:type="dxa"/>
</w:tcMar>
</w:tcPr>
<w:p>
<w:pPr><w:spacing w:before="0" w:after="0"/></w:pPr>
<w:r>
<w:rPr>
<w:b/><w:bCs/>
<w:color w:val="%s"/>
<w:sz w:val="20"/><w:szCs w:val="20"/>
<w:rFonts w:ascii="Source Sans Pro" w:hAnsi="Source Sans Pro"/>
</w:rPr>
<w:t xml:space="preserve">%s</w:t>
</w:r>
</w:p>
</w:tc>
</w:tr>
<w:tr>
<w:tc>
<w:tcPr>
<w:tcMar>
<w:top w:w="80" w:type="dxa"/>
<w:left w:w="160" w:type="dxa"/>
<w:bottom w:w="80" w:type="dxa"/>
<w:right w:w="160" w:type="dxa"/>
</w:tcMar>
</w:tcPr>
%s
</w:tc>
</w:tr>
</w:tbl>]],
    info.bg, info.bg, info.bg, info.bg,  -- borders
    info.bg,                               -- header fill
    info.fg,                               -- header text color
    info.word,                             -- signal word
    body_xml                               -- content
  )

  -- Spacer paragraphs before/after for breathing room
  return pandoc.List({
    pandoc.RawBlock('openxml',
      '<w:p><w:pPr><w:spacing w:before="80" w:after="0"/>'
      .. '<w:rPr><w:sz w:val="8"/></w:rPr></w:pPr></w:p>'),
    pandoc.RawBlock('openxml', xml),
    pandoc.RawBlock('openxml',
      '<w:p><w:pPr><w:spacing w:before="0" w:after="80"/>'
      .. '<w:rPr><w:sz w:val="8"/></w:rPr></w:pPr></w:p>')
  })
end

--- Build a callout box: thick colored left border, light background, label + content.
local function callout_box(ctype, info, blocks)
  local clean = strip_signal(blocks, info.label)
  local body_xml = blocks_to_xml(clean)

  -- Label paragraph
  local label_xml = string.format(
    '<w:p><w:pPr><w:spacing w:before="0" w:after="40"/></w:pPr>'
    .. '<w:r><w:rPr><w:b/><w:bCs/><w:color w:val="%s"/>'
    .. '<w:sz w:val="20"/><w:szCs w:val="20"/>'
    .. '<w:rFonts w:ascii="Source Sans Pro" w:hAnsi="Source Sans Pro"/>'
    .. '</w:rPr><w:t>%s</w:t></w:r></w:p>',
    info.fg, info.label)

  local xml = string.format(
[[<w:tbl>
<w:tblPr>
<w:tblW w:w="5000" w:type="pct"/>
<w:tblBorders>
<w:top w:val="single" w:sz="4" w:space="0" w:color="E0E0E0"/>
<w:left w:val="single" w:sz="18" w:space="0" w:color="%s"/>
<w:bottom w:val="single" w:sz="4" w:space="0" w:color="E0E0E0"/>
<w:right w:val="single" w:sz="4" w:space="0" w:color="E0E0E0"/>
<w:insideH w:val="none" w:sz="0" w:space="0" w:color="auto"/>
<w:insideV w:val="none" w:sz="0" w:space="0" w:color="auto"/>
</w:tblBorders>
</w:tblPr>
<w:tblGrid><w:gridCol/></w:tblGrid>
<w:tr>
<w:tc>
<w:tcPr>
<w:shd w:val="clear" w:color="auto" w:fill="%s"/>
<w:tcMar>
<w:top w:w="80" w:type="dxa"/>
<w:left w:w="160" w:type="dxa"/>
<w:bottom w:w="80" w:type="dxa"/>
<w:right w:w="160" w:type="dxa"/>
</w:tcMar>
</w:tcPr>
%s
%s
</w:tc>
</w:tr>
</w:tbl>]],
    info.border,    -- left border color
    info.bg,        -- cell background
    label_xml,      -- label paragraph
    body_xml        -- content
  )

  return pandoc.List({
    pandoc.RawBlock('openxml',
      '<w:p><w:pPr><w:spacing w:before="80" w:after="0"/>'
      .. '<w:rPr><w:sz w:val="8"/></w:rPr></w:pPr></w:p>'),
    pandoc.RawBlock('openxml', xml),
    pandoc.RawBlock('openxml',
      '<w:p><w:pPr><w:spacing w:before="0" w:after="80"/>'
      .. '<w:rPr><w:sz w:val="8"/></w:rPr></w:pPr></w:p>')
  })
end

---------------------------------------------------------------------------
-- Filters
---------------------------------------------------------------------------

function Div(el)
  local classes = el.classes

  -- Safety panels
  for level, info in pairs(SAFETY_LEVELS) do
    if classes:includes(level) then
      return safety_panel(level, info, el.content)
    end
  end

  -- Callout boxes
  for ctype, info in pairs(CALLOUT_TYPES) do
    if classes:includes(ctype) then
      return callout_box(ctype, info, el.content)
    end
  end

  return nil  -- pass through unchanged
end

--- Highlight [TBD] placeholders in bold.
function Str(el)
  if el.text == "[TBD]" then
    return pandoc.Strong({ pandoc.Str("[TBD]") })
  end
  return nil
end

--- Set default language metadata.
function Meta(meta)
  if not meta.lang then
    meta.lang = pandoc.MetaInlines({ pandoc.Str("en-US") })
  end
  return meta
end
