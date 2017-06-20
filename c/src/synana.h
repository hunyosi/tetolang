#ifndef SYNANA_H
#define SYNANA_H

#include "srcfile.h"
#include "token.h"
#include "tokenizer.h"
#include "stree.h"
#include "optbl.h"
#include "nametbl.h"


struct SynAnaStk {
	struct SynAnaStk *prev;
	struct Token *token;
};

struct SynAna {
	struct Tokenizer *tokenizer;
	struct OpTbl *opTbl;
	struct SynAnaStk *stk;
};

struct SynAna *SynAna_new(
	struct OpTbl *opTbl,
	struct SrcFileInfo *srcFileInfo);

void SynAna_delete(struct SynAna *self);

union STreeElm *SynAna_analize(struct SynAna *self);


#endif
