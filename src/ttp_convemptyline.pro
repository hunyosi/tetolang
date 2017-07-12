
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
	!.

ttp_convemptyline_cntchr([Xh | Xt], NSrc, NDst, Line, X2) :-
	(Xh = 0x09 ; Xh = 0x20),
	Line = [Xh | Line2],
	!,
	ttp_convemptyline_cntchr(Xt, NSrc, NDst, Line2, X2).

ttp_convemptyline_cntchr([Xh | Xt], NSrc, NDst, Line, X2) :-
	NSrc2 is NSrc + 1,
	Line = [Xh | Line2],
	!,
	ttp_convemptyline_cntchr(Xt, NSrc2, NDst, Line2, X2).


ttp_convemptyline_processline(0, _, Y, Y) :-
	!.

ttp_convemptyline_processline(_, Line, Y, Y2) :-
	add_str(Y, Line, Y2),
	!.

