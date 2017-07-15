%=============================================================================
% unit test utils

:- dynamic(ttpu_config/2).
:- dynamic(ttpu_result/2).


% ----------------------------------------------------------------------------
% ttpu_unit_tests


ttpu_unit_tests(Tests) :-
	[_ | _] = Tests,
	ttpu_unit_tests(Tests, []),
	!.


ttpu_unit_tests(Tests, Flags) :-
	[_ | _] = Tests,
	ttpu_unit_tests(Tests, Flags, OkCnt, NgCnt),
	Sum is OkCnt + NgCnt,
	write('tests: '), write(Sum),
	write(', ok: '), write(OkCnt),
	write(', ng: '), write(NgCnt),
	nl,
	!.


ttpu_unit_tests(Tests, Flags, OkCnt, NgCnt) :-
	[_ | _] = Tests,
	ttpu_unit_tests_init(Flags),
	ttpu_unit_tests_impl(Tests),
	ttpu_result(ok, OkCnt),
	ttpu_result(ng, NgCnt),
	ttpu_unit_tests_clear,
	!.


ttpu_unit_tests_init(Flags) :-
	ttpu_config_init(Flags),
	ttpu_result_init,
	!.

ttpu_unit_tests_clear :-
	ttpu_result_clear,
	ttpu_config_clear,
	!.


ttpu_unit_tests_impl([Test|Tests]) :-
	call(Test),
	!,
	ttpu_unit_tests_impl(Tests).

ttpu_unit_tests_impl([]) :-
	!.


% ----------------------------------------------------------------------------
% ttpu_assert, ttpu_asserts


ttpu_asserts([Test|Tests]) :-
	ttpu_assert(Test),
	!,
	ttpu_asserts(Tests).

ttpu_asserts([]) :-
	!.


ttpu_assert(Test) :-
	ttpu_config(verbose, VerboseFlag),
	ttpu_assert_impl(Test, VerboseFlag, Result),
	ttpu_result_increment(Result),
	(fail; true), % for GNU Prolog GC
	!.


ttpu_assert_impl(Test, true, Result) :-
	write('try: '), write(Test), write(' --> '),
	(
		call(Test),
		Result = ok,
		write('[OK]')
		;
		Result = ng,
		write('[NG]')
	),
	nl,
	!.

ttpu_assert_impl(Test, false, Result) :-
	call(Test),
	Result = ok,
	!
	;
	Result = ng,
	write('error: '), write(Test), nl,
	!.




% ----------------------------------------------------------------------------
% ttpu_config


ttpu_config_init(Flags) :-
	ttpu_config_clear,
	ttpu_config_init_impl([verbose], Flags),
	!.


ttpu_config_init_impl([Flag|FlagN], InputFlags) :-
	ttpu_config_init_has_flag(Flag, InputFlags),
	assertz(ttpu_config(Flag, true)),
	!,
	ttpu_config_init_impl(FlagN, InputFlags).

ttpu_config_init_impl([Flag|FlagN], InputFlags) :-
	assertz(ttpu_config(Flag, false)),
	!,
	ttpu_config_init_impl(FlagN, InputFlags).

ttpu_config_init_impl([], _) :-
	!.


ttpu_config_init_has_flag(Flag, [Flag | _]) :-
	!.

ttpu_config_init_has_flag(Flag, [_ | FlagN]) :-
	!,
	ttpu_config_init_has_flag(Flag, FlagN).

ttpu_config_init_has_flag(_, []) :-
	!,
	fail.


ttpu_config_clear :-
	clause(ttpu_config(_, _), _),
	retractall(ttpu_config(_, _)),
	!.

ttpu_config_clear :-
	!.




% ----------------------------------------------------------------------------
% ttpu_result


ttpu_result_init :-
	ttpu_result_clear,
	assertz(ttpu_result(ok, 0)),
	assertz(ttpu_result(ng, 0)),
	!.


ttpu_result_clear :-
	clause(ttpu_result(_, _), _),
	retractall(ttpu_result(_, _)),
	!.

ttpu_result_clear :-
	!.


ttpu_result_increment(Field) :-
	retract(ttpu_result(Field, Cnt)),
	CntN is Cnt + 1,
	assertz(ttpu_result(Field, CntN)),
	!.
