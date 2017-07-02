
ttp_load_all_byte(FileName, Data) :-
	open(FileName, read, InStream, [type(binary), eof_action(eof_code)]),
	ttp_load_all_byte_impl(InStream, Data),
	close(InStream),
	!.


ttp_load_all_byte_impl(InStream, Data) :-
	at_end_of_stream(InStream),
	Data = [],
	!.

ttp_load_all_byte_impl(InStream, [DataH | DataT]) :-
	get_byte(InStream, DataH),
	!,
	ttp_load_all_byte_impl(InStream, DataT).


ttp_load_all_utf8(FileName, Data) :-
	ttp_load_all_byte(FileName, SrcData),
	ttp_decode_utf8(SrcData, Data),
	!.


ttp_load_all_text_utf8(FileName, DstText) :-
	ttp_load_all_byte(FileName, SrcBin),
	ttp_decode_utf8(SrcBin, SrcText),
	ttp_normalize_nl(SrcText, DstText),
	!.


ttp_decode_utf8(Src, Dst) :-
	ttp_decode_utf8_impl(Src, Dst),
	!.

ttp_decode_utf8_impl([], []) :-
	!.

ttp_decode_utf8_impl([Src1 | SrcT], Dst) :-
	Src1 < 0x80,
	Dst = [Src1 | DstT],
	!,
	ttp_decode_utf8_impl(SrcT, DstT).

ttp_decode_utf8_impl([Src1, Src2 | SrcT], Dst) :-
	Src1 /\ 0xE0 =:= 0xC0,
	Src2 /\ 0xC0 =:= 0x80,
	DstH is ((Src1 /\ 0x1F) << 6) \/ (Src2 /\ 0x3F),
	Dst = [DstH | DstT],
	!,
	ttp_decode_utf8_impl(SrcT, DstT).

ttp_decode_utf8_impl([Src1, Src2, Src3 | SrcT], Dst) :-
	Src1 /\ 0xF0 =:= 0xE0,
	Src2 /\ 0xC0 =:= 0x80,
	Src3 /\ 0xC0 =:= 0x80,
	DstH is ((Src1 /\ 0x0F) << 12)
			\/ ((Src2 /\ 0x3F) << 6)
			\/ (Src3 /\ 0x3F),
	Dst = [DstH | DstT],
	!,
	ttp_decode_utf8_impl(SrcT, DstT).

ttp_decode_utf8_impl([Src1, Src2, Src3, Src4 | SrcT], Dst) :-
	Src1 /\ 0xF0 =:= 0xE0,
	Src2 /\ 0xC0 =:= 0x80,
	Src3 /\ 0xC0 =:= 0x80,
	Src4 /\ 0xC0 =:= 0x80,
	DstH is ((Src1 /\ 0x0F) << 18)
			\/ ((Src2 /\ 0x3F) << 12)
			\/ ((Src3 /\ 0x3F) << 6)
			\/ (Src4 /\ 0x3F),
	Dst = [DstH | DstT],
	!,
	ttp_decode_utf8_impl(SrcT, DstT).


ttp_normalize_nl(Src, Dst) :-
	ttp_normalize_nl_impl(Src, 0x0A, Dst),
	!.


ttp_normalize_nl(Src, NlCode, Dst) :-
	ttp_normalize_nl_impl(Src, NlCode, Dst),
	!.

ttp_normalize_nl_impl([], _, []) :-
	!.

ttp_normalize_nl_impl([0x0D, 0x0A | SrcT], NlCode, Dst) :-
	Dst = [NlCode | DstT],
	!,
	ttp_normalize_nl_impl(SrcT, NlCode, DstT).

ttp_normalize_nl_impl([0x0D | SrcT], NlCode, Dst) :-
	Dst = [NlCode | DstT],
	!,
	ttp_normalize_nl_impl(SrcT, NlCode, DstT).

ttp_normalize_nl_impl([0x0A | SrcT], NlCode, Dst) :-
	Dst = [NlCode | DstT],
	!,
	ttp_normalize_nl_impl(SrcT, NlCode, DstT).

ttp_normalize_nl_impl([0x2028 | SrcT], NlCode, Dst) :-
	Dst = [NlCode | DstT],
	!,
	ttp_normalize_nl_impl(SrcT, NlCode, DstT).

ttp_normalize_nl_impl([0x2029 | SrcT], NlCode, Dst) :-
	Dst = [NlCode | DstT],
	!,
	ttp_normalize_nl_impl(SrcT, NlCode, DstT).

ttp_normalize_nl_impl([SrcH | SrcT], NlCode, Dst) :-
	Dst = [SrcH | DstT],
	!,
	ttp_normalize_nl_impl(SrcT, NlCode, DstT).


