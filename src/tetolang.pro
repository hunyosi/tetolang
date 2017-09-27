:- include('ttp_utils.pro').
:- include('ttp_loadutils.pro').
:- include('ttp_chrtype.pro').
:- include('ttp_anabrackets.pro').
:- include('ttp_convcomment.pro').
:- include('ttp_convemptyline.pro').
:- include('ttp_convindent.pro').
:- include('ttp_lex.pro').
:- include('ttp_op.pro').
:- include('ttp_stx.pro').

:- initialization(main).

make_src_file(FileName) :-
	open(FileName, write, OutStream),
	write(OutStream, '## test program'), nl(OutStream),
	write(OutStream, '123 + 234'), nl(OutStream),
	close(OutStream),
	!.

eval_program(FileName) :-
	ttp_load_all_utf8(FileName, Data1),
	ttp_convcomment(Data1, Data2),
	ttp_convemptyline(Data2, Data3),
	ttp_convindent(Data3, Data4),
	ttp_lex_tokens(Data4, [], Tokens),
	ttp_stx_expr(Tokens, _, STree),
	write(STree), nl,
	!.

exec_test(FileName) :-
	make_src_file(FileName),
	eval_program(FileName),
	!.

main :-
	write('tetolang'), nl,
	exec_test('../tmp_test_ptogram.tl'),
	halt.
