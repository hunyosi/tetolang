
ttp_anabrackets(Src, DstPart, DstRest) :-
	!.

ttp_anabrackets_skipquotation([0'\, X | SrcT] , Q, DstPart,  DstRest) :-
	DstPart = [0'\, X | DstPartT],
	!
	ttp_anabrackets_skipquotation(SrcT, Q, DstPartT, DstRest).

