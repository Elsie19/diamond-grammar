[
  (program)
  (grouping)
  (match_expr)
  (for_expr)
] @indent

"}" @outdent
")" @outdent
"]" @outdent

; indent after opening braces
"{" @indent.begin
"(" @indent.begin
"[" @indent.begin
