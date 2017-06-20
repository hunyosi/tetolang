#ifndef TOKEN_H
#define TOKEN_H

#include "srcfile.h"

enum TokenKind {
	TokenKind_unknown,
	TokenKind_name,
	TokenKind_intNum,
	TokenKind_op
};

struct Token {
	enum TokenKind kind;
	struct SrcFileInfo *srcFileInfo;
	size_t lineNo;
	size_t colNo;
	size_t pos;
	size_t len;
	char *str;
};

struct Token *Token_new();
void Token_delete(struct Token *self);
void Token_setKind(struct Token *self, enum TokenKind kind);
void Token_setSrcFileStat(struct Token *self, struct SrcFileStat *stat);
void Token_setStr(struct Token *self, const char *str);

#endif
