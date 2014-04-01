%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
% TetoTetoProlog
% written by ASAKURA, Hunyosi.
%
% This software is made available under
% the Creative Commons CC0 1.0 Universal Public Domain Dedication.
% See "LICENSE" file.
%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


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



%=============================================================================
% lexical analyze


ttp_lex_tokens(Xb,Xt, Y) :-
 !,
 ttp_lex_tokens_impl(Xb,Xt, Y,Y, Y,[])
.


ttp_lex_tokens_impl(Xb,[], Yb,Yt, Yb,Yt) :-
 ttp_lex_line_end(Xb),
 !
.

ttp_lex_tokens_impl(Xb,Xt, Yb,[Y | Yt2], Yb,Ytn) :-
 ttp_lex_token(Xb,Xb2, Y),
 !,
 ttp_lex_tokens_impl(Xb2,Xt, Yb,Yt2, Yb,Ytn)
.

ttp_lex_tokens_impl(Xt,Xt, Yb,Yt, Yb,Yt).


ttp_lex_token(Xb,Xt, Y) :-
 ttp_lex_punct(Xb,Xt, Y);
 ttp_lex_integer(Xb,Xt, Y);
 ttp_lex_variable(Xb,Xt, Y);
 ttp_lex_name(Xb,Xt, Y);
 ttp_lex_double_quoted_list(Xb,Xt, Y)
.


ttp_lex_name(Xb,Xt, name(Y)) :-
 ttp_lex_layout_text_sequence(Xb,Xb2),
 ttp_lex_name_token(Xb2,Xt, Y)
.


ttp_lex_variable(Xb,Xt, var(Y)) :-
 ttp_lex_layout_text_sequence(Xb,Xb2),
 ttp_lex_variable_token(Xb2,Xt, Y)
.


ttp_lex_integer(Xb,Xt, Y) :-
 ttp_lex_layout_text_sequence(Xb,Xb2),
 ttp_lex_integer_token(Xb2,Xt, Y)
.


ttp_lex_double_quoted_list(Xb,Xt, str(Y)) :-
 ttp_lex_layout_text_sequence(Xb,Xb2),
 ttp_lex_double_quoted_list_token(Xb2,Xt, Y)
.


ttp_lex_punct(Xb,Xt, Z) :-
 ttp_lex_layout_text_sequence(Xb,Xb2),
 [Xb3|Xt] = Xb2,
 Xb3 = 0'. ,
 ttp_lex_layout_text_or_end(Xt),
 !,
 atom_codes(Z, [Xb3])
.

ttp_lex_punct(Xb,Xt, '_(') :-
 ttp_lex_layout_text_sequence2(Xb,Xb2),
 [0'(|Xt] = Xb2,
 !
.


ttp_lex_punct(Xb,Xt, '(') :-
 [0'(|Xt] = Xb,
 !
.

ttp_lex_punct(Xb,Xt, Z) :-
 ttp_lex_layout_text_sequence(Xb,Xb2),
 [Xb3|Xt] = Xb2,
 ttp_lex_punct_char(Xb3),
 !,
 atom_codes(Z, [Xb3])
.

ttp_lex_punct_char(0')).
ttp_lex_punct_char(0'[).
ttp_lex_punct_char(0']).
ttp_lex_punct_char(0'{).
ttp_lex_punct_char(0'}).
ttp_lex_punct_char(0'|).
ttp_lex_punct_char(0',).


ttp_lex_line_end(Xb) :-
 ttp_lex_layout_text_sequence(Xb,[])
.



% Layout Text

ttp_lex_layout_text_sequence(Xb,Xt) :-
 ttp_lex_layout_text_rep(Xb,Xt)
.

ttp_lex_layout_text_sequence2(Xb,Xt) :-
 ttp_lex_layout_text(Xb,Xb2),
 !,
 ttp_lex_layout_text_rep(Xb2,Xt)
.


ttp_lex_layout_text_rep(Xb,Xt) :-
 ttp_lex_layout_text(Xb,Xb2),
 !,
 ttp_lex_layout_text_rep(Xb2,Xt)
.
ttp_lex_layout_text_rep(Xb,Xb).

ttp_lex_layout_text_or_end(Xb) :-
 ttp_lex_layout_text(Xb,_),
 !
.
ttp_lex_layout_text_or_end([]).


ttp_lex_layout_text(Xb,Xt) :-
 ttp_lex_single_line_comment(Xb,Xt),
 !
.
ttp_lex_layout_text(Xb,Xt) :-
 ttp_lex_bracketed_comment(Xb,Xt),
 !
.
ttp_lex_layout_text([Xb|Xb2],Xt) :-
 ttp_lex_layout_char(Xb),
 !,
 ttp_lex_layout_chars(Xb2,Xt)
.


ttp_lex_layout_chars([Xb|Xb2],Xt) :-
 ttp_lex_layout_char(Xb),
 !,
 ttp_lex_layout_chars(Xb2,Xt)
.

ttp_lex_layout_chars(Xb,Xb).


ttp_lex_single_line_comment([0'% | Xb2],Xt) :-
 !,
 ttp_lex_single_line_comment_rep(Xb2,Xt)
.

ttp_lex_single_line_comment_rep([0'\n | Xt],Xt) :- !.

ttp_lex_single_line_comment_rep([],[]).

ttp_lex_single_line_comment_rep([_ | Xb],Xt) :-
 !,
 ttp_lex_single_line_comment_rep(Xb,Xt)
.


ttp_lex_bracketed_comment([0'/, 0'* | Xb],Xt) :-
 !,
 ttp_lex_bracketed_comment_rep(Xb,Xt)
.

ttp_lex_bracketed_comment_rep([0'*, 0'/ | Xt],Xt).
ttp_lex_bracketed_comment_rep([_ | Xb],Xt) :-
 !,
 ttp_lex_bracketed_comment_rep(Xb,Xt)
.



% Names

ttp_lex_name_token(Xb,Xt, Y) :-
 ttp_lex_letter_digit_token(Xb,Xt, Y);
 ttp_lex_graphic_token(Xb,Xt, Y);
 ttp_lex_quoted_token(Xb,Xt, Y);
 ttp_lex_semicolon_token(Xb,Xt, Y);
 ttp_lex_cut_token(Xb,Xt, Y)
.


ttp_lex_letter_digit_token([Chr | Xb2],Xt, Y) :-
 ttp_lex_small_letter_char(Chr),
 !,
 Yb = [Chr | Yt],
 ttp_lex_letter_digit_token_rep(Xb2,Xt, Yb,Yt, Yb,[]),
 atom_codes(Y, Yb)
.

ttp_lex_letter_digit_token_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_alphanumeric_char(Chr),
 !,
 Yt = [Chr | Yt2],
 ttp_lex_letter_digit_token_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn)
.
ttp_lex_letter_digit_token_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_graphic_token([Chr | Xb2],Xt, Y) :-
 ttp_lex_graphic_token_char(Chr),
 !,
 Yb = [Chr | Yt],
 ttp_lex_graphic_token_rep(Xb2,Xt, Yb,Yt, Yb,[]),
 atom_codes(Y, Yb)
.

ttp_lex_graphic_token_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_graphic_token_char(Chr),
 !,
 Yt = [Chr | Yt2],
 ttp_lex_graphic_token_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn)
.
ttp_lex_graphic_token_rep(Xb,Xb, Yb,Yt, Yb,Yt).

ttp_lex_graphic_token_char(0'\\) :- !.
ttp_lex_graphic_token_char(Chr) :- ttp_lex_graphic_char(Chr), !.


ttp_lex_quoted_token([0'\' |Xb2],Xt, Y) :-
 !,
 ttp_lex_quoted_token_rep(Xb2,[0'\' |Xt], Yb,Yb, Yb,[]),
 atom_codes(Y, Yb)
.

ttp_lex_quoted_token_rep(Xb,Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_single_quoted_item(Xb,Xb2, Yb,Yt, Yb,Yt2),
 !,
 ttp_lex_quoted_token_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn)
.
ttp_lex_quoted_token_rep(Xb,Xb, Yb,Yt, Yb,Yt).

ttp_lex_single_quoted_item(Xb,Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_single_quoted_character(Xb,Xt, Yb,Yt, Yb,Ytn);
 ttp_lex_contenuation_escape_sequence(Xb,Xt, Yb,Yt, Yb,Ytn)
.

ttp_lex_contenuation_escape_sequence([0'\\, 0'\n | Xt],Xt, Yb,Yt, Yb,Yt).

ttp_lex_semicolon_token([0'; | Xt],Xt, ';').

ttp_lex_cut_token([0'! | Xt],Xt, '!').




% Quoted characters

ttp_lex_single_quoted_character([0'\', 0'\' | Xt],Xt, Yb,[0'\' | Yt], Yb,Yt) :- !.
ttp_lex_single_quoted_character(Xb,Xt, Yb,Yt, Yb,Ytn) :- ttp_lex_non_quote_char(Xb,Xt, Yb,Yt, Yb,Ytn), !.
ttp_lex_single_quoted_character([0'" | Xt],Xt, Yb,[0'" | Yt], Yb,Yt) :- !.
ttp_lex_single_quoted_character([0'` | Xt],Xt, Yb,[0'` | Yt], Yb,Yt) :- !.

ttp_lex_double_quoted_character([0'", 0'" | Xt],Xt, Yb,[0'" | Yt], Yb,Yt) :- !.
ttp_lex_double_quoted_character(Xb,Xt, Yb,Yt, Yb,Ytn) :- ttp_lex_non_quote_char(Xb,Xt, Yb,Yt, Yb,Ytn), !.
ttp_lex_double_quoted_character([0'\' | Xt],Xt, Yb,[0'\' | Yt], Yb,Yt) :- !.
ttp_lex_double_quoted_character([0'` | Xt],Xt, Yb,[0'` | Yt], Yb,Yt) :- !.


ttp_lex_non_quote_char(Xb,Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_hexadecimal_escape_char(Xb,Xt, Yb,Yt, Yb,Ytn);
 ttp_lex_octal_escape_char(Xb,Xt, Yb,Yt, Yb,Ytn);
 ttp_lex_control_escape_char(Xb,Xt, Yb,Yt, Yb,Ytn);
 ttp_lex_meta_escape_char(Xb,Xt, Yb,Yt, Yb,Ytn);
 ttp_lex_non_meta_char(Xb,Xt, Yb,Yt, Yb,Ytn)
.


ttp_lex_hexadecimal_escape_char([0'\\, 0'x, Chr | Xb],Xt, Yb,[Y|Yt], Yb,Yt) :-
 !,
 ttp_lex_hexadecimal_digit_char(Chr),
 Zb = [Chr | Zt],
 ttp_lex_hexadecimal_escape_char_rep(Xb, [0'\\ | Xt], Zb,Zt, Zb,[]),
 number_codes(Y, [0'0, 0'x | Zb])
.

ttp_lex_hexadecimal_escape_char_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_hexadecimal_digit_char(Chr),
 !,
 Yt = [Chr | Yt2],
 ttp_lex_hexadecimal_escape_char_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn)
.
ttp_lex_hexadecimal_escape_char_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_octal_escape_char([0'\\, Chr | Xb3],Xt, Yb,[Y|Yt], Yb,Yt) :-
 ttp_lex_octal_digit_char(Chr),
 !,
 Zb = [Chr | Zt],
 ttp_lex_octal_escape_char_rep(Xb3,[0'\\ | Xt], Zb,Zt, Zb,[]),
 number_codes(Y, [0'0, 0'o | Zb])
.

ttp_lex_octal_escape_char_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_octal_digit_char(Chr),
 !,
 Yt = [Chr | Yt2],
 ttp_lex_octal_escape_char_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn)
.
ttp_lex_octal_escape_char_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_control_escape_char([0'\\, Chr | Xt],Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_symbolic_control_char(Chr, ChrN),
 !,
 Yt = [ChrN | Ytn]
.

ttp_lex_symbolic_control_char(0'n, 0x0A) :- !.
ttp_lex_symbolic_control_char(0't, 0x09) :- !.
ttp_lex_symbolic_control_char(0'r, 0x0D) :- !.
ttp_lex_symbolic_control_char(0'b, 0x08) :- !.
ttp_lex_symbolic_control_char(0'a, 0x07) :- !.
ttp_lex_symbolic_control_char(0'f, 0x0C) :- !.
ttp_lex_symbolic_control_char(0'v, 0x0B) :- !.


ttp_lex_meta_escape_char([0'\\, Chr|Xt],Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_meta_char(Chr),
 !,
 Yt = [Chr | Ytn]
.


ttp_lex_non_meta_char([Chr | Xt],Xt, Yb,Yt, Yb,Ytn) :-
 \+(ttp_lex_meta_char(Chr)),
 !,
 Yt = [Chr | Ytn]
.




% Variables

ttp_lex_variable_token([0'_ | Xb2],Xt, Y) :-
 !,
 Yb = [0'_ | Yt],
 ttp_lex_named_variable_rep(Xb2,Xt, Yb,Yt, Yb,[]),
 atom_codes(Y, Yb)
.

ttp_lex_variable_token([Chr | Xb2],Xt, Y) :-
 ttp_lex_capital_letter_char(Chr),
 !,
 Yb = [Chr | Yt],
 ttp_lex_named_variable_rep(Xb2,Xt, Yb,Yt, Yb,[]),
 atom_codes(Y, Yb)
.

ttp_lex_named_variable_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_alphanumeric_char(Chr),
 !,
 Yt = [Chr | Yt2],
 ttp_lex_named_variable_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn)
.
ttp_lex_named_variable_rep(Xb,Xb, Yb,Yt, Yb,Yt).




% Integer numbers

ttp_lex_integer_token(Xb,Xt, Y) :- 
 ttp_lex_character_code_constant(Xb,Xt, Y);
 ttp_lex_hexadecimal_constant(Xb,Xt, Y);
 ttp_lex_binary_constant(Xb,Xt, Y);
 ttp_lex_octal_constant(Xb,Xt, Y);
 ttp_lex_integer_constant(Xb,Xt, Y)
.


ttp_lex_integer_constant([Chr | Xb2],Xt, Y) :-
 ttp_lex_decimal_digit_char(Chr),
 Yb = [Chr | Yt],
 ttp_lex_integer_constant_rep(Xb2,Xt, Yb,Yt, Yb,[]),
 number_codes(Y, Yb)
.

ttp_lex_integer_constant_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_decimal_digit_char(Chr),
 Yt = [Chr | Yt2],
 !,
 ttp_lex_integer_constant_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn)
.
ttp_lex_integer_constant_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_binary_constant([0'0, 0'b, Chr | Xb2],Xt, Y) :-
 !,
 ttp_lex_binary_digit_char(Chr),
 Yb = [0'0, 0'b, Chr | Yt],
 ttp_lex_binary_constant_rep(Xb2,Xt, Yb,Yt, Yb,[]),
 number_codes(Y, Yb)
.

ttp_lex_binary_constant_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_binary_digit_char(Chr),
 !,
 Yt = [Chr | Yt2],
 ttp_lex_binary_constant_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn)
.
ttp_lex_binary_constant_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_octal_constant([0'0, 0'o, Chr | Xb],Xt, Y) :-
 !,
 ttp_lex_octal_digit_char(Chr),
 Yb = [0'0, 0'o, Chr | Yt],
 ttp_lex_octal_constant_rep(Xb,Xt, Yb,Yt, Yb,[]),
 number_codes(Y, Yb)
.

ttp_lex_octal_constant_rep([Chr | Xb],Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_octal_digit_char(Chr),
 !,
 Yt = [Chr | Yt2],
 ttp_lex_octal_constant_rep(Xb,Xt, Yb,Yt2, Yb,Ytn)
.
ttp_lex_octal_constant_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_hexadecimal_constant([0'0, 0'x, Chr | Xb],Xt, Y) :-
 !,
 ttp_lex_hexadecimal_digit_char(Chr),
 Yb = [0'0, 0'x, Chr | Yt],
 ttp_lex_hexadecimal_constant_rep(Xb,Xt, Yb,Yt, Yb,[]),
 number_codes(Y, Yb)
.

ttp_lex_hexadecimal_constant_rep([Chr | Xb],Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_hexadecimal_digit_char(Chr),
 !,
 Yt = [Chr | Yt2],
 ttp_lex_hexadecimal_constant_rep(Xb,Xt, Yb,Yt2, Yb,Ytn)
.
ttp_lex_hexadecimal_constant_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_character_code_constant([0'0, 0'\' | Xb],Xt, Y) :-
 !,
 ttp_lex_single_quoted_character(Xb,Xt, Yb,Yb, Yb,[]),
 [Y | []] = Yb
.





% Floting point numbers (atomawasi)


% Double Quoted List

ttp_lex_double_quoted_list_token([0'" | Xb2],Xt, Y) :-
 ttp_lex_double_quoted_list_token_rep(Xb2,[0'" | Xt], Y,Y, Y,[])
.

ttp_lex_double_quoted_list_token_rep(Xb,Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_double_quoted_item(Xb,Xb2, Yb,Yt, Yb,Yt2),
 !,
 ttp_lex_double_quoted_list_token_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn)
.
ttp_lex_double_quoted_list_token_rep(Xb,Xb, Yb,Yt, Yb,Yt).

ttp_lex_double_quoted_item(Xb,Xt, Yb,Yt, Yb,Ytn) :-
 ttp_lex_double_quoted_character(Xb,Xt, Yb,Yt, Yb,Ytn);
 ttp_lex_contenuation_escape_sequence(Xb,Xt, Yb,Yt, Yb,Ytn)
.


% Graphic characters

ttp_lex_graphic_char(0'#) :- !.
ttp_lex_graphic_char(0'$) :- !.
ttp_lex_graphic_char(0'&) :- !.
ttp_lex_graphic_char(0'*) :- !.
ttp_lex_graphic_char(0'+) :- !.
ttp_lex_graphic_char(0'-) :- !.
ttp_lex_graphic_char(0'.) :- !.
ttp_lex_graphic_char(0'/) :- !.
ttp_lex_graphic_char(0':) :- !.
ttp_lex_graphic_char(0'<) :- !.
ttp_lex_graphic_char(0'=) :- !.
ttp_lex_graphic_char(0'>) :- !.
ttp_lex_graphic_char(0'?) :- !.
ttp_lex_graphic_char(0'@) :- !.
ttp_lex_graphic_char(0'^) :- !.
ttp_lex_graphic_char(0'~) :- !.


% Alphanumric characters

ttp_lex_alphanumeric_char(X) :- ttp_lex_alpha_char(X), !.
ttp_lex_alphanumeric_char(X) :- ttp_lex_decimal_digit_char(X), !.

ttp_lex_alpha_char(0'_) :- !.
ttp_lex_alpha_char(X) :- ttp_lex_letter_char(X), !.

ttp_lex_letter_char(X) :-
 \+(ttp_lex_decimal_digit_char(X)),
 \+(ttp_lex_layout_char(X)),
 \+(ttp_lex_graphic_char(X)),
 \+(ttp_lex_solo_char(X)),
 \+(ttp_lex_meta_char(X))
.

ttp_lex_small_letter_char(X) :-
 0'a =< X, X =< 0'z;
 \+(ttp_lex_capital_letter_char(X)),
 \+(ttp_lex_decimal_digit_char(X)),
 \+(ttp_lex_layout_char(X)),
 \+(ttp_lex_graphic_char(X)),
 \+(ttp_lex_solo_char(X)),
 \+(ttp_lex_meta_char(X))
.

ttp_lex_capital_letter_char(X) :-
 0'A =< X, X =< 0'Z
.

ttp_lex_decimal_digit_char(X) :-
 0'0 =< X, X =< 0'9
.
ttp_lex_binary_digit_char(X) :-
 0'0 =< X, X =< 0'1
.
ttp_lex_octal_digit_char(X) :-
 0'0 =< X, X =< 0'7
.
ttp_lex_hexadecimal_digit_char(X) :-
 0'0 =< X, X =< 0'9;
 0'A =< X, X =< 0'F;
 0'a =< X, X =< 0'f
.


% Solo characters

ttp_lex_solo_char(0'!) :- !.
ttp_lex_solo_char(0'() :- !.
ttp_lex_solo_char(0')) :- !.
ttp_lex_solo_char(0',) :- !.
ttp_lex_solo_char(0';) :- !.
ttp_lex_solo_char(0'[) :- !.
ttp_lex_solo_char(0']) :- !.
ttp_lex_solo_char(0'[) :- !.
ttp_lex_solo_char(0']) :- !.
ttp_lex_solo_char(0'|) :- !.
ttp_lex_solo_char(0'%) :- !.
ttp_lex_solo_char(0'.) :- !.


% Layout characters

ttp_lex_layout_char(Xb) :- 0x0000 =< Xb, Xb =< 0x0020, !.
ttp_lex_layout_char(Xb) :- 0x007F =< Xb, Xb =< 0x00A0, !.
ttp_lex_layout_char(Xb) :- 0x00AD =:= Xb, !.
ttp_lex_layout_char(Xb) :- 0x1680 =:= Xb, !.
ttp_lex_layout_char(Xb) :- 0x180E =:= Xb, !.
ttp_lex_layout_char(Xb) :- 0x2000 =< Xb, Xb =< 0x200B, !.
ttp_lex_layout_char(Xb) :- 0x202F =:= Xb, !.
ttp_lex_layout_char(Xb) :- 0x205F =:= Xb, !.
ttp_lex_layout_char(Xb) :- 0x3000 =:= Xb, !.
ttp_lex_layout_char(Xb) :- 0xFEFF =:= Xb, !.


% Meta characters

ttp_lex_meta_char(0'\\) :- !.
ttp_lex_meta_char(0'\') :- !.
ttp_lex_meta_char(0'") :- !.
ttp_lex_meta_char(0'`) :- !.




%=============================================================================
% operator info

ttp_op_tbl(1200, xfx, ':-'  , notpre, notpost, n, n).
ttp_op_tbl(1200, xfx, '-->' , notpre, notpost, n, n).
ttp_op_tbl(1200,  fx, ':-'  , prefix, notpost, n, n).
ttp_op_tbl(1200,  fx, '?-'  , prefix, notpost, n, n).
ttp_op_tbl(1100, xfy, ';'   , notpre, notpost, a, r).
ttp_op_tbl(1050, xfy, '->'  , notpre, notpost, a, r).
ttp_op_tbl(1000, xfy, ','   , notpre, notpost, a, r).
ttp_op_tbl( 900,  fy, '\\+' , prefix, notpost, a, r).
ttp_op_tbl( 700, xfx, '='   , notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '\\=' , notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '=='  , notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '\\==', notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '@<'  , notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '@=<' , notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '@>'  , notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '@>=' , notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '=..' , notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, 'is'  , notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '=:=' , notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '=\\=', notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '<'   , notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '=<'  , notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '>'   , notpre, notpost, n, n).
ttp_op_tbl( 700, xfx, '>='  , notpre, notpost, n, n).
ttp_op_tbl( 500, yfx, '+'   , notpre, notpost, a, l).
ttp_op_tbl( 500, yfx, '-'   , notpre, notpost, a, l).
ttp_op_tbl( 500, yfx, '/\\' , notpre, notpost, a, l).
ttp_op_tbl( 500, yfx, '\\/' , notpre, notpost, a, l).
ttp_op_tbl( 400, yfx, '*'   , notpre, notpost, a, l).
ttp_op_tbl( 400, yfx, '/'   , notpre, notpost, a, l).
ttp_op_tbl( 400, yfx, '//'  , notpre, notpost, a, l).
ttp_op_tbl( 400, yfx, 'rem' , notpre, notpost, a, l).
ttp_op_tbl( 400, yfx, 'mod' , notpre, notpost, a, l).
ttp_op_tbl( 400, yfx, '<<'  , notpre, notpost, a, l).
ttp_op_tbl( 400, yfx, '>>'  , notpre, notpost, a, l).
ttp_op_tbl( 200, xfx, '**'  , notpre, notpost, n, n).
ttp_op_tbl( 200, xfy, '^'   , notpre, notpost, a, r).
ttp_op_tbl( 200,  fy, '-'   , prefix, notpost, a, r).
ttp_op_tbl( 200,  fy, '\\'  , prefix, notpost, a, r).


ttp_op_info(P, Pn, S, Op, Pre, Post, A, D) :-
 ttp_op_tbl(P, S, Op, Pre, Post, A, D),
 P = Pn
.

ttp_op_info(0, _, _, _, _, _, _, _) :-
 !,
 fail
.

ttp_op_info(P, Pn, Op, S, Pre, Post, A, D) :-
 !,
 P2 is P - 1,
 ttp_op_info(P2, Pn, Op, S, Pre, Post, A, D)
.


%=============================================================================
% analyze syntax

ttp_stx_expr(Ai,Ao, X) :-
 ttp_stx_top_level_expr(Ai,Ao, [],[punc('.'), term(X)]),
 !
.


ttp_stx_top_level_expr(Ai,Ao, Bi,Bo) :-
 ttp_stx_expr(Ai,Ao, 1201, Bi,Bo),
 !
.

ttp_stx_inner_expr(Ai,Ao, Bi,Bo) :-
 ttp_stx_expr(Ai,Ao, 999, Bi,Bo),
 !
.



ttp_stx_expr([A|A2],Ao, P, Bi,Bo) :-
 [punc('('), term(X) | _] = Bi,
 atom(X),
 ttp_stx_inner_expr(A2,A3, [A|Bi],Bi2),
 ttp_stx_expr(A3,Ao, P, Bi2,Bo)
.

ttp_stx_expr([A|A2],Ao, P, Bi,Bo) :-
 [punc('[') | _] = Bi,
 ttp_stx_inner_expr(A2,A3, [A|Bi],Bi2),
 ttp_stx_expr(A3,Ao, P, Bi2,Bo)
.

ttp_stx_expr([A|A2],Ao, P, Bi,Bo) :-
 [punc('_(') | _] = Bi,
 ttp_stx_top_level_expr(A2,A3, [A|Bi],Bi2),
 ttp_stx_expr(A3,Ao, P, Bi2,Bo)
.

ttp_stx_expr([A|A2],Ao, P, Bi,Bo) :-
 [punc('(') | _] = Bi,
 ttp_stx_top_level_expr(A2,A3, [A|Bi],Bi2),
 ttp_stx_expr(A3,Ao, P, Bi2,Bo)
.

ttp_stx_expr([A|A2],Ao, P, Bi,Bo) :-
 [punc('{') | _] = Bi,
 ttp_stx_top_level_expr(A2,A3, [A|Bi],Bi2),
 ttp_stx_expr(A3,Ao, P, Bi2,Bo)
.


% infix operators

ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(Y), op(Op1), term(X) | Bt],Bo) :-
 ttp_op_info(Ph , P2, _, Op2, notpre, _      , _, _),
 P1s is P2 - 1,
 ttp_op_info(P1s, _ , _, Op1, notpre, notpost, _, _),
 T = pred([Op1, X, Y]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(T) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(Y), op(Op1), term(X) | Bt],Bo) :-
 ttp_op_info(Ph, P2, _, Op2, notpre, _      , _, _),
 ttp_op_info(P2, _ , _, Op1, notpre, notpost, a, l),
 T = pred([Op1, X, Y]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(T) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(Y), op(Op), term(X) | Bt],Bo) :-
 ttp_op_info(Ph, _, _, Op, notpre, notpost, _, _),
 T = pred([Op, X, Y]),
 ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(T) | Bt],Bo)
.


% postfix operators

ttp_stx_expr(Ai,Ao, Ph, [op(Op2), op(Op1), term(X) | Bt],Bo) :-
 ttp_op_info(Ph , P2, _, Op2, notpre, _      , _, _),
 P1s is P2 - 1,
 ttp_op_info(P1s, _ , _, Op1, notpre, postfix, _, _),
 T = pred([Op1, X]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(T) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [op(Op2), op(Op1), term(X) | Bt],Bo) :-
 ttp_op_info(Ph , P2, _, Op2, notpre, _      , a, _),
 P1s is P2 - 1,
 ttp_op_info(P1s, _ , _, Op1, notpre, postfix, a, l),
 T = pred([Op1, X]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op1), term(T) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [punc(M), op(Op1), term(X) | Bt],Bo) :-
 ttp_op_info(Ph, _, _, Op1, notpre, postfix, _, _),
 T = pred([Op1, X]),
 ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(T) | Bt],Bo)
.


% prefix operators

ttp_stx_expr(Ai,Ao, P, [X, Y, Z | Bt],Bo) :-
 number(X),
 (op('-') = Y ; term('-') = Y),
 (op(_) = Z ; punc(_) = Z),
 X2 is -X,
 ttp_stx_expr(Ai,Ao, P, [term(X2), Z | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, P, [X, Y],Bo) :-
 number(X),
 (op('-') = Y ; term('-') = Y),
 X2 is -X,
 ttp_stx_expr(Ai,Ao, P, [term(X2)],Bo)
.


ttp_stx_expr(Ai,Ao, Ph, [op(Op3), term(X), op(Op2), op(Op1) | Bt],Bo) :-
 ttp_op_info(Ph , P3, _, Op3, notpre, _      , _, _),
 ttp_op_info(Ph , P1, _, Op1, _     , notpost, _, _),
 (P1 < P3 -> P2s is P1 - 1 ; P2s is P3 - 1),
 ttp_op_info(P2s, _ , _, Op2, prefix, notpost, _, _),
 T = pred([Op2, X]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op3), term(T), op(Op1) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(X), op(Op2), op(Op1) | Bt],Bo) :-
 ttp_op_info(Ph , P1, _, Op1, _     , notpost, _, _),
 P2s is P1 - 1,
 ttp_op_info(P2s, _ , _, Op2, prefix, notpost, _, _),
 T = pred([Op2, X]),
 ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(T), op(Op1) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [op(Op3), term(X), op(Op2), op(Op1) | Bt],Bo) :-
 ttp_op_info(Ph , P3, _, Op3, notpre, _      , _, _),
 P1s is P3 - 1,
 ttp_op_info(P1s, P1, _, Op1, _     , notpost, a, r),
 ttp_op_info(P1 , _ , _, Op2, prefix, notpost, _, _),
 T = pred([Op2, X]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op3), term(T), op(Op1) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(X), op(Op2), op(Op1) | Bt],Bo) :-
 ttp_op_info(Ph, P1, _, Op1, _     , notpost, a, r),
 ttp_op_info(P1, _ , _, Op2, prefix, notpost, _, _),
 T = pred([Op2, X]),
 ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(T), op(Op1) | Bt],Bo)
.


ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(X), op(Op1), punc(M) | Bt],Bo) :-
 ttp_op_info(Ph , P2, _, Op2, notpre, _      , _, _),
 P1s is P2 - 1,
 ttp_op_info(P1s, _ , _, Op1, prefix, notpost, _, _),
 T = pred([Op1, X]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(T), punc(M) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [punc(M2), term(X), op(Op), punc(M1) | Bt],Bo) :-
 ttp_op_info(Ph, _, _, Op, prefix, notpost, _, _),
 T = pred([Op, X]),
 ttp_stx_expr(Ai,Ao, Ph, [punc(M2), term(T), punc(M1) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(X), op(Op1)],Bo) :-
 ttp_op_info(Ph , P2, _, Op2, notpre, _      , _, _),
 P1s is P2,
 ttp_op_info(P1s, _ , _, Op1, prefix, notpost, _, _),
 T = pred([Op1, X]),
 ttp_stx_expr(Ai,Ao, Ph, [op(Op2), term(T)],Bo)
.

ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(X), op(Op)],Bo) :-
 ttp_op_info(Ph, _, _, Op, prefix, notpost, _, _),
 T = pred([Op, X]),
 ttp_stx_expr(Ai,Ao, Ph, [punc(M), term(T)],Bo)
.


% non operator


ttp_stx_expr(A,Ao, P, Bi,Bo) :-
 999 = P,
 [Close, term(X) | Bt] = Bi,
 ttp_close_punc(Close),
 ttp_stx_expr(A,Ao, P, [Close, args([X]) | Bt],Bo)
.

ttp_stx_expr(A,Ao, P, Bi,Bo) :-
 999 = P,
 [Close, args(X2), punc(','), term(X) | Bt] = Bi,
 ttp_close_punc(Close),
 ttp_stx_expr(A,Ao, P, [Close, args([X|X2]) | Bt],Bo)
.


ttp_stx_expr(Ai,Ao, _, [punc(')'), args(X2), punc('('), term(X1) | Bt],Bo) :-
 atom(X1),
 Ao = Ai,
 T = pred([X1 | X2]),
 Bo = [term(T) | Bt]
.

ttp_stx_expr(A,A, _, [punc(']'), args([X2]), punc('|'), args(X1), punc('[') | Bt],Bo) :-
 ttp_lst_add(X1, X2, T),
 Bo = [term(list(T)) | Bt]
.

ttp_stx_expr(A,A, _, [punc(']'), punc('[') | Bt],[term(list([])) | Bt]).

ttp_stx_expr(A,A, _, [punc(']'), args(X), punc('[') | Bt],[term(list(X)) | Bt]).

ttp_stx_expr(A,A, _, [punc(')'), term(X), punc('_(') | Bt],[term(X) | Bt]).

ttp_stx_expr(A,A, _, [punc(')'), term(X), punc('(') | Bt],[term(X) | Bt]).

ttp_stx_expr(A,A, _, [punc('}'), punc('{') | Bt],[term('{}') | Bt]).

ttp_stx_expr(A,A, _, [punc('}'), term(X), punc('{') | Bt],[term(pred(['{}', X])) | Bt]).


ttp_stx_expr(A,Ao, P, [Close, op(X), Open | Bt],Bo) :-
 (ttp_open_punc(Open) ; ttp_sep_punc(Open)),
 (ttp_close_punc(Close) ; ttp_sep_punc(Close)),
 ttp_stx_expr(A,Ao, P, [Close, term(X), Open |Bt],Bo)
.


ttp_stx_expr(Ai,Ao, Ph, [name(X) | Bt],Bo) :-
 ttp_op_info(Ph, _, _, X, _, _, _, _),
 B2 = [op(X) | Bt],
 ttp_stx_expr(Ai,Ao, Ph, B2,Bo)
.

ttp_stx_expr(Ai,Ao, P, [X | Bt],Bo) :-
 atomic(X),
 ttp_op_info(P, _, _, X, _, _, _, _),
 ttp_stx_expr(Ai,Ao, P, [op(X) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, P, [name(X) | Bt],Bo) :-
 ttp_stx_expr(Ai,Ao, P, [term(X) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, P, [X | Bt],Bo) :-
 var(_) = X,
 ttp_stx_expr(Ai,Ao, P, [term(X) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, P, [X | Bt],Bo) :-
 str(_) = X,
 ttp_stx_expr(Ai,Ao, P, [term(X) | Bt],Bo)
.

ttp_stx_expr(Ai,Ao, P, ['.' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('.') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, ['_(' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('_(') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, ['(' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('(') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, [')' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc(')') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, ['[' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('[') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, [']' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc(']') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, ['{' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('{') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, ['}' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('}') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, [',' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc(',') | Bt],Bo).
ttp_stx_expr(Ai,Ao, P, ['|' | Bt],Bo) :- ttp_stx_expr(Ai,Ao, P, [punc('|') | Bt],Bo).

ttp_stx_expr(Ai,Ao, P, [X | Bt],Bo) :-
 atomic(X),
 ttp_stx_expr(Ai,Ao, P, [term(X) | Bt],Bo)
.

ttp_stx_expr(A,A, _, X,X) :-
 [punc('.'), term(_)] = X
.

ttp_stx_expr([],[], _, Bi,Bi).

ttp_stx_expr([A|A2],Ao, P, Bi,Bo) :-
 B2 = [A | Bi],
 ttp_stx_expr(A2,Ao, P, B2,Bo)
.


ttp_sep_punc(punc(C)) :- ttp_sep_punc_char(C).
ttp_sep_punc_char(',').
ttp_sep_punc_char(';').
ttp_sep_punc_char('|').
ttp_sep_punc_char('.').

ttp_open_punc(punc(C)) :- ttp_open_punc_char(C).
ttp_open_punc_char('(').
ttp_open_punc_char('_(').
ttp_open_punc_char('[').
ttp_open_punc_char('{').

ttp_close_punc(punc(C)) :- ttp_close_punc_char(C).
ttp_close_punc_char('|').
ttp_close_punc_char(')').
ttp_close_punc_char(']').
ttp_close_punc_char('}').




%=============================================================================
% translate


ttp_translate_to_js_top(SOut, X) :- 
 pred([':-', _, _]) = X,
 !,
 write(SOut, 'ctx.assertz('),
 ttp_translate_to_js_pred(SOut, X),
 write(SOut, ');'), nl(SOut)
.

ttp_translate_to_js_top(_, X) :- 
 pred([':-', _]) = X,
 !
.

ttp_translate_to_js_top(SOut, X) :- 
 pred(_) = X,
 !,
 write(SOut, 'ctx.assertz('), 
 ttp_translate_to_js_pred(SOut, X),
 write(SOut, ');'), nl(SOut)
.

ttp_translate_to_js_top(SOut, X) :- 
 atom(X),
 !,
 write(SOut, 'ctx.assertz('), 
 ttp_translate_to_js_pred(SOut, X),
 write(SOut, ');'), nl(SOut)
.





ttp_translate_to_js_pred(SOut, pred(X)) :-
 !,
 write(SOut, 'PTerm('),
 ttp_translate_to_js_args(SOut, X),
 write(SOut, ')')
.

ttp_translate_to_js_pred(SOut, list(X)) :-
 !,
 write(SOut, 'toPLst('),
 ttp_translate_to_js_list(SOut, X),
 write(SOut, ')')
.

ttp_translate_to_js_pred(SOut, var(X)) :-
 !,
 write(SOut, 'PVar(\''),
 ttp_escape_atom(X, EX),
 write(SOut, EX),
 write(SOut, '\')')
.

ttp_translate_to_js_pred(SOut, str(X)) :-
 !,
 ttp_escape_str(X, EX),
 atom_codes(A, EX),
 write(SOut, 'PStr(\''),
 write(SOut, A),
 write(SOut, '\')')
.

ttp_translate_to_js_pred(SOut, X) :-
 number(X),
 !,
 write(SOut, 'PFloat('),
 write(SOut, X),
 write(SOut, ')')
.

ttp_translate_to_js_pred(SOut, X) :-
 atom(X),
 !,
 ttp_escape_atom(X, EX),
 write(SOut, 'PAtom(\''),
 write(SOut, EX),
 write(SOut, '\')')
.


% arguments

ttp_translate_to_js_args(_, []) :- !.
ttp_translate_to_js_args(SOut, [X|Xt]) :-
 !,
 ttp_translate_to_js_pred(SOut, X),
 ttp_translate_to_js_args2(SOut, Xt)
.

ttp_translate_to_js_args2(_, []) :- !.
ttp_translate_to_js_args2(SOut, [X|Xt]) :-
 !,
 write(SOut, ', '),
 ttp_translate_to_js_pred(SOut, X),
 ttp_translate_to_js_args2(SOut, Xt)
.


% list

ttp_translate_to_js_list(SOut, []) :- !, write(SOut, 'null').
ttp_translate_to_js_list(SOut, [X|Xt]) :-
 !, 
 write(SOut, '['),
 ttp_translate_to_js_pred(SOut, X),
 ttp_translate_to_js_list2(SOut, Xt)
.

ttp_translate_to_js_list2(SOut, []) :- !, write(SOut, ']').
ttp_translate_to_js_list2(SOut, [X|Xt]) :-
 !,
 write(SOut, ', '),
 ttp_translate_to_js_pred(SOut, X),
 ttp_translate_to_js_list2(SOut, Xt)
.
ttp_translate_to_js_list2(SOut, X) :-
 !,
 write(SOut, '], '),
 ttp_translate_to_js_pred(SOut, X)
.



%=============================================================================
% I/O

ttp_read_line(SIn, Line) :-
 ttp_read_line(SIn, Line,Line, Line,[])
.

ttp_read_line(SIn, Line,LineT, Line,LineT) :-
 at_end_of_stream(SIn),
 !
.

ttp_read_line(SIn, Line,LineT, Line,LineTn) :-
 get_code(SIn, Chr),
 ((Chr < 0 ; ttp_is_new_line(SIn, Chr)) -> 
  LineT = [0x0A | LineTn],
  !
 ;
  LineT = [Chr | LineT2],
  !,
  ttp_read_line(SIn, Line,LineT2, Line,LineTn)
 )
.

ttp_is_new_line(SIn, 0x0D) :-
 peek_code(SIn, 0x0A),
 get_code(SIn, _)
.

ttp_is_new_line(_, 0x0D).

ttp_is_new_line(_, 0x0A).




ttp_exists(Elm, [ListH|_]) :-
 Elm == ListH,
 !
.

ttp_exists(_, []) :-
 !,
 fail
.

ttp_exists(Elm, [_|ListT]) :-
 !,
 ttp_exists(Elm, ListT)
.


ttp_exists_end(Tokens) :-
 ttp_exists('.', Tokens)
.



ttp_get_sentence(List, S, R) :-
 !,
 ttp_get_sentence_impl(List, S,S, S,[], R)
.

ttp_get_sentence_impl([ListH|R], S,St, S,Stn, R) :-
 '.' == ListH,
 !,
 St = [ListH|Stn]
.

ttp_get_sentence_impl([], _,_, _,_, _) :-
 !,
 fail
.

ttp_get_sentence_impl([ListH|ListT], S,St, S,Stn, R) :-
 !,
 St = [ListH|St2],
 ttp_get_sentence_impl(ListT, S,St2, S,Stn, R)
.





ttp_read_sentence(SIn, S, InLineNo, OutLineNo) :-
 ttp_read_sentence_impl(SIn, [], S, InLineNo, OutLineNo)
.


ttp_read_sentence_impl(SIn, _, [], OutLineNo, OutLineNo) :-
 at_end_of_stream(SIn),
 !
.

ttp_read_sentence_impl(SIn, InLine, S, InLineNo, OutLineNo) :-
 !,
 ttp_read_line(SIn, LineN),
 InLineNo2 is InLineNo + 1,
 % write(InLineNo2), write(': '), format('~s', [LineN]),
 ttp_lst_add(InLine, LineN, Line),
 ttp_lex_tokens(Line,Rest, Tokens),
 (Rest == [], ttp_exists_end(Tokens) ->
  !,
  S = Tokens,
  OutLineNo = InLineNo2
 ;
  !,
  ttp_read_sentence_impl(SIn, Line, S, InLineNo2, OutLineNo)
 )
.


%============================================================================
% REPL

ttp_repl_main(SIn, _, _) :-
 at_end_of_stream(SIn),
 !
.

ttp_repl_main(SIn, SOut, Prev) :-
 !,
 write('TP ?- '),
 ttp_read_sentence(SIn, Next, 0, _),
 ttp_lst_add(Prev, Next, Tokens),
 ttp_repl_eval(SOut, Tokens, Rest),
 ttp_repl_main(SIn, SOut, Rest)
.


ttp_repl_eval(SOut, Tokens, Rest) :-
 ttp_get_sentence(Tokens, S, R),
 !,
 ttp_stx_expr(S,_, Ast),
 ttp_translate_to_js_top(SOut, Ast),
 ttp_repl_eval(SOut, R, Rest)
.

ttp_repl_eval(_, Rest, Rest).


ttp_repl :-
 !,
 current_input(SIn),
 current_output(SOut),
 ttp_repl_main(SIn, SOut, [])
.



%============================================================================
% ttp_translate_stream


ttp_translate_per_sentence(SOut, Tokens, Rest) :-
 ttp_get_sentence(Tokens, S, R),
 !,
 (     % for GNU Prolog GC
  ttp_stx_expr(S,_, Ast),
  ttp_translate_to_js_top(SOut, Ast),
  fail % for GNU Prolog GC
  ;    % for GNU Prolog GC
  true % for GNU Prolog GC
 ),    % for GNU Prolog GC
 !,
 ttp_translate_per_sentence(SOut, R, Rest)
.

ttp_translate_per_sentence(_, Rest, Rest).


ttp_translate_stream_impl(SIn, _, _, _, _, _) :-
 at_end_of_stream(SIn),
 !
.

ttp_translate_stream_impl(SIn, SOut, SErr, InFName, Prev, LineNo) :-
 !,
 ttp_read_sentence(SIn, Next, LineNo, LineNo2),
 ttp_lst_add(Prev, Next, Tokens),
 (
  write(SOut, '// '), write(SOut, InFName), %debug
  write(SOut, '('), write(SOut, LineNo), write(SOut, '-'), write(SOut, LineNo2), write(SOut, '):'), nl(SOut),  %debug
  ttp_translate_per_sentence(SOut, Tokens, Rest),
  !
 ;
  ttp_put_error(SErr, InFName, LineNo2, 'syntax error'), 
  !, 
  fail
 ),
 ttp_translate_stream_impl(SIn, SOut, SErr, InFName, Rest, LineNo2)
.


ttp_translate_stream(SIn, SOut, SErr, InFName) :-
 !,
 ttp_translate_stream_impl(SIn, SOut, SErr, InFName, [], 0)
.




%=============================================================================
% runtime

ttp_runtime([
 predLabel(',', 2),
  setLocal(0, getParam(1)),
  goSub(getParam(0)),
  goTo(getLocal(0)),

 predLabel(';', 2),
  setLocal(0, getParam(1)),
  pushBTP(at(';2')),
  goTo(getParam(0)),
 label(';2'),
  goTo(getLocal(0)),

 predLabel('!', 0),
  cutBT,
  ret,

 predLabel('true', 0),
  ret,

 predLabel('fail', 0),
  fail,

 predLabel('->', 2),
  setLocal(0, getParam(1)),
  goSub(getParam(0)),
  cutBT,
  goTo(getLocal(0)),

 predLabel('=', 2),
  unify(getParam(0), getParam(1)),
  ret,

 predLabel('is', 2),
  setLocal(0, getParam(0)),
  goSub(getParam(1)),
  unify(getLocal(0), getParam),
  ret,

 predLabel('==', 2), % temporary implementation
  jmpIf(eq(getParam(0), getParam(1)), at('==2')),
   fail,
 label('==2'),
  ret,

 predLabel('=:=', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('=:=2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('=:=2'),
  jmpIf(isNumber(getLocal(1)), at('=:=3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('=:=3'),
  jmpIf(eq(getLocal(0), getLocal(1)), at('=:=4')),
  fail,
 label('=:=4'),
  ret,

 predLabel('=\\=', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('=\\=2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('=\\=2'),
  jmpIf(isNumber(getLocal(1)), at('=\\=3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('=\\=3'),
  jmpIf(ne(getLocal(0), getLocal(1)), at('=\\=4')),
  fail,
 label('=\\=4'),
  ret,

 predLabel('<', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('<2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('<2'),
  jmpIf(isNumber(getLocal(1)), at('<3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('<3'),
  jmpIf(lt(getLocal(0), getLocal(1)), at('<4')),
  fail,
 label('<4'),
  ret,

 predLabel('=<', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('=<2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('=<2'),
  jmpIf(isNumber(getLocal(1)), at('=<3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('=<3'),
  jmpIf(lte(getLocal(0), getLocal(1)), at('=<4')),
  fail,
 label('=<4'),
  ret,

 predLabel('>', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('>2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('>2'),
  jmpIf(isNumber(getLocal(1)), at('>3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('>3'),
  jmpIf(gt(getLocal(0), getLocal(1)), at('>4')),
  fail,
 label('>4'),
  ret,

 predLabel('>=', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('>=2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('>=2'),
  jmpIf(isNumber(getLocal(1)), at('>=3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('>=3'),
  jmpIf(gte(getLocal(0), getLocal(1)), at('>=4')),
  fail,
 label('>=4'),
  ret,

 predLabel('-', 1),
  setLocal(0, getParam(0)),
  jmpIf(isNumber(getLocal(0)), at('-A')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('-A'),
  ret(neg(getLocal(0))),

 predLabel('+', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('+2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('+2'),
  jmpIf(isNumber(getLocal(1)), at('+3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('+3'),
  ret(add(getLocal(0), getLocal(1))),

 predLabel('-', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('-2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('-2'),
  jmpIf(isNumber(getLocal(1)), at('-3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('-3'),
  ret(sub(getLocal(0), getLocal(1))),

 predLabel('*', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('*2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('*2'),
  jmpIf(isNumber(getLocal(1)), at('*3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('*3'),
  ret(mul(getLocal(0), getLocal(1))),

 predLabel('/', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('/2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('/2'),
  jmpIf(isNumber(getLocal(1)), at('/3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('/3'),
  ret(div(getLocal(0), getLocal(1))),

 predLabel('/\\', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('/\\2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('/\\2'),
  jmpIf(isNumber(getLocal(1)), at('/\\3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('/\\3'),
  ret(bitAnd(getLocal(0), getLocal(1))),

 predLabel('\\/', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('\\/2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('\\/2'),
  jmpIf(isNumber(getLocal(1)), at('\\/3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('\\/3'),
  ret(bitOr(getLocal(0), getLocal(1))),

 predLabel('<<', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('<<2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('<<2'),
  jmpIf(isNumber(getLocal(1)), at('<<3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('<<3'),
  ret(shr(getLocal(0), getLocal(1))),

 predLabel('>>', 2),
  setLocal(0, getParam(0)),
  setLocal(1, getParam(1)),
  jmpIf(isNumber(getLocal(0)), at('>>2')),
   goSub(getLocal(0)),
   setLocal(0, getParam),
 label('>>2'),
  jmpIf(isNumber(getLocal(1)), at('>>3')),
   goSub(getLocal(1)),
   setLocal(1, getParam),
 label('>>3'),
  ret(bitOr(getLocal(0), getLocal(1))),

 predLabel('write', 1),
  raw('out.print(p[0].toString(e));'),
  ret,

 predLabel('nl', 0),
  raw('out.nl();'),
  ret,

 predLabel('write', 2),
  raw('toPVal(p[0],e).print(p[1].toString(e));'),
  ret,

 predLabel('nl', 1),
  raw('toPVal(p[0],e).nl();'),
  ret,

 predLabel('get_code', 2),
  raw('p[1].unify(toPVal(p[0],e).get_code(),e);'),
  ret,

 predLabel('peek_code', 2),
  raw('p[1].unify(toPVal(p[0],e).peek_code(),e);'),
  ret,

 predLabel('at_end_of_stream', 2),
  raw('toPVal(p[0],e).at_end_of_stream();'),
  ret,

 predLabel('atom_codes', 2),
  raw('atom_codes(p[0],p[1],e);'),
  ret,

 predLabel('number_codes', 2),
  raw('number_codes(p[0],p[1],e);'),
  ret,

 dummy
]).


ttp_label_gosub_count(X, Labels) :-
 !,
 ttp_label_gosub_count_impl(X, 0, Labels,Labels)
.

ttp_label_gosub_count_impl(
  [],
  _,
  _,[]) :-
 !
.

ttp_label_gosub_count_impl(
  [predLabel(N, A)|T],
  Cnt,
  Labels,[label(N, A, Cnt, public) | LabelsT]) :-
 !,
 Cnt2 is Cnt + 1,
 ttp_label_gosub_count_impl(T, Cnt2, Labels,LabelsT)
.

ttp_label_gosub_count_impl(
  [label(N)|T],
  Cnt,
  Labels,[label(N, 0, Cnt, private) | LabelsT]) :-
 !,
 Cnt2 is Cnt + 1,
 ttp_label_gosub_count_impl(T, Cnt2, Labels,LabelsT)
.

ttp_label_gosub_count_impl(
  [goSub(_)|T],
  Cnt,
  Labels,LabelsT) :-
 !,
 Cnt2 is Cnt + 1,
 ttp_label_gosub_count_impl(T, Cnt2, Labels,LabelsT)
.

ttp_label_gosub_count_impl(
  [_|T],
  Cnt,
  Labels,LabelsT) :-
 !,
 ttp_label_gosub_count_impl(T, Cnt, Labels,LabelsT)
.


ttp_label_map_to_js(_, []) :- !.

ttp_label_map_to_js(SOut, [label(Name, A, No, public)|T]) :-
 !,
 ttp_escape_atom(Name, Name2),
 write(SOut, 'ctx.addPred('''),
 write(SOut, Name2),
 write(SOut, ''', '),
 write(SOut, A),
 write(SOut, ', '),
 write(SOut, No),
 write(SOut, ');'),
 nl(SOut),
 ttp_label_map_to_js(SOut, T)
.

ttp_label_map_to_js(SOut, [_|T]) :-
 !,
 ttp_label_map_to_js(SOut, T)
.


ttp_get_label_no([], _, _, _) :- !, fail.

ttp_get_label_no([label(Label, A, No, _) | _], Label, A, No) :- !.

ttp_get_label_no([_|T], Label, A, No) :-
 !,
 ttp_get_label_no(T, Label, A, No)
.


ttp_instruction_to_js(
  SOut, stat(Cnt, Labels), stat(Cnt2, Labels), predLabel(N, A)) :-
 !,
 ttp_escape_atom(N, N2),
 write(SOut, 'case '), write(SOut, Cnt), write(SOut, ':'),
 write(SOut, ' // pred: '''), write(SOut, N2), write(SOut, '''/'), write(SOut, A),
 nl(SOut),
 Cnt2 is Cnt + 1
.

ttp_instruction_to_js(
  SOut, stat(Cnt, Labels), stat(Cnt2, Labels), label(N)) :-
 !,
 write(SOut, 'case '), write(SOut, Cnt), write(SOut, ':'),
 write(SOut, ' // label: '), write(SOut, N),
 nl(SOut),
 Cnt2 is Cnt + 1
.

ttp_instruction_to_js(SOut, stat(Cnt, Labels), StatN, goSub(X)) :-
 !,
 Cnt2 is Cnt + 1,
 write(SOut, 'n={s:'),
 write(SOut, Cnt),
 write(SOut, ',c:c,v:v,n:n};setTerm('),
 ttp_instruction_to_js(SOut, stat(Cnt2, Labels), StatN, X),
 write(SOut, ');continue;'),
 nl(SOut),
 write(SOut, 'case '), write(SOut, Cnt), write(SOut, ':'), nl(SOut)
.

ttp_instruction_to_js(SOut, Stat, StatN, goTo(X)) :-
 !,
 write(SOut, 'setTerm('),
 ttp_instruction_to_js(SOut, Stat, StatN, X),
 write(SOut, ');continue;'),
 nl(SOut)
.

ttp_instruction_to_js(SOut, Stat, StatN, pushBTP(X)) :-
 !,
 write(SOut, 'b={s:'),
 ttp_instruction_to_js(SOut, Stat, StatN, X),
 write(SOut, ',n:n,v:v,p:p,e:e,b:b};e=makePEnv(e);'),
 nl(SOut)
.

ttp_instruction_to_js(SOut, Stat, StatN, setLocal(X, Y)) :-
 !,
 write(SOut, 'v['), write(SOut, X), write(SOut, ']='),
 ttp_instruction_to_js(SOut, Stat, StatN, Y),
 write(SOut, ';'),
 nl(SOut)
.

ttp_instruction_to_js(SOut, Stat, Stat, setCutP) :-
 !,
 write(SOut, 'c=b;'), nl(SOut)
.

ttp_instruction_to_js(SOut, Stat, Stat, cutBT) :-
 !,
 write(SOut, 'b=c;'), nl(SOut)
.

ttp_instruction_to_js(SOut, Stat, Stat, fail) :-
 !,
 write(SOut, 'throw new PFailure;'), nl(SOut)
.

ttp_instruction_to_js(SOut, Stat, Stat, ret) :-
 !,
 write(SOut, 'p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;'),
 nl(SOut)
.

ttp_instruction_to_js(SOut, Stat, Stat, ret(X)) :-
 !,
 write(SOut, 'p='),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ';s=n.s;c=n.c;v=n.v;n=n.n;continue;'),
 nl(SOut)
.

ttp_instruction_to_js(SOut, Stat, Stat, jmpIf(X, Y)) :-
 !,
 write(SOut, 'if('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, '){'),
 write(SOut, 's='),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ';continue;}'),
 nl(SOut)
.

ttp_instruction_to_js(SOut, Stat, Stat, unify(X, Y)) :-
 !,
 write(SOut, '('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ').unify('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e);'),
 nl(SOut)
.

ttp_instruction_to_js(SOut, Stat, Stat, neg(X)) :-
 !,
 write(SOut, 'toPVal(-toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e))')
.

ttp_instruction_to_js(SOut, Stat, Stat, add(X, Y)) :-
 !,
 write(SOut, 'toPVal(toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)+toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e))')
.

ttp_instruction_to_js(SOut, Stat, Stat, sub(X, Y)) :-
 !,
 write(SOut, 'toPVal(toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)-toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e))')
.

ttp_instruction_to_js(SOut, Stat, Stat, mul(X, Y)) :-
 !,
 write(SOut, 'toPVal(toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)*toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e))')
.

ttp_instruction_to_js(SOut, Stat, Stat, div(X, Y)) :-
 !,
 write(SOut, 'toPVal(toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)/toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e))')
.

ttp_instruction_to_js(SOut, Stat, Stat, bitAnd(X, Y)) :-
 !,
 write(SOut, 'toPVal(toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)&toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e))')
.

ttp_instruction_to_js(SOut, Stat, Stat, bitOr(X, Y)) :-
 !,
 write(SOut, 'toPVal(toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)|toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e))')
.

ttp_instruction_to_js(SOut, Stat, Stat, shl(X, Y)) :-
 !,
 write(SOut, 'toPVal(toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)<<toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e))')
.

ttp_instruction_to_js(SOut, Stat, Stat, shr(X, Y)) :-
 !,
 write(SOut, 'toPVal(toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)>>toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e))')
.

ttp_instruction_to_js(SOut, Stat, Stat, isAtom(X)) :-
 !,
 write(SOut, 'toPVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e) instanceof PAtom')
.

ttp_instruction_to_js(SOut, Stat, Stat, isNumber(X)) :-
 !,
 write(SOut, 'toPVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e) instanceof PFloat')
.

ttp_instruction_to_js(SOut, Stat, Stat, eq(X, Y)) :-
 !,
 write(SOut, 'toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)===toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e)')
.

ttp_instruction_to_js(SOut, Stat, Stat, ne(X, Y)) :-
 !,
 write(SOut, 'toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)!==toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e)')
.

ttp_instruction_to_js(SOut, Stat, Stat, lt(X, Y)) :-
 !,
 write(SOut, 'toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)<toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e)')
.

ttp_instruction_to_js(SOut, Stat, Stat, lte(X, Y)) :-
 !,
 write(SOut, 'toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)<=toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e)')
.

ttp_instruction_to_js(SOut, Stat, Stat, lt(X, Y)) :-
 !,
 write(SOut, 'toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)<toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e)')
.

ttp_instruction_to_js(SOut, Stat, Stat, gt(X, Y)) :-
 !,
 write(SOut, 'toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)>toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e)')
.

ttp_instruction_to_js(SOut, Stat, Stat, gte(X, Y)) :-
 !,
 write(SOut, 'toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, X),
 write(SOut, ',e)>=toNVal('),
 ttp_instruction_to_js(SOut, Stat, _, Y),
 write(SOut, ',e)')
.

ttp_instruction_to_js(SOut, Stat, Stat, at(Name)) :-
 !,
 stat(_, Labels) = Stat,
 write(SOut, ' /* at('), write(SOut, Name), write(SOut, ') */ '),
 ttp_get_label_no(Labels, Name, 0, No),
 write(SOut, No)
.

ttp_instruction_to_js(SOut, Stat, Stat, getLocal(X)) :-
 !,
 write(SOut, 'v['), write(SOut, X), write(SOut, ']')
.

ttp_instruction_to_js(SOut, Stat, Stat, getParam(X)) :-
 !,
 write(SOut, 'p['), write(SOut, X), write(SOut, ']')
.

ttp_instruction_to_js(SOut, Stat, Stat, getParam) :-
 !,
 write(SOut, 'p')
.

ttp_instruction_to_js(SOut, Stat, Stat, raw(X)) :-
 !,
 write(SOut, X), nl(SOut)
.

ttp_instruction_to_js(_, Stat, Stat, dummy) :-
 !
.

ttp_instruction_to_js(SOut, Stat, Stat, X) :-
 !,
 write(SOut, '// '), write(SOut, X), nl(SOut)
.


ttp_instructions_to_js(_, _, []) :- !.

ttp_instructions_to_js(SOut, Stat, [H|T]) :-
 !,
 ttp_instruction_to_js(SOut, Stat, Stat2, H),
 ttp_instructions_to_js(SOut, Stat2, T)
.


%============================================================================
%

ttp_do_templ_cmd(SOut, _, pred([runtime, labels])) :-
 !,
 ttp_runtime(Insts),
 ttp_label_gosub_count(Insts, Labels),
 ttp_label_map_to_js(SOut, Labels)
.

ttp_do_templ_cmd(SOut, _, pred([runtime, impl])) :-
 !,
 ttp_runtime(Insts),
 ttp_label_gosub_count(Insts, Labels),
 ttp_instructions_to_js(SOut, stat(0, Labels), Insts)
.

ttp_do_templ_cmd(SOut, SErr, pred([transrate, InFName])) :-
 !,
 open(InFName, read, SIn),
 (
  ttp_translate_stream(SIn, SOut, SErr, InFName),
  !
 ;
  ttp_put_error(SErr, InFName, -, 'transrate error')
 ),
 close(SIn)
.


ttp_appl_templ_impl(_, SIn, _, _, LineNo, LineNo) :-
 at_end_of_stream(SIn),
 !
.

ttp_appl_templ_impl(InFName, SIn, SOut, SErr, LineNo, LineNoN) :-
 !,
 ttp_read_line(SIn, Line),
 LineNo2 is LineNo + 1,
 (Line = [0'/, 0'/, 0'%, 0'% | LineBody] ->
  (ttp_lex_tokens(LineBody,[], Tokens) -> 
   (ttp_get_sentence(Tokens, S, []) ->
    (ttp_stx_expr(S,[], Ast) ->
     ttp_do_templ_cmd(SOut, SErr, Ast)
%     write(SOut, '//'), write(SOut, Ast), nl(SOut)
    ;
     ttp_put_error(SErr, InFName, LineNo2, 'error3')
    )
   ;
    ttp_put_error(SErr, InFName, LineNo2, 'error2')
   )
  ;
   ttp_put_error(SErr, InFName, LineNo2, 'error1')
  )
 ;
  atom_codes(LineAtom, Line),
  write(SOut, LineAtom)
 ),
 ttp_appl_templ_impl(InFName, SIn, SOut, SErr, LineNo2, LineNoN)
.


ttp_apply_template_stream(InFName, SIn, SOut, SErr, LineNo) :-
 !,
 ttp_appl_templ_impl(InFName, SIn, SOut, SErr, 0, LineNo) 
.


ttp_apply_template(InFName, OutFName, LineNo) :-
 !,
 current_output(SErr),
 open(InFName, read, SIn),
 open(OutFName, write, SOut),
 (
  ttp_apply_template_stream(InFName, SIn, SOut, SErr, LineNo),
  !
 ;
  ttp_put_error(SErr, InFName, '-', 'error: ttp_apply_template_stream')
 ),
 close(SOut),
 close(SIn)
.


ttp_build_js_library(SrcFile, DstFile) :-
 !,
 ttp_apply_template(SrcFile, DstFile, LineNo),
 write(LineNo), write(' line(s)'), nl,
 halt
.


ttp_compile_stream(SIn, SOut, SErr) :-
 !,
 ttp_compile_stream('', SIn, SOut, SErr)
.

ttp_compile_stream(SrcFile, SIn, SOut, SErr) :-
 !,
 write(SOut, 'var ctx=ttp(),PAtom=ttp.PAtom,PFloat=ttp.PFloat,PVar=ttp.PVar,PTerm=ttp.PTerm,PStr=ttp.PStr,toPLst=ttp.toPLst;'), nl(SOut),
 ttp_translate_stream(SIn, SOut, SErr, SrcFile),
 write(SOut, 'return ctx;'), nl(SOut)
.


ttp_compile(SrcFile, DstFile) :-
 !,
 current_output(SErr),
 open(SrcFile, read, SIn),
 open(DstFile, write, SOut),
 ttp_base_name(DstFile, Namespace),
 (
  write(SOut, 'var '), write(SOut, Namespace), write(SOut, '=(function(ttp){'), nl(SOut),
  ttp_compile_stream(SrcFile, SIn, SOut, SErr),
  !,
  write(SOut, '})(TetoTetoProlog);'), nl(SOut)
 ;
  ttp_put_error(SErr, SrcFile, '-', 'transrate error')
 ),
 close(SOut),
 close(SIn),
 halt
.

ttpc(SrcFile, DstFile) :- !, ttp_compile(SrcFile, DstFile), !.

