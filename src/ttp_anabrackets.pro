%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
% This software is made available under
% the Creative Commons CC0 1.0 Universal Public Domain Dedication.
% See "LICENSE" file.
%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

% :- include('ttp_chrtype.pro').

ttp_anabrackets(Src, B, DstPart, DstPartT, DstRest) :-
	ttp_chrtype_bracketpair(B, C),
	DstPart = [B | DstPart2],
	ttp_anabrackets_impl(Src, [C], DstPart2, DstPartT, DstRest),
	!.


ttp_anabrackets_impl(ORest, [], OPart, OPart, ORest) :-
	!.

ttp_anabrackets_impl([X | SrcT], BStk, OPart, OPartT, ORest) :-
	ttp_chrtype_isquotation(X),
	ttp_anabrackets_skipquotation(SrcT, X, OPart, OPart2, Src2),
	!,
	ttp_anabrackets_impl(Src2, BStk, OPart2, OPartT, ORest).

ttp_anabrackets_impl([X | SrcT], BStk, OPart, OPartT, ORest) :-
	ttp_chrtype_bracketpair(X, Y),
	BStk2 = [Y | BStk],
	OPart = [OPart | OPart2],
	!,
	ttp_anabrackets_impl(SrcT, BStk2, OPart2, OPartT, ORest).

ttp_anabrackets_impl([X | SrcT], [X | BStkT], OPart, OPartT, ORest) :-
	OPart = [X | OPart2],
	!,
	ttp_anabrackets_impl(SrcT, BStkT, OPart2, OPartT, ORest).

ttp_anabrackets_impl([X | SrcT], BStk, OPart, OPartT, ORest) :-
	OPart = [X | OPart2],
	!,
	ttp_anabrackets_impl(SrcT, BStk, OPart2, OPartT, ORest).

ttp_anabrackets_impl([], [B | _], OPart, OPart, []) :-
	!,
	throw(ttp_bracket_exception(B)).


ttp_anabrackets_skipquotation(Src, Q, OPart, OPartT, ORest) :-
	OPart = [Q | OPart2],
	ttp_anabrackets_skipquotation_impl(Src, Q, OPart2, OPartT, ORest),
	!.


ttp_anabrackets_skipquotation_impl(
			[0'\\, X | SrcT], Q, OPart, OPartT, ORest) :-
	OPart = [0'\\, X | OPart2],
	!,
	ttp_anabrackets_skipquotation_impl(SrcT, Q, OPart2, OPartT, ORest).

ttp_anabrackets_skipquotation_impl(
			[Q | SrcT] , Q, OPart, OPartT, SrcT) :-
	OPart = [Q | OPartT],
	!.

ttp_anabrackets_skipquotation_impl(
			[X | SrcT] , Q, OPart, OPartT, ORest) :-
	OPart = [X | OPart2],
	!,
	ttp_anabrackets_skipquotation_impl(SrcT, Q, OPart2, OPartT, ORest).

ttp_anabrackets_skipquotation_impl(
			[] , Q, OPartT, OPartT, []) :-
	throw(ttp_quotation_exception(Q)).
