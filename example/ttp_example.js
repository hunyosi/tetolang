var ttp_example=(function(ttp){
var ctx=ttp(),PAtom=ttp.PAtom,PFloat=ttp.PFloat,PVar=ttp.PVar,PTerm=ttp.PTerm,PStr=ttp.PStr,toPLst=ttp.toPLst;
// example/ttp_example.pro(0-11):
ctx.assertz(PTerm(PAtom('chimera'), PAtom('kasane_teto')));
// example/ttp_example.pro(11-12):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('immortal'), PVar('X')), PTerm(PAtom('chimera'), PVar('X'))));
// example/ttp_example.pro(12-18):
ctx.assertz(PTerm(PAtom('example_lst_add'), toPLst(null), PVar('Y'), PVar('Y')));
// example/ttp_example.pro(18-19):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_lst_add'), toPLst([PVar('X')], PVar('Xt')), PVar('Y'), toPLst([PVar('X')], PVar('Zt'))), PTerm(PAtom('example_lst_add'), PVar('Xt'), PVar('Y'), PVar('Zt'))));
// example/ttp_example.pro(19-22):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_lst_add2'), toPLst(null), PVar('Y'), PVar('Y')), PAtom('!')));
// example/ttp_example.pro(22-23):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_lst_add2'), toPLst([PVar('X')], PVar('Xt')), PVar('Y'), toPLst([PVar('X')], PVar('Zt'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('example_lst_add2'), PVar('Xt'), PVar('Y'), PVar('Zt')))));
// example/ttp_example.pro(23-29):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_reverse'), toPLst(null), toPLst(null)), PAtom('!')));
// example/ttp_example.pro(29-30):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_reverse'), toPLst([PVar('H')], PVar('T')), PVar('OutLst')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('example_reverse_impl'), PVar('T'), PVar('H'), toPLst(null), PVar('OutLst')))));
// example/ttp_example.pro(30-32):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_reverse_impl'), toPLst(null), PVar('OutH'), PVar('OutT'), toPLst([PVar('OutH')], PVar('OutT'))), PAtom('!')));
// example/ttp_example.pro(32-33):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_reverse_impl'), toPLst([PVar('H')], PVar('T')), PVar('OutH'), PVar('OutTn'), PVar('OutLst')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('example_reverse_impl'), PVar('T'), PVar('H'), toPLst([PVar('OutH')], PVar('OutTn')), PVar('OutLst')))));
// example/ttp_example.pro(33-39):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_cut_lst'), toPLst(null), PVar('_'), toPLst(null)), PAtom('!')));
// example/ttp_example.pro(39-40):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_cut_lst'), toPLst([PVar('H')], PVar('_')), PVar('H'), toPLst(null)), PAtom('!')));
// example/ttp_example.pro(40-41):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_cut_lst'), toPLst([PVar('H')], PVar('T')), PVar('E'), toPLst([PVar('H')], PVar('To'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('example_cut_lst'), PVar('T'), PVar('E'), PVar('To')))));
// example/ttp_example.pro(41-47):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_replace'), toPLst(null), PVar('_'), PVar('_'), toPLst(null)), PAtom('!')));
// example/ttp_example.pro(47-48):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_replace'), toPLst([PVar('Ei')], PVar('Ti')), PVar('Ei'), PVar('Eo'), toPLst([PVar('Eo')], PVar('To'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('example_replace'), PVar('Ti'), PVar('Ei'), PVar('Eo'), PVar('To')))));
// example/ttp_example.pro(48-49):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_replace'), toPLst([PVar('Hi')], PVar('Ti')), PVar('Ei'), PVar('Eo'), toPLst([PVar('Hi')], PVar('To'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('example_replace'), PVar('Ti'), PVar('Ei'), PVar('Eo'), PVar('To')))));
// example/ttp_example.pro(49-61):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_file_name_str'), PVar('Path'), PVar('FileName')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('example_replace'), PVar('Path'), PFloat(92), PFloat(47), PVar('NPath')), PTerm(PAtom(','), PTerm(PAtom('example_reverse'), PVar('NPath'), PVar('RPath')), PTerm(PAtom(','), PTerm(PAtom('example_cut_lst'), PVar('RPath'), PFloat(47), PVar('RFileName')), PTerm(PAtom('example_reverse'), PVar('RFileName'), PVar('FileName'))))))));
// example/ttp_example.pro(61-71):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('example_base_name_str'), PVar('Path'), PVar('BaseName')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('example_file_name_str'), PVar('Path'), PVar('FileName')), PTerm(PAtom('example_cut_lst'), PVar('FileName'), PFloat(46), PVar('BaseName'))))));
// example/ttp_example.pro(71-72):
return ctx;
})(TetoTetoProlog);
