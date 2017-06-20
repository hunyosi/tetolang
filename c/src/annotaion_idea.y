
%token NAME

%

lang:	declarations defines
	;

declarations:	declaration declarations
	|
	;

declaration:	annotations ';'
	;

annotations:	annotation annotations
	;

annotation:	'@' NAME annotation_param
	;

annotation_param:	'(' annotation_args ')'
	|
	;

annotation_args:
	annotation_args_no_name ',' annotation_args_with_name ','
	| annotation_args_no_name ',' annotation_args_with_name
	| annotation_args_no_name
	| annotation_args_no_name ','
	| annotation_args_with_name
	| annotation_args_with_name ','
	|
	;

annotation_args_no_name:
	annotation_arg_no_name ',' annotation_args_no_name
	| annotation_arg_no_name
	;

annotation_arg_no_name:	constant_expression
	;

annotation_args_no_names:
	annotation_arg_no_name ',' annotation_args_no_names
	| annotation_arg_no_name
	;

annotation_args_with_name:
	annotation_arg_with_name ',' annotation_args_with_name
	| annotation_arg_with_name
	|
	;

annotation_arg_with_name:	NAME ':' constant_expression
	;

%

void yyerror(const char *msg)
{

}
