%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
% TTPU -- Prolog unit test tools.
%
% This software is made available under
% the Creative Commons CC0 1.0 Universal Public Domain Dedication.
% See "LICENSE" file.
%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


%=============================================================================
% unit test utils


:- dynamic(ttpu_test/3).
:- dynamic(ttpu_config/2).
:- dynamic(ttpu_result/2).
:- dynamic(ttpu_aresult/2).




% ----------------------------------------------------------------------------
% ttpu


ttpu(Description) :-
	atom(Description),
	ttpu_add_test([], Description, Description),
	!.

ttpu(GroupName, Tests) :-
	atom(GroupName),
	Tests = [_ | _],
	ttpu_add_tests(GroupName, Tests),
	!.

ttpu(Description, Test) :-
	atom(Description),
	ttpu_add_test([], Description, Test),
	!.


ttpu_add_tests(GroupName, [ttpu(Description, Test) | TestT]) :-
	ttpu_add_test(GroupName, Description, Test),
	!,
	ttpu_add_tests(GroupName, TestT).

ttpu_add_tests(_, []) :-
	!.


ttpu_add_test(GroupName, Description, Test) :-
	assertz(ttpu_test(GroupName, Description, Test)),
	!.




% ----------------------------------------------------------------------------
% ttpu_run


ttpu_run :-
	ttpu_run([]).


ttpu_run(Flags) :-
	Flags = [_ | _],
	ttpu_run(Flags, OkCnt, NgCnt),
	Sum is OkCnt + NgCnt,
	write('tests: '), write(Sum),
	write(', ok: '), write(OkCnt),
	write(', ng: '), write(NgCnt),
	nl,
	ttpu_halt(OkCnt, NgCnt).


ttpu_run(Flags, OkCnt, NgCnt) :-
	ttpu_run_init(Flags),
	ttpu_run_impl,
	ttpu_result(ok, OkCnt),
	ttpu_result(ng, NgCnt),
	ttpu_run_clear,
	!.


ttpu_run_init(Flags) :-
	ttpu_config_init(Flags),
	ttpu_result_init,
	!.


ttpu_run_clear :-
	ttpu_result_clear,
	ttpu_config_clear,
	!.


ttpu_run_impl :-
	ttpu_test(GroupName, Description, Test),
	ttpu_display_test(GroupName, Description),
	ttpu_do_test(Test),
	fail
	;
	!.

ttpu_run_impl :-
	ttpu_run_impl.


ttpu_display_test(GroupName, Description) :-
	ttpu_config(verbose, true),
	write(GroupName), write(': '), write(Description), nl,
	!.

ttpu_display_test(_, _) :-
	!.


ttpu_do_test(Test) :-
	ttpu_aresult_init,
	ttpu_do_test_impl(Test, Result),
	ttpu_aresult_clear,
	ttpu_result_increment(Result),
	!.


ttpu_do_test_impl(Test, Result) :-
	catch(call(Test),
			Exception,
			true),
	ttpu_judge_result(Exception, Result),
 	!.

ttpu_do_test_impl(_, ng) :-
	!.


ttpu_judge_result(Exception, Result) :-
	var(Exception),
	ttpu_aresult(ok, OkCnt),
	ttpu_aresult(ng, NgCnt),
	ttpu_judge_result_impl(OkCnt, NgCnt, Result),
	!.

ttpu_judge_result(ttpu_assert_ng, ng) :-
	!.

ttpu_judge_result(Exception, ng) :-
	ttpu_display_exception(Exception),
	!.


ttpu_judge_result_impl(0, 0, ignore).
ttpu_judge_result_impl(_, 0, ok).
ttpu_judge_result_impl(_, _, ng).


ttpu_display_exception(Exception) :-
	write('exceprion ocurred: '),
	write(Exception),
	nl,
	!.


ttpu_halt(0, 0) :-
	write('no tests'), nl,
	halt(1).

ttpu_halt(_, 0) :-
	halt(0).

ttpu_halt(_, _) :-
	halt(1).




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
	ttpu_aresult_increment(Result),
	ttpu_assert_finish(Result),
	!.


ttpu_assert_impl(Test, true, Result) :-
	write('try: '), write(Test), write(' -> '),
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


ttpu_assert_finish(ok) :-
	!.

ttpu_assert_finish(ng) :-
	!,
	throw(ttpu_assert_ng).




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
	assertz(ttpu_result(ignore, 0)),
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




% ----------------------------------------------------------------------------
% ttpu_aresult


ttpu_aresult_init :-
	ttpu_aresult_clear,
	assertz(ttpu_aresult(ok, 0)),
	assertz(ttpu_aresult(ng, 0)),
	!.


ttpu_aresult_clear :-
	clause(ttpu_aresult(_, _), _),
	retractall(ttpu_aresult(_, _)),
	!.

ttpu_aresult_clear :-
	!.


ttpu_aresult_increment(Field) :-
	retract(ttpu_aresult(Field, Cnt)),
	CntN is Cnt + 1,
	assertz(ttpu_aresult(Field, CntN)),
	!.
