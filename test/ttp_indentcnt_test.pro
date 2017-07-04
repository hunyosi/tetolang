:- initialization(main).
:- include('ttpu.pro').
:- include('../src/ttp_indentcnt.pro').


ttp_test_indentcnt_line(Flag, Cnt, CntN) :-
	ttpu_asserts([
		ttp_indentcnt_line("\t\tabc\nabc", 2, "abc")
		, ttp_indentcnt_line("\t\t \nabc", -1, "abc")
 	], Flag, Cnt, CntN).


ttp_test_indentcnt_all(Flag) :-
	ttpu_unit_tests([
		  ttp_test_indentcnt_line
	], Flag).


main :-
	ttp_test_indentcnt_all(true),
 	halt.
