%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
% TetoTetoProlog
% written by ASAKURA, Hunyosi.
%
% This software is made available under
% the Creative Commons CC0 1.0 Universal Public Domain Dedication.
% See "LICENSE" file.
%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


%=============================================================================
% unit test utils


ttpu_assert(Test, true, Result) :-
 write('try: '), write(Test), write(' --> '),
 (
  call(Test),
  Result = ok,
  write('[OK]');
  Result = ng,
  write('[NL]')
 ),
 nl,
 !
.

ttpu_assert(Test, false, Result) :-
 call(Test),
 Result = ok,
 !;
 Result = ng,
 write('error: '), write(Test), nl,
 !
.

ttpu_unit_tests_cnt(ok, [OkCnt|NgCnt], [OkCntN|NgCnt]) :- OkCntN is OkCnt + 1.
ttpu_unit_tests_cnt(ng, [OkCnt|NgCnt], [OkCnt|NgCntN]) :- NgCntN is NgCnt + 1.

ttpu_assert(Test, Flag, Cnt, CntN) :-
 ttpu_assert(Test, Flag, Result),
 ttpu_unit_tests_cnt(Result, Cnt, CntN)
.

ttpu_asserts([Test|Tests], Flag, Cnt, CntN) :-
 !,
 ttpu_assert(Test, Flag, Cnt, Cnt2),
 ttpu_asserts(Tests, Flag, Cnt2, CntN)
.
ttpu_asserts([], _, Cnt, Cnt).


ttpu_unit_tests([Test|Tests], Flag) :-
 ttpu_unit_tests([Test|Tests], Flag, OkCnt, NgCnt),
 Sum is OkCnt + NgCnt,
 write('tests: '), write(Sum), write(', ok: '), write(OkCnt), write(', ng: '), write(NgCnt), nl
.
ttpu_unit_tests([Test|Tests], Flag, OkCnt, NgCnt) :-
 ttpu_unit_tests([Test|Tests], Flag, 0, 0, OkCnt, NgCnt)
.
ttpu_unit_tests([Test|Tests], Flag, OkCnt, NgCnt, OkCntN, NgCntN) :-
 !,
 T =.. [Test, Flag, [OkCnt|NgCnt], [OkCnt2|NgCnt2]],
 call(T),
 ttpu_unit_tests(Tests, Flag, OkCnt2, NgCnt2, OkCntN, NgCntN)
.
ttpu_unit_tests([], _, OkCnt, NgCnt, OkCnt, NgCnt).




%=============================================================================
% utils unit tests

ttp_test_lst_add(Flag, Cnt, CntN) :-
 ttpu_asserts([
  ttp_lst_add([a, b, c], [d, e, f], [a, b, c, d, e, f])
 ], Flag, Cnt, CntN)
.


ttp_test_lst_len(Flag, Cnt, CntN) :-
 ttpu_asserts([
  ttp_lst_len([a, b, c], 3)
 ], Flag, Cnt, CntN)
.




%=============================================================================
% lexical analyze unit tests


ttp_test_double_quoted_list_token(Flag, Cnt, CntN) :-
 ttpu_asserts([
  ttp_lex_double_quoted_list_token("\"abc\" def", " def", "abc")
 ], Flag, Cnt, CntN)
.

ttp_test_integer_token(Flag, Cnt, CntN) :-
 ttpu_asserts([
  ttp_lex_integer_token("1234567890abc","abc", 1234567890)
  , ttp_lex_integer_token("0b10102abc","2abc", 0b1010)
  , ttp_lex_integer_token("0o456789abc","89abc", 0o4567)
  , ttp_lex_integer_token("0x9abCdefghij","ghij", 0x9abCdef)
 ], Flag, Cnt, CntN)
.

ttp_test_variable_token(Flag, Cnt, CntN) :-
 ttpu_asserts([
  ttp_lex_variable_token("_+ abc", "+ abc", '_')
  , ttp_lex_variable_token("_abc123+ abc", "+ abc", '_abc123')
  , ttp_lex_variable_token("Abc123+ abc", "+ abc", 'Abc123')
 ], Flag, Cnt, CntN)
.

ttp_test_non_quote_char(Flag, Cnt, CntN) :-
 ttpu_asserts([
  ttp_lex_non_quote_char("\\x4A\\abc","abc", Y,Y, [0x4A],[])
  , ttp_lex_non_quote_char("\\57\\abc","abc", Y2,Y2, [0o57],[])
  , ttp_lex_non_quote_char("\\axyz","xyz", Y3,Y3, [0x07],[])
  , ttp_lex_non_quote_char("\\nxyz","xyz", Y4,Y4, [0x0A],[])
  , ttp_lex_non_quote_char("\\'xyz","xyz", Y5,Y5, [0'\'],[])
 ], Flag, Cnt, CntN)
.

ttp_test_name_token(Flag, Cnt, CntN) :-
 ttpu_asserts([
  ttp_lex_name_token("'abc'def","def", 'abc')
%   , ttp_lex_name_token("'gh\\\nij'kl","kl", 'gh\
% ij')
  , ttp_lex_name_token("@$\\#aaa","aaa", '@$\\#')
  , ttp_lex_name_token("xyz789A","A", 'xyz789')
  , ttp_lex_name_token("!xyz789A","xyz789A", '!')
  , ttp_lex_name_token(";xyz789A","xyz789A", ';')
 ], Flag, Cnt, CntN)
.

ttp_test_layout_text(Flag, Cnt, CntN) :-
 ttpu_asserts([
  ttp_lex_layout_text_sequence("% test&123\nabc","abc", ['% test&123'])
  , ttp_lex_layout_text_sequence("/* test&123\nabc*/def","def", ['/* test&123\nabc'])
  , ttp_lex_layout_text_sequence("def","def", [])
  , \+(ttp_lex_layout_text_sequence2("def","def", _))
 ], Flag, Cnt, CntN)
.

ttp_test_tokens(Flag, Cnt, CntN) :-
 ttpu_asserts([
  ttp_lex_end(".\nabc","\nabc", '.')
  , ttp_lex_end(".",[], '.')
  , ttp_lex_end(".% test&123\nabc","% test&123\nabc", '.')
  , ttp_lex_end("./* test&123\nabc*/def","/* test&123\nabc*/def", '.')
  , \+(ttp_lex_end(".abc","abc", '.'))
 ], Flag, Cnt, CntN)
.


ttp_unit_test_lex_ana(Flag) :-
 ttpu_unit_tests([
  ttp_test_double_quoted_list_token
  , ttp_test_integer_token
  , ttp_test_variable_token
  , ttp_test_non_quote_char
  , ttp_test_name_token
  , ttp_test_layout_text
  , ttp_test_tokens
 ], Flag)
.




%=============================================================================
% operator info tests


:-
 ttp_op_info(1201, P, S, ':-', Pre, Post, A, D),
 write('P='), write(P),
 write(', S='), write(S),
 write(', Pre='), write(Pre),
 write(', Post='), write(Post),
 write(', A='), write(A),
 write(', D='), write(D), nl
.

:-
 ttp_op_info(999, P, S, ':-', Pre, Post, A, D),
 write('P='), write(P),
 write(', S='), write(S),
 write(', Pre='), write(Pre),
 write(', Post='), write(Post),
 write(', A='), write(A),
 write(', D='), write(D), nl
.

:-
 ttp_op_info(999, P, S, '-', Pre, Post, A, D),
 write('P='), write(P),
 write(', S='), write(S),
 write(', Pre='), write(Pre),
 write(', Post='), write(Post),
 write(', A='), write(A),
 write(', D='), write(D), nl,
 fail
.



%=============================================================================
% analyze syntax unit tests

ttp_test_tokens(Flag, Cnt, CntN) :-
 ttpu_asserts([
  ttp_stx_expr([1, +, 2, *, 3, '.'],[], pred(['+', 1, pred(['*', 2, 3])]))
  ttp_stx_expr([1, *, '(', 2, +, 3, ')', +, 4, '.'],[], pred(['*', 1, pred(['+', 2, 3])])),
  ttp_stx_expr([1, +, 2, +, 3, +, 4, '.'],[], pred('+', [pred(['+', pred(['+', 1, 2]), 3]), 4])),
  ttp_stx_expr([1, '-', '-', 2, *, 3, '.'],[], pred(['-', 1, pred('*', pred(['-', 2]), 3])])),
  ttp_stx_expr([1, *, '-', '(', 2, +, 3, ')', +, 4, '.'], pred(['+', pred(['*', 1, pred(['-' pred(['+', 2, 3])])]), 4])),
  ttp_stx_expr([a, *, '\\', '-', '(', b, +, c, ')', +, d, '.'],[], pred),
 write(X),nl
.

:-
 ttp_stx_expr([a, '(', b, +, c, '(', d , ',', e, ')', ',', f, ',', g, ')', +, h, '.'],[],
  [1201], [],X),
 write(X),nl
.

:-
 ttp_stx_expr(['[', a, '(', b, ')', ',', ':-', ',', 'c', ']', '.'],[], [1201], [],X),
 write(X),nl
.
 
:-
 ttp_stx_expr(['[', a, ',', b, ',', c, '|', 'd', ']', '.'],[], [1201], [],X),
 write(X),nl
.
 
:-
 ttp_stx_expr([human, '(', socrates, ')', '.'],[], [1201], [],X),
 write(X),nl
.
 
:-
 ttp_stx_expr([motal, '(', 'X', ')', ':-', human, '(', 'X', ')', '.'],[], [1201], [],X),
 write(X),nl
.

:-
 ttp_stx_expr([':-', motal, '(', socrates, ')', '.'],[], [1201], [],X),
 write(X),nl
.


%=============================================================================
% translate to js unit tests

:-
 ttp_translate_to_js_pred(pred([a, b, c])),
 nl
.

:-
 ttp_translate_to_js_pred(list([a, b, c])),
 nl
.


:-
 ttp_translate_to_js_pred(list([a, b, c|d])),
 nl
.

:-
 ttp_translate_to_js_top(pred([a, list([1, 2|pred([b, 3, 4])]), c])),
 nl
.

:-
 ttp_translate_to_js_top(pred([atom_codes, abc123, str("abc123")])),
 nl
.

:-
 Src = 'abc',
 ttp_escape_atom(Src, Dst),
 write('Src='), write(Src), nl,
 write('Dst='), write(Dst), nl
.

%:- trace.

:-
  Src = 'ab\tc',
  ttp_escape_atom(Src, Dst),
  write('Src='), write(Src), nl,
  write('Dst='), write(Dst), nl
.

%:- notrace.

:-
 Src = 'ab\xA5\c',
 ttp_escape_atom(Src, Dst),
 write('Src='), write(Src), nl,
 write('Dst='), write(Dst), nl
.

:-
 Src = [0x31, 0x2000B, 0x32],
 ttp_escape_str(Src, Dst),
 write('Src='), write(Src), nl,
 write('Dst='), write(Dst), nl
.


%=============================================================================
% I/O


%============================================================================
% REPL


%============================================================================
% ttp_translate_stream



%=============================================================================
% test


ttp_unit_test_translate :-
 ttp_lex_tokens("aaa(X) :- A is 1+2, write(A), atom_codes(X, \"hello\").",_, X),
 write(X), nl,
 ttp_stx_expr(X,_, Y),
 write(Y), nl,
 current_output(SOut),
 ttp_translate_to_js_top(SOut, Y)
.



%=============================================================================
% runtime


%============================================================================
%


ttp :-
 ttp_apply_template('tprobase.js', 'tetoprolog.js', LineNo),
 write(LineNo), write(' line(s)'), nl,
 halt
.

ttp2 :-
 LineBody = " transrate('compiler_pro').",
 ttp_lex_tokens(LineBody,R, Tokens),
 write('R='), write(R), nl,
 write('Tokens='), write(Tokens), nl,
 halt
.

