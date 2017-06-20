:- include('ttp_utils.pro').
:- include('ttp_lex.pro').
:- include('ttp_op.pro').
:- include('ttp_stx.pro').

:- initialization(main).


main :-
	write('tetolang'), nl,
	ttp_lex_tokens("123 + 234.", [], Tokens),
	ttp_stx_expr(Tokens, _, STree),
	write(STree), nl,
	halt.
