ttp_chrtype_isbracket(Chr) :-
	ttp_chrtype_bracketpair(Chr, _).

ttp_chrtype_isbracket(Chr) :-
	ttp_chrtype_bracketpair(_, Chr).


ttp_chrtype_bracketpair(0'(, 0')).
ttp_chrtype_bracketpair(0'[, 0']).
ttp_chrtype_bracketpair(0'{, 0'}).


ttp_chrtype_isquotation(0'\").
ttp_chrtype_isquotation(0'\').
ttp_chrtype_isquotation(0'\`).


ttp_chrtype_isblank(0x0009) :- !. 
ttp_chrtype_isblank(Xb) :-
	ttp_chrtype_isnottabblank(Xb),
	!. 

ttp_chrtype_isnottabblank(Xb) :- 0x0000 =< Xb, Xb =< 0x0008, !.
ttp_chrtype_isnottabblank(Xb) :- 0x000B =< Xb, Xb =< 0x0020, !.
ttp_chrtype_isnottabblank(Xb) :- 0x007F =< Xb, Xb =< 0x00A0, !.
ttp_chrtype_isnottabblank(Xb) :- 0x00AD =:= Xb, !.
ttp_chrtype_isnottabblank(Xb) :- 0x1680 =:= Xb, !.
ttp_chrtype_isnottabblank(Xb) :- 0x180E =:= Xb, !.
ttp_chrtype_isnottabblank(Xb) :- 0x2000 =< Xb, Xb =< 0x200B, !.
ttp_chrtype_isnottabblank(Xb) :- 0x202F =:= Xb, !.
ttp_chrtype_isnottabblank(Xb) :- 0x205F =:= Xb, !.
ttp_chrtype_isnottabblank(Xb) :- 0x3000 =:= Xb, !.
ttp_chrtype_isnottabblank(Xb) :- 0xFEFF =:= Xb, !.


ttp_chrtype_isalnum(C) :-
	ttp_chrtype_isdigits(C).

ttp_chrtype_isalnum(C) :-
	ttp_chrtype_isalphabet(C).

ttp_chrtype_isalnum(0'_).


ttp_chrtype_isdigits(C) :-
	0'0 =< C, C =< 0'9.


ttp_chrtype_isalphabet(C) :-
	ttp_chrtype_isuppercase(C).

ttp_chrtype_isalphabet(C) :-
	ttp_chrtype_islowercase(C).


ttp_chrtype_isuppercase(C) :-
	0'A =< C, C =< 0'Z.


ttp_chrtype_islowercase(C) :-
	0'a =< C, C =< 0'z.

