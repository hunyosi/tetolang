#include "srcfile.h"

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include "strutils.h"


struct SrcFileInfo *SrcFileInfo_new(const char *path)
{
	struct SrcFileInfo *self = malloc(sizeof(struct SrcFileInfo));
	self->path = dupStr(path);
	return self;
}


void SrcFileInfo_delete(struct SrcFileInfo *self)
{
	if (self == NULL) return;
	if (self->path) free(self->path);
	free(self);
}


struct SrcFile *SrcFile_new(struct SrcFileInfo *info)
{
	struct SrcFile *self = malloc(sizeof(struct SrcFile));
	self->info = info;
	self->body = NULL;
	return self;
}

static void SrcFile_close(struct SrcFile *self);

void SrcFile_delete(struct SrcFile *self)
{
	if (self == NULL) return;
	SrcFile_close(self);
	free(self);
}

static void SrcFile_close(struct SrcFile *self)
{
	if (self->body == NULL) return;
	fclose((FILE *)self->body);
	self->body = NULL;
}

static struct SrcFileStat *SrcFileStat_new(struct SrcFile *srcFile);

struct SrcFileStat *SrcFile_open(struct SrcFile *self)
{
	FILE *fp;
	struct SrcFileStat *stat;

	if (self->body != NULL) return NULL;

	fp = fopen(self->info->path, "r");
	if (fp == NULL) return NULL;

	self->body = fp;

	return SrcFileStat_new(self);
}


static int SrcFile_getc(struct SrcFile *self)
{
	if (self->body == NULL) return SrcFile_eof;
	if (feof((FILE *)self->body)) return SrcFile_eof;
	return fgetc((FILE *)self->body);
}

static size_t SrcFile_getPos(struct SrcFile *self)
{
	if (self->body == NULL) return 0;
	return ftell((FILE *)self->body);
}

static void SrcFile_setPos(struct SrcFile *self, size_t pos)
{
	if (self->body == NULL) return;
	fseek((FILE *)self->body, (long)pos, SEEK_SET);
}


static struct SrcFileStat *SrcFileStat_new(struct SrcFile *srcFile)
{
	struct SrcFileStat *self = malloc(sizeof(struct SrcFileStat));
	self->prev = NULL;
	self->srcFile = srcFile;
	self->prevChr = SrcFile_eof;
	self->lineNo = 0;
	self->colNo = 0;
	self->pos = 0;
	self->isEof = 0;
	return self;
}


struct SrcFileStat *SrcFileStat_begin(struct SrcFileStat *self)
{
	struct SrcFileStat *newSelf = malloc(sizeof(struct SrcFileStat));
	*newSelf = *self;
	newSelf->prev = self;
	return newSelf;
}

struct SrcFileStat *SrcFileStat_rollback(struct SrcFileStat *self)
{
	struct SrcFileStat *prev = self->prev;

	if (prev == NULL) {
		SrcFile_close(self->srcFile);
	} else {
		SrcFile_setPos(prev->srcFile, prev->pos);
	}

	free(self);
	return prev;
}

struct SrcFileStat *SrcFileStat_commit(struct SrcFileStat *self)
{
	struct SrcFileStat *prev = self->prev;

	if (prev == NULL) {
		SrcFile_close(self->srcFile);
	} else {
		struct SrcFileStat *prevPrev = prev->prev;
		*prev = *self;
		prev->prev = prevPrev;
	}

	free(self);
	return prev;
}

void SrcFileStat_close(struct SrcFileStat *self)
{
	struct SrcFileStat *p, *q;

	if (self == NULL) return;

	SrcFile_close(self->srcFile);

	for (p = self; p != NULL; p = q) {
		q = p->prev;
		free(p);
	}
}

int SrcFileStat_getc(struct SrcFileStat *self)
{
	int c;

	if (self->isEof) return SrcFile_eof;

	c = SrcFile_getc(self->srcFile);
	self->pos = SrcFile_getPos(self->srcFile);
	if (c < 0) {
		self->isEof = 1;
		return SrcFile_eof;
	}

	if (self->prevChr == '\n' || self->prevChr < 0) {
		++ self->lineNo;
		self->colNo = 1;
	} else {
		++ self->colNo;
	}

	self->prevChr = c;

	return c;
}
