:- initialization(main).
:- include('../src/ttp_loadutils.pro').


main :-
	ttp_load_all_text_utf8('ttp_loadutils_test.txt', Data),
	write(Data),
	nl,
	halt.

