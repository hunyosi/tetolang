#include "synana.h"

#include <stdlib.h>




static struct SynAnaStk *SynAnaStk_new(
		struct SynAnaStk *prev,
		struct Token *token)
{
	struct SynAnaStk *self = malloc(sizeof(struct SynAnaStk));
	self->prev = prev;
	self->token = token;
	return self;
}


static void SynAnaStk_delete(struct SynAnaStk *self)
{
	if (self == NULL) return;
	Token_delete(self->token);
	free(self);
}


static void SynAnaStk_deleteAll(struct SynAnaStk *self)
{
	struct SynAnaStk *stk, *stkPrev;

	for (stk = self; stk; stk = stkPrev) {
		stkPrev = stk->prev;
		SynAnaStk_delete(stk);
	}
}




struct SynAna *SynAna_new(
	struct OpTbl *opTbl,
	struct SrcFileInfo *srcFileInfo)
{
	struct SynAna *self = malloc(sizeof(struct SynAna));
	self->tokenizer = Tokenizer_new(srcFileInfo);
	self->opTbl = opTbl;
	self->stk = NULL;
	return self;
}


void SynAna_delete(struct SynAna *self)
{
	if (self == NULL) return;
	SynAnaStk_deleteAll(self->stk);
	Tokenizer_delete(self->tokenizer);
	free(self);
}


union STreeElm *SynAna_analize(struct SynAna *self)
{
	return NULL;
}
