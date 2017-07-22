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
			ttpu_assert(Part = "\"aaa\""),
			ttpu_assert(Rest = "bbb")
		)),
		ttpu('ttp_anabrackets_skipquotation 2', (
			ttp_anabrackets_skipquotation(
					"a\\\"aa\"bbb",
					0'",
					Part,
					PartT,
					Rest),
			ttpu_assert(var(PartT)),
			PartT = [],
			ttpu_assert(Part = "\"a\\\"aa\""),
			ttpu_assert(Rest = "bbb")
		)),
		ttpu('ttp_anabrackets_skipquotation 3', (
			ttpu_assert_exception(
				ttp_anabrackets_skipquotation(
						"aaa",
						0'",
						Part,
						PartT,
						Rest),
				ttp_quotation_exception(0'")
			),
			ttpu_assert(var(PartT)),
			PartT = [],
			ttpu_assert(Part = "aaa"),
			ttpu_assert(Rest = [])
		)),

		ttpu('ttp_anabrackets 1', (
			ttp_anabrackets(
					"aaa}bbb",
					0'{,
					Part,
					PartT,
					Rest),
			ttpu_assert(var(PartT)),
			PartT = [],
			ttpu_assert(Part = "{aaa}"),
			ttpu_assert(Rest = "bbb")
		)),
		ttpu('ttp_anabrackets 2', (
			ttp_anabrackets(
					"\'{\'}bbb",
					0'{,
					Part,
					PartT,
					Rest),
			ttpu_assert(var(PartT)),
			PartT = [],
			ttpu_assert(Part = "{\'{\'}"),
			ttpu_assert(Rest = "bbb")
		)),
		ttpu('ttp_anabrackets_bracketpair 1', (
			ttp_anabrackets_bracketpair(0'{, X),
			ttpu_assert(X = 0'})
		)),
		ttpu('ttp_anabrackets_bracketpair 2', (
			ttp_anabrackets_bracketpair(0'[, X),
			ttpu_assert(X = 0'])
		)),
		ttpu('ttp_anabrackets_bracketpair 3', (
			ttp_anabrackets_bracketpair(0'(, X),
			ttpu_assert(X = 0'))
		)),
		ttpu('ttp_anabrackets_isbracket 1', (
			ttpu_assert(ttp_anabrackets_isbracket(0'())
		)),
		ttpu('ttp_anabrackets_isbracket 2', (
			ttpu_assert(ttp_anabrackets_isbracket(0'[))
		)),
		ttpu('ttp_anabrackets_isbracket 3', (
			ttpu_assert(ttp_anabrackets_isbracket(0'{))
		)),
		ttpu('ttp_anabrackets_isbracket 4', (
			ttpu_assert(ttp_anabrackets_isbracket(0')))
		)),
		ttpu('ttp_anabrackets_isbracket 5', (
			ttpu_assert(ttp_anabrackets_isbracket(0']))
		)),
		ttpu('ttp_anabrackets_isbracket 6', (
			ttpu_assert(ttp_anabrackets_isbracket(0'}))
		)),
		ttpu('ttp_anabrackets_isquotation 1', (
			ttpu_assert(ttp_anabrackets_isquotation(0'\'))
		)),
		ttpu('ttp_anabrackets_isquotation 2', (
			ttpu_assert(ttp_anabrackets_isquotation(0'\"))
		)),
		ttpu('ttp_anabrackets_isquotation 3', (
			ttpu_assert(ttp_anabrackets_isquotation(0'\`))
		))
	])
).
