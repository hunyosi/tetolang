:- initialization(main).
:- include('ttpu.pro').
:- include('../src/ttp_convindent.pro').


ttp_test_convindent_line(Flag, Cnt, CntN) :-
	ttpu_asserts([
		ttp_convindent_line("\t\tabc\ndef", 2, "abc", "def")
		, ttp_convindent_line("\t\t \ndef", -1, [], "def")
 	], Flag, Cnt, CntN).


ttp_test_convindent_lines(Flag, Cnt, CntN) :-
	ttpu_asserts([
		ttp_convindent("aaa\n\tbbb", "\naaa{\nbbb\n}\n"),
		ttp_convindent("aaa\n\tbbb\n\t\tccc", "\naaa{\nbbb{\nccc\n}\n}\n")
	], Flag, Cnt, CntN).


ttp_test_convindent_all(Flag) :-
	ttpu_unit_tests([
		  ttp_test_convindent_line,
		  ttp_test_convindent_lines
	], Flag).


main :-
	ttp_test_convindent_all(true),
 	halt.
