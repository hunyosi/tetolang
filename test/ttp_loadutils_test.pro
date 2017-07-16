%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
% This software is made available under
% the Creative Commons CC0 1.0 Universal Public Domain Dedication.
% See "LICENSE" file.
%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


:- initialization(
	ttpu('ttp_loadutils', [
		ttpu('ttp_load_all_text_utf8', (
			ttp_load_all_text_utf8('ttp_loadutils_test.txt', Data),
			ttpu_assert(Data = [
					0x3042, 0x3044, 0x3046, 0x3048, 0x304A,
					0x0A, 0x0A])
		))
	])
).
