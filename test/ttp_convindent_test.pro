:- initialization(main).
:- include('ttpu.pro').
:- include('../src/ttp_utils.pro').
:- include('../src/ttp_convindent.pro').


main :-
	ttpu('ttp_convindent', [
		ttpu('ttp_convindent_line 1', (
			ttp_convindent_line("\t\tabc\ndef",
					IndentCnt, LineBody, Rest),
			ttpu_assert(IndentCnt = 2),
			ttpu_assert(LineBody = "abc"),
			ttpu_assert(Rest = "def")
		)),
		ttpu('ttp_convindent_line 2', (
			ttp_convindent_line("\t\t \ndef",
					IndentCnt, LineBody, Rest),
			ttpu_assert(IndentCnt = -1),
			ttpu_assert(LineBody = []),
			ttpu_assert(Rest = "def")
		)),
		ttpu('ttp_convindent 1', (
			ttp_convindent("aaa\n\tbbb", Res),
			ttpu_assert(Res = "\naaa{\nbbb\n}\n")
		)),
		ttpu('ttp_convindent 2', (
			ttp_convindent("aaa\n\tbbb\n\t\tccc", Res),
			ttpu_assert(Res = "\naaa{\nbbb{\nccc\n}\n}\n")
		))
	]),
	ttpu_run([verbose]),
	halt.
