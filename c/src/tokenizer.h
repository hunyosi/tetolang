#ifndef TOKENIZER_H
#define TOKENIZER_H

#include "srcfile.h"
#include "str.h"
#include "token.h"

struct Tokenizer {
	struct SrcFileInfo *srcFileInfo;
	struct SrcFile *srcFile;
	struct SrcFileStat *srcFileStat;
	struct Str *ungetBuf;
	struct Str *buf;
	struct Token *token;
};

struct Tokenizer *Tokenizer_new(struct SrcFileInfo *srcFileInfo);
void Tokenizer_delete(struct Tokenizer *self);
struct Token *Tokenizer_getNext(struct Tokenizer *self);

#endif
