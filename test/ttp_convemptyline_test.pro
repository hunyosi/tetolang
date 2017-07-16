%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
% This software is made available under
% the Creative Commons CC0 1.0 Universal Public Domain Dedication.
% See "LICENSE" file.
%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


:- initialization(
	ttpu('ttp_convemptyline', [
		ttpu('ttp_convemptyline', (
			ttpu_asserts([
				ttp_convemptyline("", ""),
				ttp_convemptyline("a", "a"),
				ttp_convemptyline("  ", ""),
				ttp_convemptyline("\t\t", ""),
				ttp_convemptyline("\n\n", ""),
				ttp_convemptyline("aaa\n\nbbb", "aaa\nbbb"),
				ttp_convemptyline("aaa\n\nbbb\n\n\nccc",
 						"aaa\nbbb\nccc"),
				ttp_convemptyline("aaa\n   \nbbb", "aaa\nbbb"),
				ttp_convemptyline("aaa\n\t\t   \nbbb",
 						"aaa\nbbb"),
				ttp_convemptyline("aaa\n\t\t   bbb\nccc",
 						"aaa\n\t\t   bbb\nccc")
			])
		))
	])
).
