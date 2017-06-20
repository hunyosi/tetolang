#include "byteary.h"

#include <stdlib.h>
#include <string.h>


struct ByteAry *ByteAry_new(size_t bufSize)
{
	struct ByteAry *obj;

	obj = calloc(sizeof(struct ByteAry), 1);
	obj->size = 0;
	obj->bufSize = bufSize;
	obj->body = calloc(1, obj->bufSize);

	return obj;
}


void ByteAry_delete(struct ByteAry *self)
{
	free(self->body);
	free(self);
}


void ByteAry_add(struct ByteAry *self, 
                const unsigned char *src,
                size_t srcSize)
{
	memcpy(self->body + self->size, src, srcSize);
	self->size += srcSize;
}


void ByteAry_addAry(struct ByteAry *self,
                const struct ByteAry *src)
{
	ByteAry_add(self, src->body, src->size);
}


void ByteAry_addByte(struct ByteAry *self,
                unsigned char src)
{
	ByteAry_add(self, &src, 1);
}


void ByteAry_addULong(struct ByteAry *self,
                unsigned long src)
{
	ByteAry_add(self, (unsigned char *)&src, 4);
}

