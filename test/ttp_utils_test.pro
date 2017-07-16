%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
% This software is made available under
% the Creative Commons CC0 1.0 Universal Public Domain Dedication.
% See "LICENSE" file.
%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


:- initialization(
	ttpu('ttp_utils', [
		ttpu('ttp_lst_add', (
			ttp_lst_add([a, b, c], [d, e, f], X),
			ttpu_assert(X = [a, b, c, d, e, f])
		)),
		ttpu('ttp_lst_len', (
			ttp_lst_len([a, b, c], X),
			ttpu_assert(X = 3)
		))
	])
).
