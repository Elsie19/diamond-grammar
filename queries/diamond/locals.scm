(func_def_expr
  (func_name (ident) @local.definition.function))

(func_arg
  (ident) @local.definition.parameter)

(assign_expr
  (ident) @local.definition.var)

(match_arm
  (ident) @local.definition.var)

(ident) @local.reference
