[
  "let" "match" "for" "in" "rust"
] @keyword

[
  "ok" "err"
] @keyword

(internal) @attribute

(func_def_expr
  (func_name (ident) @function))

(call_expr
  (func_name (ident) @function.call))

(ident) @variable

(atomic_type) @type.builtin
(type_name) @type

(integer) @number
(string_lit) @string
(unit_lit) @constant

(match_arm
  (ident) @variable.parameter)

(result_unwrap) @operator

[
  "=" "<"
] @operator

"," @punctuation.delimiter
";" @punctuation.delimiter

[
  "(" ")" "{" "}" "[" "]"
] @punctuation.bracket

(comment) @comment
