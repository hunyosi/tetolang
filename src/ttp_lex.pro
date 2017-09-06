%=============================================================================
% lexical analyze


ttp_lex_tokens(Xb,Xt, Y) :-
	!,
	ttp_lex_tokens_impl(Xb,Xt, Y,Y, Y,[], Z,Z).


ttp_lex_tokens_impl(Xb,[], Yb,Yt, Yb,Yt, Zb,Zt) :-
	ttp_lex_line_end(Xb),
	!.

ttp_lex_tokens_impl(Xb,Xt, Yb,[Y | Yt2], Yb,Ytn, Zb,Zt) :-
	ttp_lex_token(Xb,Xb2, Y),
	!,
	ttp_lex_tokens_impl(Xb2,Xt, Yb,Yt2, Yb,Ytn, Zb,Zt).

ttp_lex_tokens_impl(Xt,Xt, Yb,Yt, Yb,Yt, Zb,Zt) :-
	!.




ttp_lex_token(Xb,Xt, Y) :-
	ttp_lex_punct(Xb,Xt, Y);
	ttp_lex_integer(Xb,Xt, Y);
	ttp_lex_variable(Xb,Xt, Y);
	ttp_lex_name(Xb,Xt, Y);
	ttp_lex_double_quoted_list(Xb,Xt, Y).


ttp_lex_name(Xb,Xt, name(Y)) :-
	ttp_lex_layout_text_sequence(Xb,Xb2),
	ttp_lex_name_token(Xb2,Xt, Y).


ttp_lex_variable(Xb,Xt, var(Y)) :-
	ttp_lex_layout_text_sequence(Xb,Xb2),
	ttp_lex_variable_token(Xb2,Xt, Y).


ttp_lex_integer(Xb,Xt, Y) :-
	ttp_lex_layout_text_sequence(Xb,Xb2),
	ttp_lex_integer_token(Xb2,Xt, Y).


ttp_lex_double_quoted_list(Xb,Xt, str(Y)) :-
	ttp_lex_layout_text_sequence(Xb,Xb2),
	ttp_lex_double_quoted_list_token(Xb2,Xt, Y).


ttp_lex_punct(Xb,Xt, Z) :-
	ttp_lex_layout_text_sequence(Xb,Xb2),
	[Xb3|Xt] = Xb2,
	Xb3 = 0'. ,
	ttp_lex_layout_text_or_end(Xt),
	!,
	atom_codes(Z, [Xb3]).

ttp_lex_punct(Xb,Xt, '_(') :-
	ttp_lex_layout_text_sequence2(Xb,Xb2),
	[0'(|Xt] = Xb2,
	!.


ttp_lex_punct(Xb,Xt, '(') :-
	[0'(|Xt] = Xb,
	!.

ttp_lex_punct(Xb,Xt, Z) :-
	ttp_lex_layout_text_sequence(Xb,Xb2),
	[Xb3|Xt] = Xb2,
	ttp_lex_punct_char(Xb3),
	!,
	atom_codes(Z, [Xb3]).

ttp_lex_punct_char(0')).
ttp_lex_punct_char(0'[).
ttp_lex_punct_char(0']).
ttp_lex_punct_char(0'{).
ttp_lex_punct_char(0'}).
ttp_lex_punct_char(0'|).
ttp_lex_punct_char(0',).


ttp_lex_line_end(Xb) :-
	ttp_lex_layout_text_sequence(Xb,[]).



% Layout Text

ttp_lex_layout_text_sequence(Xb,Xt) :-
	ttp_lex_layout_text_rep(Xb,Xt).

ttp_lex_layout_text_sequence2(Xb,Xt) :-
	ttp_lex_layout_text(Xb,Xb2),
	!,
	ttp_lex_layout_text_rep(Xb2,Xt).


ttp_lex_layout_text_rep(Xb,Xt) :-
	ttp_lex_layout_text(Xb,Xb2),
	!,
	ttp_lex_layout_text_rep(Xb2,Xt).

ttp_lex_layout_text_rep(Xb,Xb).


ttp_lex_layout_text_or_end(Xb) :-
	ttp_lex_layout_text(Xb,_),
	!.

ttp_lex_layout_text_or_end([]).


ttp_lex_layout_text(Xb,Xt) :-
	ttp_lex_single_line_comment(Xb,Xt),
	!.

ttp_lex_layout_text(Xb,Xt) :-
	ttp_lex_bracketed_comment(Xb,Xt),
	!.

ttp_lex_layout_text([Xb|Xb2],Xt) :-
	ttp_lex_layout_char(Xb),
	!,
	ttp_lex_layout_chars(Xb2,Xt).


ttp_lex_layout_chars([Xb|Xb2],Xt) :-
	ttp_lex_layout_char(Xb),
	!,
	ttp_lex_layout_chars(Xb2,Xt).

ttp_lex_layout_chars(Xb,Xb).


ttp_lex_single_line_comment([0'% | Xb2],Xt) :-
	!,
	ttp_lex_single_line_comment_rep(Xb2,Xt).


ttp_lex_single_line_comment_rep([0'\n | Xt],Xt) :-
	!.

ttp_lex_single_line_comment_rep([],[]).

ttp_lex_single_line_comment_rep([_ | Xb],Xt) :-
	!,
	ttp_lex_single_line_comment_rep(Xb,Xt).


ttp_lex_bracketed_comment([0'/, 0'* | Xb],Xt) :-
	!,
	ttp_lex_bracketed_comment_rep(Xb,Xt).


ttp_lex_bracketed_comment_rep([0'*, 0'/ | Xt],Xt).

ttp_lex_bracketed_comment_rep([_ | Xb],Xt) :-
	!,
	ttp_lex_bracketed_comment_rep(Xb,Xt).



% Names

ttp_lex_name_token(Xb,Xt, Y) :-
	ttp_lex_letter_digit_token(Xb,Xt, Y);
	ttp_lex_graphic_token(Xb,Xt, Y);
	ttp_lex_quoted_token(Xb,Xt, Y);
	ttp_lex_semicolon_token(Xb,Xt, Y);
	ttp_lex_cut_token(Xb,Xt, Y).


ttp_lex_letter_digit_token([Chr | Xb2],Xt, Y) :-
	ttp_lex_small_letter_char(Chr),
	!,
	Yb = [Chr | Yt],
	ttp_lex_letter_digit_token_rep(Xb2,Xt, Yb,Yt, Yb,[]),
	atom_codes(Y, Yb).


ttp_lex_letter_digit_token_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_alphanumeric_char(Chr),
	!,
	Yt = [Chr | Yt2],
	ttp_lex_letter_digit_token_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn).

ttp_lex_letter_digit_token_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_graphic_token([Chr | Xb2],Xt, Y) :-
	ttp_lex_graphic_token_char(Chr),
	!,
	Yb = [Chr | Yt],
	ttp_lex_graphic_token_rep(Xb2,Xt, Yb,Yt, Yb,[]),
	atom_codes(Y, Yb).


ttp_lex_graphic_token_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_graphic_token_char(Chr),
	!,
	Yt = [Chr | Yt2],
	ttp_lex_graphic_token_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn).

ttp_lex_graphic_token_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_graphic_token_char(0'\\) :-
	!.

ttp_lex_graphic_token_char(Chr) :-
	ttp_lex_graphic_char(Chr),
	!.


ttp_lex_quoted_token([0'\' |Xb2],Xt, Y) :-
	!,
	ttp_lex_quoted_token_rep(Xb2,[0'\' |Xt], Yb,Yb, Yb,[]),
	atom_codes(Y, Yb).


ttp_lex_quoted_token_rep(Xb,Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_single_quoted_item(Xb,Xb2, Yb,Yt, Yb,Yt2),
	!,
	ttp_lex_quoted_token_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn).

ttp_lex_quoted_token_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_single_quoted_item(Xb,Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_single_quoted_character(Xb,Xt, Yb,Yt, Yb,Ytn);
	ttp_lex_contenuation_escape_sequence(Xb,Xt, Yb,Yt, Yb,Ytn).


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
	ttp_lex_non_meta_char(Xb,Xt, Yb,Yt, Yb,Ytn).


ttp_lex_hexadecimal_escape_char([0'\\, 0'x, Chr | Xb],Xt, Yb,[Y|Yt], Yb,Yt) :-
	!,
	ttp_lex_hexadecimal_digit_char(Chr),
	Zb = [Chr | Zt],
	ttp_lex_hexadecimal_escape_char_rep(Xb, [0'\\ | Xt], Zb,Zt, Zb,[]),
	number_codes(Y, [0'0, 0'x | Zb]).


ttp_lex_hexadecimal_escape_char_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_hexadecimal_digit_char(Chr),
	!,
	Yt = [Chr | Yt2],
	ttp_lex_hexadecimal_escape_char_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn).

ttp_lex_hexadecimal_escape_char_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_octal_escape_char([0'\\, Chr | Xb3],Xt, Yb,[Y|Yt], Yb,Yt) :-
	ttp_lex_octal_digit_char(Chr),
	!,
	Zb = [Chr | Zt],
	ttp_lex_octal_escape_char_rep(Xb3,[0'\\ | Xt], Zb,Zt, Zb,[]),
	number_codes(Y, [0'0, 0'o | Zb]).


ttp_lex_octal_escape_char_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_octal_digit_char(Chr),
	!,
	Yt = [Chr | Yt2],
	ttp_lex_octal_escape_char_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn).

ttp_lex_octal_escape_char_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_control_escape_char([0'\\, Chr | Xt],Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_symbolic_control_char(Chr, ChrN),
	!,
	Yt = [ChrN | Ytn].

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
	Yt = [Chr | Ytn].


ttp_lex_non_meta_char([Chr | Xt],Xt, Yb,Yt, Yb,Ytn) :-
	\+(ttp_lex_meta_char(Chr)),
	!,
	Yt = [Chr | Ytn].




% Variables

ttp_lex_variable_token([0'_ | Xb2],Xt, Y) :-
	!,
	Yb = [0'_ | Yt],
	ttp_lex_named_variable_rep(Xb2,Xt, Yb,Yt, Yb,[]),
	atom_codes(Y, Yb).

ttp_lex_variable_token([Chr | Xb2],Xt, Y) :-
	ttp_lex_capital_letter_char(Chr),
	!,
	Yb = [Chr | Yt],
	ttp_lex_named_variable_rep(Xb2,Xt, Yb,Yt, Yb,[]),
	atom_codes(Y, Yb).


ttp_lex_named_variable_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_alphanumeric_char(Chr),
	!,
	Yt = [Chr | Yt2],
	ttp_lex_named_variable_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn).

ttp_lex_named_variable_rep(Xb,Xb, Yb,Yt, Yb,Yt).




% Integer numbers

ttp_lex_integer_token(Xb,Xt, Y) :-
	ttp_lex_character_code_constant(Xb,Xt, Y);
	ttp_lex_hexadecimal_constant(Xb,Xt, Y);
	ttp_lex_binary_constant(Xb,Xt, Y);
	ttp_lex_octal_constant(Xb,Xt, Y);
	ttp_lex_integer_constant(Xb,Xt, Y).


ttp_lex_integer_constant([Chr | Xb2],Xt, Y) :-
	ttp_lex_decimal_digit_char(Chr),
	Yb = [Chr | Yt],
	ttp_lex_integer_constant_rep(Xb2,Xt, Yb,Yt, Yb,[]),
	number_codes(Y, Yb).


ttp_lex_integer_constant_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_decimal_digit_char(Chr),
	Yt = [Chr | Yt2],
	!,
	ttp_lex_integer_constant_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn).

ttp_lex_integer_constant_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_binary_constant([0'0, 0'b, Chr | Xb2],Xt, Y) :-
	!,
	ttp_lex_binary_digit_char(Chr),
	Yb = [0'0, 0'b, Chr | Yt],
	ttp_lex_binary_constant_rep(Xb2,Xt, Yb,Yt, Yb,[]),
	number_codes(Y, Yb).


ttp_lex_binary_constant_rep([Chr | Xb2],Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_binary_digit_char(Chr),
	!,
	Yt = [Chr | Yt2],
	ttp_lex_binary_constant_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn).

ttp_lex_binary_constant_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_octal_constant([0'0, 0'o, Chr | Xb],Xt, Y) :-
	!,
	ttp_lex_octal_digit_char(Chr),
	Yb = [0'0, 0'o, Chr | Yt],
	ttp_lex_octal_constant_rep(Xb,Xt, Yb,Yt, Yb,[]),
	number_codes(Y, Yb).

ttp_lex_octal_constant_rep([Chr | Xb],Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_octal_digit_char(Chr),
	!,
	Yt = [Chr | Yt2],
	ttp_lex_octal_constant_rep(Xb,Xt, Yb,Yt2, Yb,Ytn).

ttp_lex_octal_constant_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_hexadecimal_constant([0'0, 0'x, Chr | Xb],Xt, Y) :-
	!,
	ttp_lex_hexadecimal_digit_char(Chr),
	Yb = [0'0, 0'x, Chr | Yt],
	ttp_lex_hexadecimal_constant_rep(Xb,Xt, Yb,Yt, Yb,[]),
	number_codes(Y, Yb).


ttp_lex_hexadecimal_constant_rep([Chr | Xb],Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_hexadecimal_digit_char(Chr),
	!,
	Yt = [Chr | Yt2],
	ttp_lex_hexadecimal_constant_rep(Xb,Xt, Yb,Yt2, Yb,Ytn).

ttp_lex_hexadecimal_constant_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_character_code_constant([0'0, 0'\' | Xb],Xt, Y) :-
	!,
	ttp_lex_single_quoted_character(Xb,Xt, Yb,Yb, Yb,[]),
	[Y | []] = Yb.




% Floting point numbers (atomawasi)


% Double Quoted List

ttp_lex_double_quoted_list_token([0'" | Xb2],Xt, Y) :-
	ttp_lex_double_quoted_list_token_rep(Xb2,[0'" | Xt], Y,Y, Y,[]).

ttp_lex_double_quoted_list_token_rep(Xb,Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_double_quoted_item(Xb,Xb2, Yb,Yt, Yb,Yt2),
	!,
	ttp_lex_double_quoted_list_token_rep(Xb2,Xt, Yb,Yt2, Yb,Ytn).

ttp_lex_double_quoted_list_token_rep(Xb,Xb, Yb,Yt, Yb,Yt).


ttp_lex_double_quoted_item(Xb,Xt, Yb,Yt, Yb,Ytn) :-
	ttp_lex_double_quoted_character(Xb,Xt, Yb,Yt, Yb,Ytn);
	ttp_lex_contenuation_escape_sequence(Xb,Xt, Yb,Yt, Yb,Ytn).




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
	\+(ttp_lex_meta_char(X)).

ttp_lex_small_letter_char(X) :-
	0'a =< X, X =< 0'z;
	\+(ttp_lex_capital_letter_char(X)),
	\+(ttp_lex_decimal_digit_char(X)),
	\+(ttp_lex_layout_char(X)),
	\+(ttp_lex_graphic_char(X)),
	\+(ttp_lex_solo_char(X)),
	\+(ttp_lex_meta_char(X)).

ttp_lex_capital_letter_char(X) :-
	0'A =< X, X =< 0'Z.

ttp_lex_decimal_digit_char(X) :-
	0'0 =< X, X =< 0'9.

ttp_lex_binary_digit_char(X) :-
	0'0 =< X, X =< 0'1.

ttp_lex_octal_digit_char(X) :-
	0'0 =< X, X =< 0'7.

ttp_lex_hexadecimal_digit_char(X) :-
	0'0 =< X, X =< 0'9;
	0'A =< X, X =< 0'F;
	0'a =< X, X =< 0'f.


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
