:- initialization(main).
:- include('../src/ttp_filter.pro').


test1_1 :- 
	ttp_filter("aaa#*bbb*#ccc", Data),
	write(Data),
	nl,
	!.

test1_2 :- 
	ttp_filter("aaa#*bbb#*ccc#*ddd*#eee*#fff*#ggg", Data),
	write(Data),
	nl,
	!.

test1_3 :- 
	ttp_filter("aaa#*bbb\nccc\nddd*#ccc", Data),
	write(Data),
	nl,
	!.

test2_1 :- 
	ttp_filter("aaa#bbb\nccc", Data),
	write(Data),
	nl,
	!.

test3_1 :- ttp_filter("aaa   bbb", Data),
	write(Data),
	nl,
	!.


main :-
	test1_1,
	test1_2,
	test1_3,
	test2_1,
	test3_1,
	halt.

