:- initialization(main).
:- include('ttpu.pro').
:- include('../src/ttp_utils.pro').
:- include('../src/ttp_convemptyline.pro').


ttp_test_convemptyline_lines(Flag, Cnt, CntN) :-
	ttpu_asserts([
		ttp_convemptyline("", ""),
		ttp_convemptyline("a", "a"),
		ttp_convemptyline("  ", ""),
		ttp_convemptyline("\t\t", ""),
		ttp_convemptyline("\n\n", ""),
		ttp_convemptyline("aaa\n\nbbb", "aaa\nbbb"),
		ttp_convemptyline("aaa\n\nbbb\n\n\nccc", "aaa\nbbb\nccc"),
		ttp_convemptyline("aaa\n   \nbbb", "aaa\nbbb"),
		ttp_convemptyline("aaa\n\t\t   \nbbb", "aaa\nbbb"),
		ttp_convemptyline("aaa\n\t\t   bbb\nccc", "aaa\n\t\t   bbb\nccc")
	], Flag, Cnt, CntN).


ttp_test_convemptyline_all(Flag) :-
	ttpu_unit_tests([
		  ttp_test_convemptyline_lines
	], Flag).


main :-
	ttp_test_convemptyline_all(true),
 	halt.
