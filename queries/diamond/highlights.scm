; keywords
"let" @keyword
"match" @keyword
"for" @keyword
"in" @keyword

"ok" @keyword
"err" @keyword
"result" @type.builtin

; types
(atomic_type) @type.builtin
(type_name) @type

; functions
(func_def_expr (ident) @function)
(func_expr (ident) @function.call)

; literals
(integer) @number
(string_lit) @string
(unit_lit) @constant.builtin

; punctuation
";" @punctuation.delimiter
"," @punctuation.delimiter
"(" @punctuation.bracket
")" @punctuation.bracket
"{" @punctuation.bracket
"}" @punctuation.bracket
"[" @punctuation.bracket
"]" @punctuation.bracket

; comments
(comment) @comment
