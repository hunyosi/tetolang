
/*
ttp_indentcnt(X, Y) :-
	!.

ttp_indentcnt_impl(X, CntStk, Y) :-
	ttp_indentcnt_line(X, N, X2),
	ttp_indentcnt_process_line(X, N, CntStk, CntStk2, X2),
	!,
	ttp_indentcnt_impl(X, CntStk2, Y).


	[CurCnt | _] = CntStkSrc,
	Diff is N - CurCnt,

ttp_indentcnt_process_line(X, N, X2)

*/


ttp_indentcnt_line(X, N, Y) :-
	ttp_indentcnt_line_count_intent(X, 0, N1, X2),
	ttp_indentcnt_line_skip_blank(X2, X3)
	ttp_indentcnt_line_body(X3, Body, Y),
	(Body = [] -> N = -1 ; N = N1),
	!.


ttp_indentcnt_line_count_intent([0x09 | Xt], N, M, Y) :-
	N2 is N + 1,
	!,
	ttp_indentcnt_line_top(Xt, N2, M, Y).

ttp_indentcnt_line_count_intent(Y, M, M, Y) :-
	!.


ttp_indentcnt_line_skip_blank([0x20 | Xt], Y) :-
	!,
	ttp_indentcnt_line_skip_blank(Xt, Y).

ttp_indentcnt_line_skip_blank(Y, Y) :-
	!.


ttp_indentcnt_line_body([0x0A | Y], [], Y) :-
	!.

ttp_indentcnt_line_body(Y, [], Y) :-
	Y = [],
	!.

ttp_indentcnt_line_body([Xh | Xt], B, Y) :-
	B = [Xh | B2],
	!,
	ttp_indentcnt_line_body(Xt, B2, Y).
