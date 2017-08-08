
ttp_convcomment(X, Y) :-
	ttp_convcomment_impl(X, Y),
	!.


ttp_convcomment_impl([], []) :- !.


ttp_convcomment_impl([Xh | Xt], Y) :-
	ttp_chrtype_isquotation(Xh),
	ttp_anabrackets_skipquotation(Xt, Xh, Y, Yt, Xh2),
	!,
	ttp_convcomment_impl(Xh2, Yt).

ttp_convcomment_impl([0'#, Xh | Xt], Y) :-
	ttp_chrtype_isbracket(Xh),
	ttp_anabrackets(Xt, Xh, C, [], X2),
	Y = [0x20 | Y2],
	ttp_convcomment_tonewlineonly(C, Y2, Yt),
	!,
	ttp_convcomment_impl(X2, Yt).

ttp_convcomment_impl([0'#, Xh | Xt], Y) :-
	ttp_chrtype_isquotation(Xh),
	ttp_anabrackets_skipquotation(Xt, Xh, Y, Yt, Xh2),
	!,
	ttp_convcomment_impl(Xh2, Yt).

ttp_convcomment_impl([0'#, 0'* | Xt], Y) :-
	!,
	ttp_convcomment_skip_comment(Xt, Xh2),
	Y = [0x20 | Yt],
	!,
	ttp_convcomment_impl(Xh2, Yt).

ttp_convcomment_impl([0'# | Xt], Y) :-
	ttp_convcomment_skip_line(Xt, Xh2),
	Y = [0x0A | Yt],
	!,
	ttp_convcomment_impl(Xh2, Yt).

ttp_convcomment_impl([Xh | Xt], Y) :-
	ttp_chrtype_isnottabblank(Xh),
	ttp_convcomment_skip_blank(Xt, Xh2),
	Y = [0x20 | Yt],
	!,
	ttp_convcomment_impl(Xh2, Yt).

ttp_convcomment_impl([Xh | Xt], [Xh | Yt]) :-
	!,
	ttp_convcomment_impl(Xt, Yt).


ttp_convcomment_skip_comment(X, Y) :-
	!,
	ttp_convcomment_skip_comment(X, 1, Y),
	!.

ttp_convcomment_skip_comment([0'#, 0'* | Xt], N, Y) :-
	N2 is N + 1,
	!,
	ttp_convcomment_skip_comment(Xt, N2, Y).

ttp_convcomment_skip_comment([0'*, 0'# | Xt], N, Xt) :-
	0 =:= N - 1,
	!.

ttp_convcomment_skip_comment([0'*, 0'# | Xt], N, Y) :-
	N2 is N - 1,
	!,
	ttp_convcomment_skip_comment(Xt, N2, Y).

ttp_convcomment_skip_comment([0x0A | Xt], N, Y) :-
	Y = [0x0A | Yt],
	!,
	ttp_convcomment_skip_comment(Xt, N, Yt).

ttp_convcomment_skip_comment([_ | Xt], N, Y) :-
	!,
	ttp_convcomment_skip_comment(Xt, N, Y).


ttp_convcomment_skip_line(X, X) :-
	X = [],
	!.

ttp_convcomment_skip_line([0x0A | Xt], Xt) :-
	!.

ttp_convcomment_skip_line([_ | Xt], Y) :-
	!,
	ttp_convcomment_skip_line(Xt, Y).


ttp_convcomment_skip_blank([Xb|Xt], X2) :-
	ttp_chrtype_isblank(Xb),
	!,
	ttp_convcomment_skip_blank(Xt, X2).

ttp_convcomment_skip_blank(X, X) :- !.


ttp_convcomment_tonewlineonly([0x0A | Xt], Y, Yt) :-
	Y = [0x0A | Y2],
	!,
	ttp_convcomment_tonewlineonly(Xt, Y2, Yt).

ttp_convcomment_tonewlineonly([_ | Xt], Y, Yt) :-
	!,
	ttp_convcomment_tonewlineonly(Xt, Y, Yt).

ttp_convcomment_tonewlineonly([], Yt, Yt) :-
	!.
