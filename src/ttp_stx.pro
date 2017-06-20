%=============================================================================
% analyze syntax

ttp_stx_expr(Ai,Ao, X) :-
 ttp_stx_top_level_expr(Ai,Ao, [],[punc('.'), term(X)]),
 !
.


ttp_stx_top_level_expr(Ai,Ao, Bi,Bo) :-
 ttp_stx_expr(Ai,Ao, 1201, Bi,Bo),
 !
.

ttp_stx_inner_expr(Ai,Ao, Bi,Bo) :-
 ttp_stx_expr(Ai,Ao, 999, Bi,Bo),
 !
.



ttp_stx_expr([A|A2],Ao, P, Bi,Bo) :-
 [punc('('), term(X) | _] = Bi,
 atom(X),
 ttp_stx_inner_expr(A2,A3, [A|Bi],Bi2),
 ttp_stx_expr(A3,Ao, P, Bi2,Bo)
.

ttp_stx_expr([A|A2],Ao, P, Bi,Bo) :-
 [punc('[') | _] = Bi,
 ttp_stx_inner_expr(A2,A3, [A|Bi],Bi2),
 ttp_stx_expr(A3,Ao, P, Bi2,Bo)
.

ttp_stx_expr([A|A2],Ao, P, Bi,Bo) :-
 [punc('_(') | _] = Bi,
 ttp_stx_top_level_expr(A2,A3, [A|Bi],Bi2),
 ttp_stx_expr(A3,Ao, P, Bi2,Bo)
.

ttp_stx_expr([A|A2],Ao, P, Bi,Bo) :-
 [punc('(') | _] = Bi,
 ttp_stx_top_level_expr(A2,A3, [A|Bi],Bi2),
 ttp_stx_expr(A3,Ao, P, Bi2,Bo)
.

ttp_stx_expr([A|A2],Ao, P, Bi,Bo) :-
 [punc('{') | _] = Bi,
 ttp_stx_top_level_expr(A2,A3, [A|Bi],Bi2),
 ttp_stx_expr(A3,Ao, P, Bi2,Bo)
.


% infix operators

ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(Y), op(Op1), term(X) | Bt],Bo) :-
 ttp_op_info(Ph , P2, _, Op2, notpre, _      , _, _),
 P1s is P2 - 1,
 ttp_op_info(P1s, _ , _, Op1, notpre, notpost, _, _),
 T = pred([Op1, X, Y]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(T) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(Y), op(Op1), term(X) | Bt],Bo) :-
 ttp_op_info(Ph, P2, _, Op2, notpre, _      , _, _),
 ttp_op_info(P2, _ , _, Op1, notpre, notpost, a, l),
 T = pred([Op1, X, Y]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(T) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(Y), op(Op), term(X) | Bt],Bo) :-
 ttp_op_info(Ph, _, _, Op, notpre, notpost, _, _),
 T = pred([Op, X, Y]),
 ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(T) | Bt],Bo)
.


% postfix operators

ttp_stx_expr(Ai,Ao, Ph, [op(Op2), op(Op1), term(X) | Bt],Bo) :-
 ttp_op_info(Ph , P2, _, Op2, notpre, _      , _, _),
 P1s is P2 - 1,
 ttp_op_info(P1s, _ , _, Op1, notpre, postfix, _, _),
 T = pred([Op1, X]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(T) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [op(Op2), op(Op1), term(X) | Bt],Bo) :-
 ttp_op_info(Ph , P2, _, Op2, notpre, _      , a, _),
 P1s is P2 - 1,
 ttp_op_info(P1s, _ , _, Op1, notpre, postfix, a, l),
 T = pred([Op1, X]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op1), term(T) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [punc(M), op(Op1), term(X) | Bt],Bo) :-
 ttp_op_info(Ph, _, _, Op1, notpre, postfix, _, _),
 T = pred([Op1, X]),
 ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(T) | Bt],Bo)
.


% prefix operators

ttp_stx_expr(Ai,Ao, P, [X, Y, Z | Bt],Bo) :-
 number(X),
 (op('-') = Y ; term('-') = Y),
 (op(_) = Z ; punc(_) = Z),
 X2 is -X,
 ttp_stx_expr(Ai,Ao, P, [term(X2), Z | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, P, [X, Y],Bo) :-
 number(X),
 (op('-') = Y ; term('-') = Y),
 X2 is -X,
 ttp_stx_expr(Ai,Ao, P, [term(X2)],Bo)
.


ttp_stx_expr(Ai,Ao, Ph, [op(Op3), term(X), op(Op2), op(Op1) | Bt],Bo) :-
 ttp_op_info(Ph , P3, _, Op3, notpre, _      , _, _),
 ttp_op_info(Ph , P1, _, Op1, _     , notpost, _, _),
 (P1 < P3 -> P2s is P1 - 1 ; P2s is P3 - 1),
 ttp_op_info(P2s, _ , _, Op2, prefix, notpost, _, _),
 T = pred([Op2, X]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op3), term(T), op(Op1) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(X), op(Op2), op(Op1) | Bt],Bo) :-
 ttp_op_info(Ph , P1, _, Op1, _     , notpost, _, _),
 P2s is P1 - 1,
 ttp_op_info(P2s, _ , _, Op2, prefix, notpost, _, _),
 T = pred([Op2, X]),
 ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(T), op(Op1) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [op(Op3), term(X), op(Op2), op(Op1) | Bt],Bo) :-
 ttp_op_info(Ph , P3, _, Op3, notpre, _      , _, _),
 P1s is P3 - 1,
 ttp_op_info(P1s, P1, _, Op1, _     , notpost, a, r),
 ttp_op_info(P1 , _ , _, Op2, prefix, notpost, _, _),
 T = pred([Op2, X]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op3), term(T), op(Op1) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(X), op(Op2), op(Op1) | Bt],Bo) :-
 ttp_op_info(Ph, P1, _, Op1, _     , notpost, a, r),
 ttp_op_info(P1, _ , _, Op2, prefix, notpost, _, _),
 T = pred([Op2, X]),
 ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(T), op(Op1) | Bt],Bo)
.


ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(X), op(Op1), punc(M) | Bt],Bo) :-
 ttp_op_info(Ph , P2, _, Op2, notpre, _      , _, _),
 P1s is P2 - 1,
 ttp_op_info(P1s, _ , _, Op1, prefix, notpost, _, _),
 T = pred([Op1, X]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(T), punc(M) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [punc(M2), term(X), op(Op), punc(M1) | Bt],Bo) :-
 ttp_op_info(Ph, _, _, Op, prefix, notpost, _, _),
 T = pred([Op, X]),
 ttp_stx_expr(Ai,Ao, Ph, [punc(M2), term(T), punc(M1) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(X), op(Op1)],Bo) :-
 ttp_op_info(Ph , P2, _, Op2, notpre, _      , _, _),
 P1s is P2,
 ttp_op_info(P1s, _ , _, Op1, prefix, notpost, _, _),
 T = pred([Op1, X]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(T)],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(X), op(Op)],Bo) :-
 ttp_op_info(Ph, _, _, Op, prefix, notpost, _, _),
 T = pred([Op, X]),
 ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(T)],Bo)
.


% non operator


ttp_stx_expr(A,Ao, P, Bi,Bo) :-
 999 = P,
 [Close, term(X) | Bt] = Bi,
 ttp_close_punc(Close),
 ttp_stx_expr(A,Ao, P, [Close, args([X]) | Bt],Bo)
.

ttp_stx_expr(A,Ao, P, Bi,Bo) :-
 999 = P,
 [Close, args(X2), punc(','), term(X) | Bt] = Bi,
 ttp_close_punc(Close),
 ttp_stx_expr(A,Ao, P, [Close, args([X|X2]) | Bt],Bo)
.


ttp_stx_expr(Ai,Ao, _, [punc(')'), args(X2), punc('('), term(X1) | Bt],Bo) :-
 atom(X1),
 Ao = Ai,
 T = pred([X1 | X2]),
 Bo = [term(T) | Bt]
.

ttp_stx_expr(A,A, _, [punc(']'), args([X2]), punc('|'), args(X1), punc('[') | Bt],Bo) :-
 ttp_lst_add(X1, X2, T),
 Bo = [term(list(T)) | Bt]
.

ttp_stx_expr(A,A, _, [punc(']'), punc('[') | Bt],[term(list([])) | Bt]).

ttp_stx_expr(A,A, _, [punc(']'), args(X), punc('[') | Bt],[term(list(X)) | Bt]).

ttp_stx_expr(A,A, _, [punc(')'), term(X), punc('_(') | Bt],[term(X) | Bt]).

ttp_stx_expr(A,A, _, [punc(')'), term(X), punc('(') | Bt],[term(X) | Bt]).

ttp_stx_expr(A,A, _, [punc('}'), punc('{') | Bt],[term('{}') | Bt]).

ttp_stx_expr(A,A, _, [punc('}'), term(X), punc('{') | Bt],[term(pred(['{}', X])) | Bt]).


ttp_stx_expr(A,Ao, P, [Close, op(X), Open | Bt],Bo) :-
 (ttp_open_punc(Open) ; ttp_sep_punc(Open)),
 (ttp_close_punc(Close) ; ttp_sep_punc(Close)),
 ttp_stx_expr(A,Ao, P, [Close, term(X), Open |Bt],Bo)
.


ttp_stx_expr(Ai,Ao, Ph, [name(X) | Bt],Bo) :-
 ttp_op_info(Ph, _, _, X, _, _, _, _),
 B2 = [op(X) | Bt],
 ttp_stx_expr(Ai,Ao, Ph, B2,Bo)
.

ttp_stx_expr(Ai,Ao, P, [X | Bt],Bo) :-
 atomic(X),
 ttp_op_info(P, _, _, X, _, _, _, _),
 ttp_stx_expr(Ai,Ao, P, [op(X) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, P, [name(X) | Bt],Bo) :-
 ttp_stx_expr(Ai,Ao, P, [term(X) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, P, [X | Bt],Bo) :-
 var(_) = X,
 ttp_stx_expr(Ai,Ao, P, [term(X) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, P, [X | Bt],Bo) :-
 str(_) = X,
 ttp_stx_expr(Ai,Ao, P, [term(X) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, P, ['.' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('.') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, ['_(' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('_(') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, ['(' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('(') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, [')' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc(')') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, ['[' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('[') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, [']' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc(']') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, ['{' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('{') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, ['}' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('}') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, [',' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc(',') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, ['|' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('|') | Bt],Bo).

ttp_stx_expr(Ai,Ao, P, [X | Bt],Bo) :-
 atomic(X),
 ttp_stx_expr(Ai,Ao, P, [term(X) | Bt],Bo)
.

ttp_stx_expr(A,A, _, X,X) :-
 [punc('.'), term(_)] = X
.

ttp_stx_expr([],[], _, Bi,Bi).

ttp_stx_expr([A|A2],Ao, P, Bi,Bo) :-
 B2 = [A | Bi],
 ttp_stx_expr(A2,Ao, P, B2,Bo)
.


ttp_sep_punc(punc(C)) :- ttp_sep_punc_char(C).
ttp_sep_punc_char(',').
ttp_sep_punc_char(';').
ttp_sep_punc_char('|').
ttp_sep_punc_char('.').

ttp_open_punc(punc(C)) :- ttp_open_punc_char(C).
ttp_open_punc_char('(').
ttp_open_punc_char('_(').
ttp_open_punc_char('[').
ttp_open_punc_char('{').

ttp_close_punc(punc(C)) :- ttp_close_punc_char(C).
ttp_close_punc_char('|').
ttp_close_punc_char(')').
ttp_close_punc_char(']').
ttp_close_punc_char('}').
