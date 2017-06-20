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
