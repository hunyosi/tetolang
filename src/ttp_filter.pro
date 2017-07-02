
ttp_filter(X, Y) :-
	ttp_filter_impl(X, Y),
	!.


ttp_filter_impl([], []) :- !.

ttp_filter_impl([0'#, 0'* | Xt], Y) :-
	!,
	ttp_filter_skip_comment(Xt, Xh2),
	Y = [0x20 | Yt],
	!,
	ttp_filter_impl(Xh2, Yt).

ttp_filter_impl([0'# | Xt], Y) :-
	ttp_filter_skip_line(Xt, Xh2),
	Y = [0x0A | Yt],
	!,
	ttp_filter_impl(Xh2, Yt).

ttp_filter_impl([Xh | Xt], Y) :-
	ttp_filter_blank(Xh),
	ttp_filter_skip_blank(Xt, Xh2),
	Y = [0x20 | Yt],
	!,
	ttp_filter_impl(Xh2, Yt).

ttp_filter_impl([Xh | Xt], [Xh | Yt]) :-
	!,
	ttp_filter_impl(Xt, Yt).


ttp_filter_skip_comment(X, Y) :-
	!,
	ttp_filter_skip_comment(X, 1, Y),
	!.

ttp_filter_skip_comment([0'#, 0'* | Xt], N, Y) :-
	N2 is N + 1,
	!,
	ttp_filter_skip_comment(Xt, N2, Y).

ttp_filter_skip_comment([0'*, 0'# | Xt], N, Xt) :-
	0 =:= N - 1,
	!.

ttp_filter_skip_comment([0'*, 0'# | Xt], N, Y) :-
	N2 is N - 1,
	!,
	ttp_filter_skip_comment(Xt, N2, Y).

ttp_filter_skip_comment([0x0A | Xt], N, Y) :-
	Y = [0x0A | Yt],
	!,
	ttp_filter_skip_comment(Xt, N, Yt).

ttp_filter_skip_comment([_ | Xt], N, Y) :-
	!,
	ttp_filter_skip_comment(Xt, N, Y).


ttp_filter_skip_line(X, X) :-
	X = [],
	!.

ttp_filter_skip_line([0x0A | Xt], Xt) :-
	!.

ttp_filter_skip_line([_ | Xt], Y) :-
	!,
	ttp_filter_skip_line(Xt, Y).


ttp_filter_skip_blank([Xb|Xt], X2) :-
	ttp_filter_blank(Xb),
	!,
	ttp_filter_skip_blank(Xt, X2).

ttp_filter_skip_blank(X, X) :- !.


ttp_filter_blank(Xb) :- 0x0000 =< Xb, Xb =< 0x0008, !.
ttp_filter_blank(Xb) :- 0x000B =< Xb, Xb =< 0x0020, !.
ttp_filter_blank(Xb) :- 0x007F =< Xb, Xb =< 0x00A0, !.
ttp_filter_blank(Xb) :- 0x00AD =:= Xb, !.
ttp_filter_blank(Xb) :- 0x1680 =:= Xb, !.
ttp_filter_blank(Xb) :- 0x180E =:= Xb, !.
ttp_filter_blank(Xb) :- 0x2000 =< Xb, Xb =< 0x200B, !.
ttp_filter_blank(Xb) :- 0x202F =:= Xb, !.
ttp_filter_blank(Xb) :- 0x205F =:= Xb, !.
ttp_filter_blank(Xb) :- 0x3000 =:= Xb, !.
ttp_filter_blank(Xb) :- 0xFEFF =:= Xb, !.

