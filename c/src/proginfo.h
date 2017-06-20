#ifndef PROGINFO_H
#define PROGINFO_H

#include "stree.h"
#include "nametbl.h"
#include "variable.h"
#include "errbuf.h"


#ifdef __cplusplus
extern "C" {
#endif

struct ProgInfo {
	union STreeElm *stree;
	struct NameTbl *nameTbl;
	struct ErrBuf *errBuf;
};

struct ProgInfo *ProgInfo_new();
void ProgInfo_analyzeSTree(
        struct ProgInfo *self,
        union STreeElm *stree);

#ifdef __cplusplus
}
#endif

#endif

