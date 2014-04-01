%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
% TetoTetoProlog example
% written by ASAKURA, Hunyosi.
% 
% This software is made available under
% the Creative Commons CC0 1.0 Universal Public Domain Dedication.
% See "LICENSE" file.
%XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


chimera(kasane_teto).
immortal(X) :- chimera(X).


%----------------
% example_lst_add

example_lst_add([], Y, Y).
example_lst_add([X|Xt], Y, [X|Zt]) :- example_lst_add(Xt, Y, Zt).


example_lst_add2([], Y, Y) :- !.
example_lst_add2([X|Xt], Y, [X|Zt]) :- !, example_lst_add2(Xt, Y, Zt).


%-----------------------
% example_reverse

example_reverse([], []) :- !.
example_reverse([H | T], OutLst) :- !, example_reverse_impl(T, H, [], OutLst).

example_reverse_impl([], OutH, OutT, [OutH | OutT]) :- !.
example_reverse_impl([H | T], OutH, OutTn, OutLst) :- !, example_reverse_impl(T, H, [OutH | OutTn], OutLst).


%-----------------------
% example_cut_lst

example_cut_lst([], _, []) :- !.
example_cut_lst([H | _], H, []) :- !.
example_cut_lst([H | T], E, [H | To]) :- !, example_cut_lst(T, E, To).


%-----------------------
% example_replace

example_replace([], _, _, []) :- !.
example_replace([Ei | Ti], Ei, Eo, [Eo | To]) :- !, example_replace(Ti, Ei, Eo, To).
example_replace([Hi | Ti], Ei, Eo, [Hi | To]) :- !, example_replace(Ti, Ei, Eo, To).


%-----------------------
% example_file_name

example_file_name_str(Path, FileName) :-
 !,
 example_replace(Path, 0'\\, 0'/, NPath),
 example_reverse(NPath, RPath),
 example_cut_lst(RPath, 0'/, RFileName),
 example_reverse(RFileName, FileName)
.


%-----------------------
% example_base_name

example_base_name_str(Path, BaseName) :-
 !,
 example_file_name_str(Path, FileName),
 example_cut_lst(FileName, 0'., BaseName)
.

