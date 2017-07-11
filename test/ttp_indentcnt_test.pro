:- initialization(main).
:- include('ttpu.pro').
:- include('../src/ttp_indentcnt.pro').


ttp_test_indentcnt_line(Flag, Cnt, CntN) :-
	ttpu_asserts([
		ttp_indentcnt_line("\t\tabc\ndef", 2, "abc", "def")
		, ttp_indentcnt_line("\t\t \ndef", -1, [], "def")
 	], Flag, Cnt, CntN).


ttp_test_indentcnt_lines(Flag, Cnt, CntN) :-
	ttpu_asserts([
		ttp_indentcnt("aaa\n\tbbb", "\naaa{\nbbb\n}\n"),
		ttp_indentcnt("aaa\n\tbbb\n\t\tccc", "\naaa{\nbbb{\nccc\n}\n}\n")
	], Flag, Cnt, CntN).


ttp_test_indentcnt_all(Flag) :-
	ttpu_unit_tests([
		  ttp_test_indentcnt_line,
		  ttp_test_indentcnt_lines
	], Flag).


main :-
	ttp_test_indentcnt_all(true),
 	halt.
