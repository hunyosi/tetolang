#include "token.h"

#include <stdlib.h>
#include <string.h>

#include "strutils.h"


struct Token *Token_new(
	enum TokenKind kind,
	struct SrcFileStat *stat,
	const char *str)
{
	struct Token *self = malloc(sizeof(struct Token));
	self->kind = TokenKind_unknown;
	self->srcFileInfo = NULL;
	self->lineNo = 0;
	self->colNo = 0;
	self->pos = 0;
	self->len = 0;
	self->str = NULL;
	return self;
}


void Token_delete(struct Token *self)
{
	if (self == NULL) return;
	if (self->str != NULL) free(self->str);
	free(self);
}

void Token_setKind(struct Token *self, enum TokenKind kind)
{
	self->kind = kind;
}

void Token_setSrcFileStat(struct Token *self, struct SrcFileStat *stat)
{
	self->srcFileInfo = stat->srcFile->info;
	self->lineNo = stat->lineNo;
	self->colNo = stat->colNo;
	self->pos = stat->pos;
}

void Token_setStr(struct Token *self, const char *str)
{
	self->len = strlen(str);
	self->str = dupStr(str);
}
