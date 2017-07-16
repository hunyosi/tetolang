
/*
ttp_anabrackets(Src, DstPart, DstRest) :-
	!.
*/


ttp_anabrackets_skipquotation([0'\\, X | SrcT] , Q, OPart, OPartT, ORest) :-
	OPart = [0'\\, X | OPart2],
	!,
	ttp_anabrackets_skipquotation(SrcT, Q, OPart2, OPartT, ORest).

ttp_anabrackets_skipquotation([Q | SrcT] , Q, OPart, OPartT, SrcT) :-
	OPart = [Q | OPartT],
	!.

ttp_anabrackets_skipquotation([X | SrcT] , Q, OPart, OPartT, ORest) :-
	OPart = [X | OPart2],
	!,
	ttp_anabrackets_skipquotation(SrcT, Q, OPart2, OPartT, ORest).

ttp_anabrackets_skipquotation([] , Q, OPartT, OPartT, []) :-
	throw(ttp_quotation_exception(Q)).
