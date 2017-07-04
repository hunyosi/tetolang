%=============================================================================
% unit test utils


ttpu_assert(Test, true, Result) :-
 write('try: '), write(Test), write(' --> '),
 (
  call(Test),
  Result = ok,
  write('[OK]');
  Result = ng,
  write('[NL]')
 ),
 nl,
 !
.

ttpu_assert(Test, false, Result) :-
 call(Test),
 Result = ok,
 !;
 Result = ng,
 write('error: '), write(Test), nl,
 !
.

ttpu_unit_tests_cnt(ok, [OkCnt|NgCnt], [OkCntN|NgCnt]) :- OkCntN is OkCnt + 1.
ttpu_unit_tests_cnt(ng, [OkCnt|NgCnt], [OkCnt|NgCntN]) :- NgCntN is NgCnt + 1.

ttpu_assert(Test, Flag, Cnt, CntN) :-
 ttpu_assert(Test, Flag, Result),
 ttpu_unit_tests_cnt(Result, Cnt, CntN)
.

ttpu_asserts([Test|Tests], Flag, Cnt, CntN) :-
 !,
 ttpu_assert(Test, Flag, Cnt, Cnt2),
 ttpu_asserts(Tests, Flag, Cnt2, CntN)
.
ttpu_asserts([], _, Cnt, Cnt).


ttpu_unit_tests([Test|Tests], Flag) :-
 ttpu_unit_tests([Test|Tests], Flag, OkCnt, NgCnt),
 Sum is OkCnt + NgCnt,
 write('tests: '), write(Sum), write(', ok: '), write(OkCnt), write(', ng: '), write(NgCnt), nl
.
ttpu_unit_tests([Test|Tests], Flag, OkCnt, NgCnt) :-
 ttpu_unit_tests([Test|Tests], Flag, 0, 0, OkCnt, NgCnt)
.
ttpu_unit_tests([Test|Tests], Flag, OkCnt, NgCnt, OkCntN, NgCntN) :-
 !,
 T =.. [Test, Flag, [OkCnt|NgCnt], [OkCnt2|NgCnt2]],
 call(T),
 ttpu_unit_tests(Tests, Flag, OkCnt2, NgCnt2, OkCntN, NgCntN)
.
ttpu_unit_tests([], _, OkCnt, NgCnt, OkCnt, NgCnt).
