; function definitions define a scope
(func_def_expr
  (ident) @definition.function)

(func_def_expr
  (func_arg
    (ident) @definition.parameter))

; match binds a variable
(match_arm
  _ (ident) @definition.var)

; for-loop binding
(for_inner
  (ident) @definition.var)

; references
(ident) @reference
