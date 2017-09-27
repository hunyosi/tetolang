%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
% This software is made available under
% the Creative Commons CC0 1.0 Universal Public Domain Dedication.
% See "LICENSE" file.
%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


:- initialization(
	ttpu('ttp_convindent', [
		ttpu('ttp_convindent_line 1', (
			ttp_convindent_line("\t\tabc\ndef",
					IndentCnt, LineBody, Rest),
			ttpu_assert(IndentCnt = 2),
			ttpu_assert(LineBody = "abc"),
			ttpu_assert(Rest = "def")
		)),
		ttpu('ttp_convindent_line 2', (
			ttpu_assert_exception(
				ttp_convindent_line("\t\t abc\ndef",
						_, _, _),
				ttp_line_top_blank_exception)
		)),
		ttpu('ttp_convindent 1', (
			ttp_convindent("aaa\n\tbbb", Res),
			ttpu_assert(Res = "\naaa{\nbbb\n}\n")
		)),
		ttpu('ttp_convindent 2', (
			ttp_convindent("aaa\n\tbbb\n\t\tccc", Res),
			ttpu_assert(Res = "\naaa{\nbbb{\nccc\n}\n}\n")
		)),
		ttpu('ttp_convindent 3', (
			ttp_convindent("aaa\n\tbbb\n\t\t\tccc", Res),
			ttpu_assert(Res = "\naaa{\nbbb ccc\n}\n")
		)),
		ttpu('ttp_convindent 4', (
			ttpu_assert_exception(
				ttp_convindent("aaa\n\tbbb\n\t\t\t\tccc", _),
				ttp_illegal_indent_exception)
		)),
		ttpu('ttp_convindent 5', (
			ttp_convindent("aaa(\n\tbbb\n\t\tccc) ddd", Res),
			ttpu_assert(Res = "\naaa(\n\tbbb\n\t\tccc) ddd\n")
		)),
		ttpu('ttp_convindent 6', (
			ttp_convindent("aaa\n\tbbb\n\t\t\tccc\n\t\t\tddd\n\t\t\teee\n\tfff\n\t\t\tggg\n\t\t\thhh\n\tiii\n\t\t\tjjj", Res),
			ttpu_assert(Res = "\naaa{\nbbb ccc ddd eee\nfff ggg hhh\niii jjj\n}\n")
		)),
		ttpu('ttp_convindent 7', (
			ttp_convindent("aaa\n\tbbb\n\t\t\tccc\n\t\t\tddd\n\t\t\teee\n\t\tfff\n\t\t\t\tggg\n\t\t\t\thhh\n\tiii\n\t\t\tjjj", Res),
			ttpu_assert(Res = "\naaa{\nbbb ccc ddd eee{\nfff ggg hhh\n}\niii jjj\n}\n")
		))
	])
).
