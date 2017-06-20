#include "optbl.h"

#include <stdlib.h>

#include "strutils.h"


static struct OpElm *OpElm_new(
		struct OpElm *next,
		const char *op,
		int rank,
		enum OpType opType)
{
	struct OpElm *self = malloc(sizeof(struct OpElm));
	self->next = next;
	self->op = dupStr(op);
	self->rank = rank;
	self->opType = opType;
	return self;
}


static void OpElm_delete(struct OpElm *self)
{
	if (self == NULL) return;
	if (self->op != NULL) free(self->op);
	free(self);
}


struct OpTbl *OpTbl_new(struct OpParam *params)
{
	struct OpTbl *self = malloc(sizeof(struct OpTbl));
	self->elms = NULL;
	if (params != NULL) OpTbl_addAll(self, params);
	return self;
}


void OpTbl_delete(struct OpTbl *self)
{
	struct OpElm *p, *n;

	if (self == NULL) return;

	for (p = self->elms; p; p = n) {
		n = p->next;
		OpElm_delete(p);
	}

	free(self);
}


void OpTbl_add(
		struct OpTbl *self,
		const char *op,
		int rank,
		enum OpType opType)
{
	struct OpElm *p, *q, *elm;

	elm = OpElm_new(NULL, op, rank, opType);

	q = NULL;
	for (p = self->elms; p; p = p->next) {
		if (p->rank <= rank) {
			elm->next = p;
			if (q != NULL) q->next = elm;
			break;
		}
		q = p;
	}
}


void OpTbl_addAll(
		struct OpTbl *self,
		struct OpParam *params)
{
	struct OpParam *p;

	for (p = params; p->opType != OpType_end && p->op != NULL; ++ p) {
		OpTbl_add(self, p->op, p->rank, p->opType);
	}
}
