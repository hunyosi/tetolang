
ttp_filter(X, Y) :-
	ttp_filter_impl(X, Y,[]),
	!.


ttp_filter_impl([], Y,Y) :- !.

ttp_filter_impl([0x0D 0x0A | Xt], Y,Yt) :-
	Y = [0x2028 | Y2],
	!,
	ttp_filter_impl(Xt, Y2,Yt).

ttp_filter_impl([0x0D | Xt], Y,Yt) :-
	Y = [0x2028 | Y2],
	!,
	ttp_filter_impl(Xt, Y2,Yt).

ttp_filter_impl([0x0A | Xt], Y,Yt) :-
	Y = [0x2028 | Y2],
	!,
	ttp_filter_impl(Xt, Y2,Yt).

ttp_filter_impl([Xb|Xt], Y,Yt) :-
	ttp_filter_blank(Xb),
	ttp_skip_blank(Xt, Xb2),
	Y = [0x20 | Y2],
	!,
	ttp_filter_impl(Xb2, Y2,Yt).

ttp_filter_impl([Xb|Xt], [Xb|Y2],Yt) :-
	!,
	ttp_filter_impl(Xt, Y2,Yt).


ttp_skip_blank([Xb|Xt], X2) :-
	ttp_filter_blank(Xb),
	!,
	ttp_skip_blank(Xt, X2).

ttp_skip_blank(X, X) :- !.


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
