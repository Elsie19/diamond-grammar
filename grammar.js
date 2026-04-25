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
    /\s/,
    $.comment,
  ],

  word: $ => $.ident,

  rules: {
    source_file: $ => repeat($.stmt),

    stmt: $ => seq($.expr, ';'),

    expr: $ => choice(
      $.match_expr,
      $.for_expr,
      $.func_def_expr,
      $.assign_expr,
      $.call_expr,
      $.rust_expr,
      $.grouping_expr,
      $.value
    ),

    func_def_expr: $ => seq(
      'let',
      optional($.internal),
      $.func_name,
      '(',
      optional($.func_def_args),
      ')',
      optional($.func_def_ret),
      '=',
      $.expr
    ),

    internal: $ => token('~internal'),

    func_name: $ => seq('@', $.ident),

    func_def_ret: $ => seq(':', $.type_name),

    func_def_args: $ => seq(
      $.func_arg,
      repeat(seq(',', $.func_arg))
    ),

    func_arg: $ => seq($.ident, ':', $.type_name),

    grouping_expr: $ => seq(
      '{',
      repeat($.stmt),
      optional($.expr),
      '}',
      optional($.redirect)
    ),

    call_expr: $ => seq(
      $.func_name,
      '(',
      optional($.func_call_args),
      ')',
      optional($.result_unwrap)
    ),

    func_call_args: $ => seq(
      $.expr,
      repeat(seq(',', $.expr))
    ),

    type_name: $ => choice(
      $.type_array,
      $.result_type,
      $.atomic_type
    ),

    type_array: $ => seq('[', $.type_name, ']'),

    atomic_type: $ => choice(
      'integer',
      'stream',
      'string',
      'file',
      'unit',
      'unret'
    ),

    result_type: $ => seq(
      'result',
      '(',
      $.type_name,
      ',',
      $.type_name,
      ')'
    ),

    value: $ => choice(
      $.ident,
      $.integer,
      $.string_lit,
      $.array_lit,
      $.unit_lit
    ),

    string_lit: $ => seq('"', repeat(/[^"]/), '"'),

    array_lit: $ => seq(
      '[',
      optional($.func_call_args),
      ']'
    ),

    unit_lit: $ => seq('(', ')'),

    assign_expr: $ => seq(
      'let',
      $.ident,
      '=',
      $.expr
    ),

    match_expr: $ => seq(
      'match',
      '(',
      $.expr,
      ')',
      '{',
      $.match_arm,
      repeat(seq(',', $.match_arm)),
      optional(','),
      '}'
    ),

    match_arm: $ => seq(
      $.result_branch,
      $.ident,
      '=',
      $.expr
    ),

    result_branch: $ => choice('ok', 'err'),

    result_unwrap: $ => '!',

    for_expr: $ => seq(
      'for',
      '(',
      $.for_inner,
      ')',
      $.expr
    ),

    for_inner: $ => seq(
      $.ident,
      'in',
      $.expr
    ),

    rust_expr: $ => seq(
      'rust',
      '{',
      choice($.stmt, $.expr),
      '}'
    ),

    redirect: $ => seq('<', $.expr),

    ident: $ => /[a-zA-Z][a-zA-Z0-9_]*/,
    integer: $ => /\d+/,

    comment: $ => token(seq('#', /.*/)),
  }
});
