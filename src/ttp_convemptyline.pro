
ttp_convemptyline(X, Y) :-
	ttp_convemptyline_impl(X, Y),
	!.

ttp_convemptyline_impl([], []) :-
	!.

ttp_convemptyline_impl(X, Y) :-
	ttp_convemptyline_cntchr(X, 0, N, Line, X2),
	ttp_convemptyline_processline(N, Line, Y, Y2),
	!,
	ttp_convemptyline_impl(X2, Y2).


ttp_convemptyline_cntchr(X, N, N [], X) :-
	X = [],
	!.

ttp_convemptyline_cntchr([Xh | Xt], N, N, Line, Xt) :-
	Xh = 0x0A,
	Line = [Xh],


ttp_convemptyline_cntchr([Xh | Xt], NSrc, NDst, Line, X2) :-
	Xh
	ttp_convemptyline_cntchr([Xh | Xt], NSrc2, NDst, Line, X2).
