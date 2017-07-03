
ttp_indentcnt(X, Y) :-
	!.

ttp_indentcnt_impl(X, CntStkSrc, CntStkDst, Y) :-
	!.

ttp_indentcnt_line(X, N, Y) :-
	ttp_indentcnt_line_top(X, 0, N1, X2),
	ttp_indentcnt_line_body(X2, N1, N2, Y).
	!.



