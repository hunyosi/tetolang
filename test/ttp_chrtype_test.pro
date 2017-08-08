%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
% This software is made available under
% the Creative Commons CC0 1.0 Universal Public Domain Dedication.
% See "LICENSE" file.
%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


:- initialization(
	ttpu('ttp_chrtype', [
		ttpu('ttp_chrtype_bracketpair 1', (
			ttp_chrtype_bracketpair(0'{, X),
			ttpu_assert(X = 0'})
		)),
		ttpu('ttp_chrtype_bracketpair 2', (
			ttp_chrtype_bracketpair(0'[, X),
			ttpu_assert(X = 0'])
		)),
		ttpu('ttp_chrtype_bracketpair 3', (
			ttp_chrtype_bracketpair(0'(, X),
			ttpu_assert(X = 0'))
		)),
		ttpu('ttp_chrtype_isbracket 1', (
			ttpu_assert(ttp_chrtype_isbracket(0'())
		)),
		ttpu('ttp_chrtype_isbracket 2', (
			ttpu_assert(ttp_chrtype_isbracket(0'[))
		)),
		ttpu('ttp_chrtype_isbracket 3', (
			ttpu_assert(ttp_chrtype_isbracket(0'{))
		)),
		ttpu('ttp_chrtype_isbracket 4', (
			ttpu_assert(ttp_chrtype_isbracket(0')))
		)),
		ttpu('ttp_chrtype_isbracket 5', (
			ttpu_assert(ttp_chrtype_isbracket(0']))
		)),
		ttpu('ttp_chrtype_isbracket 6', (
			ttpu_assert(ttp_chrtype_isbracket(0'}))
		)),
		ttpu('ttp_chrtype_isquotation 1', (
			ttpu_assert(ttp_chrtype_isquotation(0'\'))
		)),
		ttpu('ttp_chrtype_isquotation 2', (
			ttpu_assert(ttp_chrtype_isquotation(0'\"))
		)),
		ttpu('ttp_chrtype_isquotation 3', (
			ttpu_assert(ttp_chrtype_isquotation(0'\`))
		))
	])
).
