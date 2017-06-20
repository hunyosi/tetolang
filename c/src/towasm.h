#ifndef TOWASM_H
#define TOWASM_H


#include <stddef.h>

#include "byteary.h"
#include "stree.h"


#ifdef __cplusplus
extern "C" {
#endif


struct WasmBin {
	struct ByteAry *body;
};


struct WasmBin *compileToWasm(union STreeElm *tree);


#ifdef __cplusplus
}
#endif

#endif

