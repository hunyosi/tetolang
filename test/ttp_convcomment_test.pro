%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
% This software is made available under
% the Creative Commons CC0 1.0 Universal Public Domain Dedication.
% See "LICENSE" file.
%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


:- initialization(
	ttpu('tt_convcomment', [
		ttpu('test1_1', (
			ttp_convcomment("aaa#*bbb*#ccc", Data),
			ttpu_assert(Data = "aaa ccc")
		)),
		ttpu('test1_2', (
			ttp_convcomment("aaa#*bbb#*ccc#*ddd*#eee*#fff*#ggg",
 					Data),
			ttpu_assert(Data = "aaa ggg")
		)),
		ttpu('test1_3', (
			ttp_convcomment("aaa#*bbb\nccc\nddd*#ccc", Data),
			ttpu_assert(Data = "aaa \n\nccc")
		)),
		ttpu('test2_1', (
			ttp_convcomment("aaa#bbb\nccc", Data),
			ttpu_assert(Data = "aaa\nccc")
		)),
		ttpu('test3_1', (
			ttp_convcomment("aaa   bbb", Data),
			ttpu_assert(Data = "aaa bbb")
		))
	])
).
