/**
 * @file Diamond Treesitter
 * @author Elisabeth Wenger-Stickel <ewengerstickel@protonmail.com>
 * @license GPLv3
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "diamond",

  extras: $ => [
    $.comment,
    /[ \t\r\n]+/,
  ],

  rules: {
    program: $ => repeat($.stmt_or_expr),

    stmt_or_expr: $ => choice($.stmt, $.expr),

    stmt: $ => seq($.expr, ";"),

    expr: $ => choice(
      $.match_expr,
      $.for_expr,
      $.func_def_expr,
      $.assign_expr,
      $.func_expr,
      $.grouping,
      $.value
    ),

    grouping: $ => seq(
      "{",
      repeat($.stmt_or_expr),
      optional($.redirect),
      "}"
    ),

    redirect: $ => seq("<", $.expr),

    // -------------------
    // function definition
    // -------------------
    func_def_expr: $ => seq(
      "let",
      optional("~internal"),
      $.ident,
      "(",
      optional($.func_def_args),
      ")",
      optional($.func_def_ret),
      "=",
      $.expr
    ),

    func_def_args: $ => seq(
      $.func_arg,
      repeat(seq(",", $.func_arg))
    ),

    func_arg: $ => seq($.ident, ":", $.type_name),

    func_def_ret: $ => seq(":", $.type_name),

    // -------------------
    // function call
    // -------------------
    func_expr: $ => seq(
      $.ident,
      "(",
      optional($.func_call_args),
      ")",
      optional("!")
    ),

    func_call_args: $ => seq(
      $.expr,
      repeat(seq(",", $.expr))
    ),

    // -------------------
    // assignment
    // -------------------
    assign_expr: $ => seq(
      "let",
      $.ident,
      "=",
      $.expr
    ),

    // -------------------
    // match
    // -------------------
    match_expr: $ => seq(
      "match",
      "(",
      $.expr,
      ")",
      "{",
      optional(seq($.match_arm, repeat(seq(",", $.match_arm)), optional(","))),
      "}"
    ),

    match_arm: $ => seq(
      $.result_branch,
      $.ident,
      "=",
      $.expr
    ),

    result_branch: _ => choice("ok", "err"),

    // -------------------
    // for
    // -------------------
    for_expr: $ => seq(
      "for",
      "(",
      $.for_inner,
      ")",
      $.expr
    ),

    for_inner: $ => seq($.ident, "in", $.expr),

    // -------------------
    // types
    // -------------------
    type_name: $ => choice(
      $.type_array,
      $.result_type,
      $.atomic_type
    ),

    type_array: $ => seq("[", $.type_name, "]"),

    result_type: $ => seq(
      "result",
      "(",
      $.type_name,
      ",",
      $.type_name,
      ")"
    ),

    atomic_type: _ => choice(
      "integer",
      "stream",
      "string",
      "file",
      "unit",
      "unret",
      "any"
    ),

    // -------------------
    // values
    // -------------------
    value: $ => choice(
      $.ident,
      $.integer,
      $.string_lit,
      $.array_lit,
      $.unit_lit
    ),

    array_lit: $ => seq(
      "[",
      optional($.func_call_args),
      "]"
    ),

    unit_lit: _ => "()",

    string_lit: $ => seq(
      "\"",
      repeat(/[^"]/),
      "\""
    ),

    ident: _ => /[a-zA-Z][a-zA-Z0-9_]*/,

    integer: _ => /[0-9]+/,

    comment: _ => token(seq("#", /.*/)),
  }
});
