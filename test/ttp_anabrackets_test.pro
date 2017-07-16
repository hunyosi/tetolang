%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
% This software is made available under
% the Creative Commons CC0 1.0 Universal Public Domain Dedication.
% See "LICENSE" file.
%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


:- initialization(
	ttpu('ttp_anabrackets', [
		ttpu('ttp_anabrackets_skipquotation 1', (
			ttp_anabrackets_skipquotation(
					"aaa\"bbb",
					0'",
					Part,
					PartT,
					Rest),
			ttpu_assert(var(PartT)),
			PartT = [],
			ttpu_assert(Part = "aaa\""),
			ttpu_assert(Rest = "bbb")
		))
	])
).
