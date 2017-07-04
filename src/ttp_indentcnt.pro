
/*
ttp_indentcnt(X, Y) :-
	!.

ttp_indentcnt_impl(X, CntStkSrc, CntStkDst, Y) :-
	!.
*/

ttp_indentcnt_line(X, N, Y) :-
	ttp_indentcnt_line_top(X, 0, N1, X2),
	ttp_indentcnt_line_body(X2, 0, N2, Y),
	(N2 > 0 -> N = N1 ; N = -1),
	!.


ttp_indentcnt_line_top([0x09 | Xt], N, M, Y) :-
	N2 is N + 1,
	!,
	ttp_indentcnt_line_top(Xt, N2, M, Y).

ttp_indentcnt_line_top(Y, M, M, Y) :-
	!.


ttp_indentcnt_line_body([0x0A | Y], M, M, Y) :-
	!.

ttp_indentcnt_line_body(Y, M, M, Y) :-
	Y = [],
	!.

ttp_indentcnt_line_body([0x20 | Xt], N, M, Y) :-
	!,
	ttp_indentcnt_line_body(Xt, N, M, Y).

ttp_indentcnt_line_body([_ | Xt], M, M, Y) :-
	N2 is N + 1,
	!,
	ttp_indentcnt_line_body(Xt, N2, M, Y).
