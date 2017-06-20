#ifndef SRCFILE_H
#define SRCFILE_H

#include "stddef.h"

enum SrcFileConst {
	SrcFile_eof = -1
};


struct SrcFileInfo {
	char *path;
};


struct SrcFile {
	struct SrcFileInfo *info;
	void *body;
};


struct SrcFileStat {
	struct SrcFile *srcFile;
	struct SrcFileStat *prev;
	int prevChr;
	size_t lineNo;
	size_t colNo;
	size_t pos;
	int isEof;
};


struct SrcFileInfo *SrcFileInfo_new(const char *path);
void SrcFileInfo_delete(struct SrcFileInfo *self);

struct SrcFile *SrcFile_new(struct SrcFileInfo *info);
void SrcFile_delete(struct SrcFile *self);
struct SrcFileStat *SrcFile_open(struct SrcFile *self);

struct SrcFileStat *SrcFileStat_begin(struct SrcFileStat *self);
struct SrcFileStat *SrcFileStat_rollback(struct SrcFileStat *self);
struct SrcFileStat *SrcFileStat_commit(struct SrcFileStat *self);
void SrcFileStat_close(struct SrcFileStat *self);
int SrcFileStat_getc(struct SrcFileStat *self);

#endif
