
ttp_convcurl(X, Y) :-
	!.

ttp_convcurl_impl([], []) :-
	!.

ttp_convcurl_line_impl([0'{ | Xt], Indent, Y) :-
	Y = [0x0A | Yt],
	add_str(Yt, Indent, Yt2),
	Yt2 = [0x09 | Yt3],
	Indent2 = [0x09 | Indent],
	!,
	ttp_convcurl_line_impl(Xt, Indent2, Yt3).

ttp_convcurl_line_impl([0'} | Xt], Indent, Y) :-
	Y = [0x0A | Yt],
	[_ | Indent2] = Indent,
	!,
	ttp_convcurl_line_impl(Xt, Indent2, Yt).
