#include "utils.h"
#include "srcfile.h"
#include "optbl.h"
#include "opdef.h"
#include "stree.h"
#include "synana.h"

#include <stdio.h>



int main(int argc, char **argv)
{
	struct OpTbl *opTbl;
	struct SrcFileInfo *srcFileInfo;
	struct SynAna *synAna;
	union STreeElm *stree;

	globalArgC = argc - 1;
	globalArgV = argv + 1;

	opTbl = OpTbl_new(OpDef_defaultOps);
	srcFileInfo = SrcFileInfo_new("../test.tl");
	synAna = SynAna_new(opTbl, srcFileInfo);
	stree = SynAna_analize(synAna);
	SynAna_delete(synAna);
	OpTbl_delete(opTbl);

	STreeElm_pprint(stree, stdout);

	SrcFileInfo_delete(srcFileInfo);
	return 0;
}
