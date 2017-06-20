#ifndef BYTEARY_H
#define BYTEARY_H


#include <stddef.h>


#ifdef __cplusplus
extern "C" {
#endif


struct ByteAry
{
	size_t size;
	size_t bufSize;
	unsigned char *body;
};


struct ByteAry *ByteAry_new(size_t bufSize);
void ByteAry_delete(struct ByteAry *self);
void ByteAry_add(struct ByteAry *self,
		const unsigned char *src,
		size_t srcSize);
void ByteAry_addAry(struct ByteAry *self,
		const struct ByteAry *src);
void ByteAry_addByte(struct ByteAry *self,
		unsigned char src);
void ByteAry_addULong(struct ByteAry *self,
		unsigned long src);

#ifdef __cplusplus
}
#endif

#endif

