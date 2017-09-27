% :- include('tto_utils.pro').
% :- include('ttp_chrtype.pro').
% :- include('ttp_anabrackets.pro').


ttp_convindent(X, Y) :-
	ttp_convindent_impl(X, [0], Y),
	!.


ttp_convindent_impl([], CntStk, Y) :-
	ttp_convindent_process_line(0, CntStk, _, [], Y, []),
	!.

ttp_convindent_impl(X, CntStk, Y) :-
	ttp_convindent_line(X, N, Body, X2),
	ttp_convindent_process_line(N, CntStk, CntStk2, Body, Y, Y2),
	!,
	ttp_convindent_impl(X2, CntStk2, Y2).



ttp_convindent_process_line(N, CntStkSrc, CntStkDst, Body, Y, Yt) :-
	[CurCnt | _] = CntStkSrc,
	Diff is N - CurCnt,
	!,
	ttp_convindent_process_line_impl(
			Diff, N, CntStkSrc, CntStkDst, Body, Y, Yt),
	!.

ttp_convindent_process_line_impl(0, _, CntStk, CntStk, Body, Y, Yt) :-
	Y = [ 0x0A | Y2],
	ttp_lst_put_tail(Y2, Body, Yt),
	!.

ttp_convindent_process_line_impl(1, N, CntStkSrc, CntStkDst, Body, Y, Yt) :-
	CntStkDst = [N | CntStkSrc],
	Y = [ 0'{, 0x0A | Y2 ],
	ttp_lst_put_tail(Y2, Body, Yt),
	!.

ttp_convindent_process_line_impl(2, _, CntStk, CntStk, Body, Y, Yt) :-
	Y = [ 0x20 | Y2],
	ttp_lst_put_tail(Y2, Body, Yt),
	!.

ttp_convindent_process_line_impl(Diff, _, _, _, _, _, _) :-
	Diff > 2,
	throw(ttp_illegal_indent_exception),
	!.

ttp_convindent_process_line_impl(Diff, N, CntStkSrc, CntStkDst, Body, Y, Yt) :-
	Diff < 0,
	[_ | CntStkSrc2] = CntStkSrc,
	[CurCnt | _] = CntStkSrc2,
	Diff2 is N - CurCnt,
	Y = [ 0x0A, 0'} | Y2],
	!,
	ttp_convindent_process_line_impl(
			Diff2, N, CntStkSrc2, CntStkDst,
			Body, Y2, Yt).


ttp_convindent_line(X, N, Body, Y) :-
	ttp_convindent_line_count_indent(X, 0, N1, X2),
	ttp_convindent_line_check_blank(X2),
	ttp_convindent_line_body(X2, Body1, X3),
	!,
	ttp_convindent_line_impl(X3, N1, Body1, Y, N, Body).


ttp_convindent_line_impl(X, _, [], Y, DstN, DstBody) :-
	!,
	ttp_convindent_line(X, DstN, DstBody, Y).

ttp_convindent_line_impl(Y, DstN, DstBody, Y, DstN, DstBody) :-
	!.


ttp_convindent_line_count_indent([0x09 | Xt], N, M, Y) :-
	N2 is N + 1,
	!,
	ttp_convindent_line_count_indent(Xt, N2, M, Y).

ttp_convindent_line_count_indent(Y, M, M, Y) :-
	!.


ttp_convindent_line_check_blank([0x20 | _]) :-
	!,
	throw(ttp_line_top_blank_exception).

ttp_convindent_line_check_blank(_) :-
	!.


ttp_convindent_line_body([0x0A | Y], [], Y) :-
	!.

ttp_convindent_line_body(Y, [], Y) :-
	Y = [],
	!.

ttp_convindent_line_body([Xh | Xt], B, Y) :-
	ttp_anabrackets(Xt, Xh, B, B2, Xt2),
	!,
	ttp_convindent_line_body(Xt2, B2, Y).

ttp_convindent_line_body([Xh | Xt], B, Y) :-
	B = [Xh | B2],
	!,
	ttp_convindent_line_body(Xt, B2, Y).
