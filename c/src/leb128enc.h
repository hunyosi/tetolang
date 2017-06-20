#ifndef LEB128ENC_H
#define LEB128ENC_H


#include <stddef.h>

#include "byteary.h"


#ifdef __cplusplus
extern "C" {
#endif

size_t leb128_encode(
		unsigned char *dst,
                size_t dstPos,
                unsigned long val);

size_t sleb128_encode(
		unsigned char *dst,
                size_t dstPos,
                long val);

size_t leb128_addToByteAry(
		struct ByteAry *dst,
                unsigned long val);

size_t sleb128_addToByteAry(
		struct ByteAry *dst,
                long val);

#ifdef __cplusplus
}
#endif

#endif

