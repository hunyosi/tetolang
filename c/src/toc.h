#ifndef TOC_H
#define TOC_H


#include <stddef.h>

#include "byteary.h"
#include "proginfo.h"


#ifdef __cplusplus
extern "C" {
#endif


int compileToC(
	struct ProgInfo *progInfo,
	const char *outDir,
	const char *baseName);


#ifdef __cplusplus
}
#endif

#endif

