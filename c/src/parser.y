%{
#include <stdio.h>

#include "type.h"
#include "variable.h"
#include "nametbl.h"
#include "utils.h"
#include "strutils.h"
#include "psrscnr.h"

int yylex();
void yyerror(const char *msg);

YYSTYPE globalSyntaxTree;

%}

%token WORD_IF WORD_ELSE
%token WORD_RETURN WORD_BREAK WORD_CONTINUE
%token WORD_FOR WORD_WHILE WORD_DO
%token OP_LOR OP_LXOR OP_LAND
%token OP_EQ OP_NE OP_LE OP_GE
%token OP_SHIFTL OP_SHIFTR
%token OP_PLUSEQ OP_MINUSEQ OP_MULEQ OP_DIVEQ
%token OP_SHIFTLEQ OP_SHIFTREQ
%token OP_OREQ OP_XOREQ OP_ANDEQ
%token OP_PLUSPLUS OP_MINUSMINUS
%token PRIMITIVE_TYPE
%token VAL_INT
%token NAME


%%

program
	: statements
		{ globalSyntaxTree = $1; }
	;

statements
	: statements statement
		{
			if ($2 != NULL) $$ = STreeElmNode_add($1, $2);
			else $$ = STreeElmNode_new($1, NULL);
		}
	|
		{ $$ = NULL; }
	;

statement
	: binding_statement
	| expression
	;

binding_statement
	: NAME ':' expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_defineName, $1, $3); }
	;

/*
	: if_statement
	| assignment_statement
	| expression
	| define_variable_statement
	| define_constant_statement
	| loop_statement
	;
*/
/*
define_variable_statement
	: NAME ':' PRIMITIVE_TYPE
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_defineName, $1, $3); }
	;


loop_statement
	: NAME ':' loop_statement_body
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_defineName, $1, $3); }
	| loop_statement_body
	;

loop_statement_body
	: for_statement
	| while_statement
	| do_statement
	;

do_statement
	: WORD_DO statement_on_loop_body WORD_WHILE '(' loop_condition_part ')'
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stDo, $5, $2); }
	| WORD_DO statement_on_loop_body
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stDo, NULL, $2); }
	;

for_statement
	: WORD_FOR '(' loop_init_part ';'
			loop_condition_part ';'
			loop_step_part ')' statement_on_loop
		{ $$ = STreeElmSyntax_newL3R(
			SyntaxKind_stFor, $3, $5, $7, $9); }
	;

while_statement
	: WORD_WHILE '(' loop_condition_part ')' statement_on_loop
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stWhile, $3, $5); }
	;

loop_init_part
	: loop_init_part ',' loop_init_part_term
		{ if ($3 != NULL) $$ = STreeElmNode_add($1, $3); }
	| loop_init_part_term
		{ $$ = STreeElmNode_new($1, NULL); }
	;

loop_init_part_term
	: assignment_statement
	| define_variable_statement
	|
		{ $$ = NULL; }
	;

loop_condition_part
	: loop_step_part ',' logical_expression
		{ $$ = STreeElmNode_new($1, $3); }
	| logical_expression
		{ $$ = STreeElmNode_new(NULL, $1); }
	|
		{ $$ = NULL; }
	;

loop_step_part
	: loop_step_part ',' loop_step_part_term
		{ if ($3 != NULL) $$ = STreeElmNode_add($1, $3); }
	| loop_step_part_term
		{ $$ = STreeElmNode_new($1, NULL); }
	;

loop_step_part_term
	: assignment_statement
	|
		{ $$ = NULL; }
	;


statement_on_loop
	: statement_on_loop_body
	|
		{ $$ = NULL; }
	;

statement_on_loop_body
	: if_statement
	| assignment_statement
	| expression
	;


if_statement
	: WORD_IF '(' logical_expression ')' statement_on_if_not_if
			WORD_ELSE statement_on_if
		{ $$ = STreeElmSyntax_newL2R(
				SyntaxKind_stIf, $3, $5, $7); }
	| WORD_IF '(' logical_expression ')' statement_on_if
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stIf, $3, $5); }
	;

statement_on_if
	: statement_on_if_not_if
	| if_statement
	;

statement_on_if_not_if
	: return_statement
	| break_statement
	| continue_statement
	| assignment_statement
	|
	;

return_statement
	: WORD_RETURN value_expression
		{ $$ = STreeElmSyntax_new(SyntaxKind_stReturn, $2); }
	;

break_statement
	: WORD_BREAK '(' NAME ')' value_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stBreak, $3, $5); }
	| WORD_BREAK '(' ')' value_expression
		{ $$ = STreeElmSyntax_newLR(
				SyntaxKind_stBreak, NULL, $4); }
	| WORD_BREAK '(' NAME ')'
		{ $$ = STreeElmSyntax_newLR(
				SyntaxKind_stBreak, $3, NULL); }
	| WORD_BREAK '(' ')'
		{ $$ = STreeElmSyntax_newLR(
				SyntaxKind_stBreak, NULL, NULL); }
	| WORD_BREAK
		{ $$ = STreeElmSyntax_newLR(
				SyntaxKind_stBreak, NULL, NULL); }
	;

continue_statement
	: WORD_CONTINUE '(' NAME ')'
		{ $$ = STreeElmSyntax_new(SyntaxKind_stContinue, $3); }
	| WORD_CONTINUE '(' ')'
		{ $$ = STreeElmSyntax_new(SyntaxKind_stContinue, NULL); }
	| WORD_CONTINUE
		{ $$ = STreeElmSyntax_new(SyntaxKind_stContinue, NULL); }
	;

assignment_statement
	: lvalue '=' expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stAssignment, $1, $3); }
	| lvalue OP_PLUSEQ expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stPlusEq, $1, $3); }
	| lvalue OP_MINUSEQ expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stMinusEq, $1, $3); }
	| lvalue OP_MULEQ expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stMulEq, $1, $3); }
	| lvalue OP_DIVEQ expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stDivEq, $1, $3); }
	| lvalue OP_SHIFTLEQ expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stShiftLEq, $1, $3); }
	| lvalue OP_SHIFTREQ expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stShiftREq, $1, $3); }
	| lvalue OP_OREQ expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stOrEq, $1, $3); }
	| lvalue OP_XOREQ expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stXorEq, $1, $3); }
	| lvalue OP_ANDEQ expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_stAndEq, $1, $3); }
	| lvalue OP_PLUSPLUS
		{ $$ = STreeElmSyntax_new(SyntaxKind_stPlusPlus, $1); }
	| OP_PLUSPLUS lvalue
		{ $$ = STreeElmSyntax_new(SyntaxKind_stPlusPlus, $2); }
	| lvalue OP_MINUSMINUS
		{ $$ = STreeElmSyntax_new(SyntaxKind_stMinusMinus, $1); }
	| OP_MINUSMINUS lvalue
		{ $$ = STreeElmSyntax_new(SyntaxKind_stMinusMinus, $2); }
	;
*/
expression
	: value_expression
/*
	: if_expression
*/
	;
/*
if_expression
	: WORD_IF '(' logical_expression ')'
		logical_expression
		WORD_ELSE if_expression
		{ $$ = STreeElmSyntax_newL2R(SyntaxKind_opIf, $3, $5, $7); }
	| logical_expression
	;
*/
/*
logical_expression
	: logical_or_expression
	;

logical_or_expression
	: logical_or_expression OP_LOR logical_xor_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opLogicalOr, $1, $3); }
	| logical_xor_expression
	;

logical_xor_expression
	: logical_xor_expression OP_LXOR logical_and_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opLogicalXor, $1, $3); }
	| logical_and_expression
	;

logical_and_expression
	: logical_and_expression OP_LAND logical_expression_term
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opLogicalAnd, $1, $3); }
	| logical_expression_term
	;

logical_expression_term
	: relational_expression
	;

relational_expression
	: relational_equal_operator
	| relational_not_equal_operator
	| relational_less_than_or_equal_operator
	| relational_less_than_operator
	| relational_grater_than_or_equal_operator
	| relational_grater_than_operator
	| value_expression
	;

relational_equal_operator
	: relational_expression OP_EQ value_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opEqual, $1, $3); }
	;

relational_not_equal_operator
	: relational_expression OP_NE value_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opNotEqual, $1, $3); }
	;

relational_less_than_or_equal_operator
	: relational_expression OP_LE value_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opLessOrEq, $1, $3); }
	;

relational_less_than_operator
	: relational_expression '<' value_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opLessThan, $1, $3); }
	;

relational_grater_than_or_equal_operator
	: relational_expression OP_GE value_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opGraterOrEq, $1, $3); }
	;

relational_grater_than_operator
	: relational_expression '>' value_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opGraterThan, $1, $3); }
	;
*/

value_expression
	: plus_minus_expression
	;
/*
	: shift_expression
	;

shift_expression
	: shift_expression OP_SHIFTL or_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opShiftL, $1, $3); }
	| shift_expression OP_SHIFTR or_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opShiftR, $1, $3); }
	| or_expression
	;

or_expression
	: or_expression '|' xor_expression
		{ $$ = STreeElmSyntax_newLR(
				SyntaxKind_opVerticalLine, $1, $3); }
	| xor_expression
	;

xor_expression
	: xor_expression '^' and_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opCircumflex, $1, $3); }
	| and_expression
	;

and_expression
	: and_expression '&' plus_minus_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opAmpersand, $1, $3); }
	| plus_minus_expression
	;
*/

plus_minus_expression
	: plus_minus_expression '+' multiply_divide_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opPlus, $1, $3); }
	| plus_minus_expression '-' multiply_divide_expression
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opMinus, $1, $3); }
	| multiply_divide_expression
	;

multiply_divide_expression
	: multiply_divide_expression '*' term
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opAsterisk, $1, $3); }
	| multiply_divide_expression '/' term
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opSlash, $1, $3); }
	| multiply_divide_expression '%' term
		{ $$ = STreeElmSyntax_newLR(SyntaxKind_opPercent, $1, $3); }
	| term
	;

term
	: variable_reference
	| VAL_INT
/*
	: '(' expression ')'
		{ $$ = STreeElmSyntax_new(SyntaxKind_opParen, $2); }
	| '{' statements '}'
		{ $$ = $2; }
	| '!' term
		{ $$ = STreeElmSyntax_new(SyntaxKind_opLogicalNot, $2); }
	| '~' term
		{ $$ = STreeElmSyntax_new(SyntaxKind_prefixOpBitNot, $2); }
	| '-' term
		{ $$ = STreeElmSyntax_new(SyntaxKind_prefixOpMinus, $2); }
	| '+' term
		{ $$ = STreeElmSyntax_new(SyntaxKind_prefixOpPlus, $2); }
	| lvalue
	| VAL_INT
*/
	;

variable_reference
	: NAME
		{ $$ = STreeElmSyntax_new(SyntaxKind_referName, $1); }
	;

%%

void yyerror(const char *msg)
{
	fprintf(stderr, "%s\n", msg);
}
