#include "proginfo.h"

#include <stdlib.h>


struct ProgInfo *ProgInto_new()
{
	struct ProgInfo *self;
	self = malloc(sizeof(struct ProgInfo));

	self->stree = NULL;
	self->nameTbl = NameTbl_new();
	self->errBuf = ErrBuf_new();

	return self;
}


static void ProgInfo_analizeSTreeImpl(
		struct ProgInfo *self,
		union STreeElm *stree);

static void ProgInfo_defineName(
		struct ProgInfo *self,
		struct STreeElmSyntax *p)
{
	struct NameTbl *nameTbl = self->nameTbl;
	struct ErrBuf *errBuf = self->errBuf;
	struct STreeElmNode *elm = &p->elm->node;
	struct STreeElmName *name = &elm->l->name;
	const char *nameStr = name->token->str;
	union STreeElm *val = elm->r;
	struct Variable *var;
	union NameTblEntry *entry;

	entry = NameTbl_find(nameTbl, nameStr);
	if (entry != NULL) {
		ErrBuf_error(errBuf, "duplicate name: %s", nameStr);
		return;
	} 

	var = Variable_new(nameStr, PrimitiveType_int);
	entry = (union NameTblEntry *)var;
	NameTbl_add(nameTbl, entry);

	name->nameTblEntry = entry;

	ProgInfo_analizeSTreeImpl(self, val);

	var->stree = val;
}

static void ProgInfo_referName(
		struct ProgInfo *self,
		struct STreeElmSyntax *p)
{
	struct NameTbl *nameTbl = self->nameTbl;
	struct ErrBuf *errBuf = self->errBuf;
	struct STreeElmName *name = &p->elm->name;
	const char *nameStr = name->token->str;
	struct Variable *var;
	union NameTblEntry *entry;

	entry = NameTbl_find(nameTbl, nameStr);
	if (entry == NULL) {
		ErrBuf_error(errBuf, "undefined name: %s", nameStr);
		return;
	} 

	name->nameTblEntry = entry;
}

static void ProgInfo_analizeSyntaxSTree(
		struct ProgInfo *self,
		struct STreeElmSyntax *p)
{
	const struct SyntaxKind *sk = p->syntaxKind;

	if (sk == SyntaxKind_defineName) {
		ProgInfo_defineName(self, p);

	} else if (sk == SyntaxKind_referName) {
		ProgInfo_referName(self, p);

	} else if (sk == SyntaxKind_opPlus) {
		ProgInfo_analizeSTreeImpl(self, p->elm);
	} else if (sk == SyntaxKind_opMinus) {
		ProgInfo_analizeSTreeImpl(self, p->elm);
	} else if (sk == SyntaxKind_opAsterisk) {
		ProgInfo_analizeSTreeImpl(self, p->elm);
	} else if (sk == SyntaxKind_opSlash) {
		ProgInfo_analizeSTreeImpl(self, p->elm);
	} else if (sk == SyntaxKind_opPercent) {
		ProgInfo_analizeSTreeImpl(self, p->elm);
	}
}

static void ProgInfo_analizeSTreeImpl(
		struct ProgInfo *self,
		union STreeElm *stree)
{
	union STreeElm *p = stree;
	while (p) {
		switch (p->cmn.elmType) {
		case STreeElmType_node:
			ProgInfo_analizeSTreeImpl(self, p->node.l);
			p = p->node.r;
			break;

		case STreeElmType_syntax:
			ProgInfo_analizeSyntaxSTree(self, &p->syntax);
			return;

		case STreeElmType_name:
			return;

		case STreeElmType_int:
			return;
		}
	}
}

void ProgInfo_analyzeSTree(
		struct ProgInfo *self,
		union STreeElm *stree)
{
	self->stree = stree;
	ProgInfo_analizeSTreeImpl(self, stree);
}

