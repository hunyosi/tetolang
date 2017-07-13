:- initialization(main).
:- include('ttpu.pro').
:- include('../src/ttp_utils.pro').
:- include('../src/ttp_convemptyline.pro').


ttp_test_convemptyline_lines(Flag, Cnt, CntN) :-
	ttpu_asserts([
		ttp_convemptyline("aaa\n\nbbb", "aaa\nbbb")
	], Flag, Cnt, CntN).


ttp_test_convemptyline_all(Flag) :-
	ttpu_unit_tests([
		  ttp_test_convemptyline_lines
	], Flag).


main :-
	ttp_test_convemptyline_all(true),
 	halt.

