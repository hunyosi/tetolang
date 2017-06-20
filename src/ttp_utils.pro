%=============================================================================
% utils

%----------------
% ttp_lst_add

ttp_lst_add([], Y, Y) :- !.
ttp_lst_add([X|Xt], Y, [X|Zt]) :- !, ttp_lst_add(Xt, Y, Zt).


%---------------
% ttp_lst_len

ttp_lst_len([], 0) :- !.
ttp_lst_len(Lst, Len) :- !, ttp_lst_len(Lst, 0, Len).

ttp_lst_len([], Len, Len) :- !.
ttp_lst_len([_|T], InLen, OutLen) :-
 !,
 Len2 is InLen + 1,
 ttp_lst_len(T, Len2, OutLen)
.


%-------------------------------
% ttp_escape_atom, ttp_escape_str

ttp_escape_atom(InAtom, OutAtom) :-
 atom_codes(InAtom, AC),
 ttp_escape_str(AC, AC2),
 atom_codes(OutAtom, AC2),
 !
.


ttp_escape_str(InStr, OutStr) :-
 ttp_escape_str_impl(InStr, OutStr,OutStr, OutStr,[]),
 !
.

ttp_escape_str_impl([], Str,StrT, Str,StrT).

ttp_escape_str_impl([InStrH | InStrT], Str,StrT, Str,StrTn) :-
 ttp_escape_char(InStrH, C1, C2),
 !,
 StrT = [C1, C2 | StrT2],
 ttp_escape_str_impl(InStrT, Str,StrT2, Str,StrTn)
.

ttp_escape_str_impl([InStrH | InStrT], Str,StrT, Str,StrTn) :-
 0xFFFF < InStrH,
 C2 is InStrH - 0x10000,
 CH is (C2 >> 10) + 0xD800,
 CL is (C2 /\ 0x3FF) + 0xDC00,
 ttp_escape_char_hex(CH, Str,StrT, Str,StrT2),
 ttp_escape_char_hex(CL, Str,StrT2, Str,StrT3),
 !,
 ttp_escape_str_impl(InStrT, Str,StrT3, Str,StrTn)
.

ttp_escape_str_impl([InStrH | InStrT], Str,StrT, Str,StrTn) :-
 (InStrH =< 0x20 ; 0x7F =< InStrH),
 !,
 ttp_escape_char_hex(InStrH, Str,StrT, Str,StrT2),
 ttp_escape_str_impl(InStrT, Str,StrT2, Str,StrTn)
.

ttp_escape_str_impl([InStrH | InStrT], Str,[InStrH | StrT], Str,StrTn) :-
 !,
 ttp_escape_str_impl(InStrT, Str,StrT, Str,StrTn)
.


ttp_escape_char(0'\\, 0'\\, 0'\\).
ttp_escape_char(0'\', 0'\\, 0'\').
ttp_escape_char(0'\", 0'\\, 0'\").
ttp_escape_char(0'\n, 0'\\, 0'n).
ttp_escape_char(0'\r, 0'\\, 0'r).
ttp_escape_char(0'\t, 0'\\, 0't).


ttp_escape_char_hex(Code, Str,StrT, Str,StrTn) :-
 StrT = [0'\\, 0'u | StrT2],
 !,
 ttp_escape_char_hex_body(Code, 0, Str,StrT2, Str,StrTn)
.

ttp_escape_char_hex_body(0, Cnt, Str,StrT, Str,StrT) :- 4 =< Cnt, !.

ttp_escape_char_hex_body(Val, Cnt, Str,StrT, Str,StrTn) :-
 Val1 is Val /\ 0x0F,
 ttp_escape_hex_to_chr(Val1, Chr),
 !,
 Val2 is Val >> 4,
 Cnt2 is Cnt + 1,
 ttp_escape_char_hex_body(Val2, Cnt2, Str,StrT, Str,[Chr | StrTn])
.

ttp_escape_hex_to_chr(0x0, 0'0).
ttp_escape_hex_to_chr(0x1, 0'1).
ttp_escape_hex_to_chr(0x2, 0'2).
ttp_escape_hex_to_chr(0x3, 0'3).
ttp_escape_hex_to_chr(0x4, 0'4).
ttp_escape_hex_to_chr(0x5, 0'5).
ttp_escape_hex_to_chr(0x6, 0'6).
ttp_escape_hex_to_chr(0x7, 0'7).
ttp_escape_hex_to_chr(0x8, 0'8).
ttp_escape_hex_to_chr(0x9, 0'9).
ttp_escape_hex_to_chr(0xA, 0'A).
ttp_escape_hex_to_chr(0xB, 0'B).
ttp_escape_hex_to_chr(0xC, 0'C).
ttp_escape_hex_to_chr(0xD, 0'D).
ttp_escape_hex_to_chr(0xE, 0'E).
ttp_escape_hex_to_chr(0xF, 0'F).



%-----------------------
% ttp_put_error

ttp_put_error_impl(SErr, InFName, LineNo, Msg) :-
 !,
 write(SErr, 'Error: '),
 write(SErr, InFName),
 write(SErr, ' ('),
 write(SErr, LineNo),
 write(SErr, '): '),
 write(SErr, Msg)
.

ttp_put_error(SErr, InFName, LineNo, Msg) :-
 !,
 ttp_put_error_impl(SErr, InFName, LineNo, Msg),
 nl(SErr)
.

ttp_put_error(SErr, InFName, LineNo, Msg, Param) :-
 !,
 ttp_put_error_impl(SErr, InFName, LineNo, Msg),
 write(': '),
 write(Param),
 nl(SErr)
.


%-----------------------
% ttp_reverse

ttp_reverse([], []) :- !.
ttp_reverse([H | T], OutLst) :- !, ttp_reverse_impl(T, H, [], OutLst).

ttp_reverse_impl([], OutH, OutT, [OutH | OutT]) :- !.
ttp_reverse_impl([H | T], OutH, OutTn, OutLst) :- !, ttp_reverse_impl(T, H, [OutH | OutTn], OutLst).


%-----------------------
% ttp_cut_lst

ttp_cut_lst([], _, []) :- !.
ttp_cut_lst([H | _], H, []) :- !.
ttp_cut_lst([H | T], E, [H | To]) :- !, ttp_cut_lst(T, E, To).


%-----------------------
% ttp_replace

ttp_replace([], _, _, []) :- !.
ttp_replace([Ei | Ti], Ei, Eo, [Eo | To]) :- !, ttp_replace(Ti, Ei, Eo, To).
ttp_replace([Hi | Ti], Ei, Eo, [Hi | To]) :- !, ttp_replace(Ti, Ei, Eo, To).


%-----------------------
% ttp_file_name

ttp_file_name(Path, FileName) :-
 !,
 atom_codes(Path, PathStr),
 ttp_file_name_str(PathStr, FileNameStr),
 atom_codes(FileName, FileNameStr)
.

ttp_file_name_str(Path, FileName) :-
 !,
 ttp_replace(Path, 0'\\, 0'/, NPath),
 ttp_reverse(NPath, RPath),
 ttp_cut_lst(RPath, 0'/, RFileName),
 ttp_reverse(RFileName, FileName)
.


%-----------------------
% ttp_base_name

ttp_base_name(Path, BaseName) :-
 !,
 atom_codes(Path, PathStr),
 ttp_base_name_str(PathStr, BaseNameStr),
 atom_codes(BaseName, BaseNameStr)
.

ttp_base_name_str(Path, BaseName) :-
 !,
 ttp_file_name_str(Path, FileName),
 ttp_cut_lst(FileName, 0'., BaseName)
.
