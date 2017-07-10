

ttp_indentcnt(X, Y) :-
	ttp_indentcnt_impl(X, [0], Y),
	!.


ttp_indentcnt_impl([], CntStk, Y) :-
	ttp_indentcnt_process_line(0, CntStk, _, [], Y, []),
	!.

ttp_indentcnt_impl(X, CntStk, Y) :-
	ttp_indentcnt_line(X, N, Body, X2),
	ttp_indentcnt_process_line(N, CntStk, CntStk2, Body, Y, Y2),
	!,
	ttp_indentcnt_impl(X2, CntStk2, Y2).



ttp_indentcnt_process_line(N, CntStkSrc, CntStkDst, Body, Y, Yt) :-
	[CurCnt | _] = CntStkSrc,
	Diff is N - CurCnt,
	!,
	ttp_indentcnt_process_line_impl(
			Diff, N, CntStkSrc, CntStkDst, Body, Y, Yt),
	!.

ttp_indentcnt_process_line_impl(0, _, CntStk, CntStk, Body, Y, Yt) :-
	Y = [ 0x0A | Y2],
	ttp_indentcnt_process_line_put(Body, Y2, Yt),
	!.

ttp_indentcnt_process_line_impl(1, N, CntStkSrc, CntStkDst, Body, Y, Yt) :-
	CntStkDst = [N | CntStkSrc],
	Y = [ 0'{, 0x0A | Y2 ],
	ttp_indentcnt_process_line_put(Body, Y2, Yt),
	!.

ttp_indentcnt_process_line_impl(2, _, CntStk, CntStk, Body, Y, Yt) :-
	Y = [ 0x20 | Y2],
	ttp_indentcnt_process_line_put(Body, Y2, Yt),
	!.

ttp_indentcnt_process_line_impl(Diff, N, CntStkSrc, CntStkDst, Body, Y, Yt) :-
	Diff < 0,
	[CurCnt | CntStkSrc2] = CntStkSrc,
	Diff2 is N - CurCnt,
	Y = [ 0x0A, 0'} | Y2],
	!,
	ttp_indentcnt_process_line_impl(
			Diff2, CurCnt, CntStkSrc2, CntStkDst,
			Body, Y2, Yt).


ttp_indentcnt_process_line_put([], LastT, LastT) :-
	!.

ttp_indentcnt_process_line_put([SrcH | SrcT], [SrcH | DstT], LastT) :-
	!,
	ttp_indentcnt_process_line_put(SrcT, DstT, LastT).


ttp_indentcnt_line(X, N, Body, Y) :-
	ttp_indentcnt_line_count_intent(X, 0, N1, X2),
	ttp_indentcnt_line_skip_blank(X2, X3),
	ttp_indentcnt_line_body(X3, Body, Y),
	(Body = [] -> N = -1 ; N = N1),
	!.


ttp_indentcnt_line_count_intent([0x09 | Xt], N, M, Y) :-
	N2 is N + 1,
	!,
	ttp_indentcnt_line_count_intent(Xt, N2, M, Y).

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
