#include "leb128enc.h"

size_t leb128_encode(
		unsigned char *dst,
		size_t dstPos,
		unsigned long val)
{
	if (val <= 0x7F) {
		dst[dstPos] = (unsigned char)val;
		return dstPos + 1;
	} else if (val <= 0x3FFF) {
		dst[dstPos] = (unsigned char)((val & 0x7F) | 0x80);
		dst[dstPos + 1] = (unsigned char)((val >> 7) & 0x7F);
		return dstPos + 2;
	} else if (val <= 0x1FFFFF) {
		dst[dstPos] = (unsigned char)((val & 0x7F) | 0x80);
		dst[dstPos + 1] = (unsigned char)(((val >> 7) & 0x7F) | 0x80);
		dst[dstPos + 2] = (unsigned char)((val >> 14) & 0x7F);
		return dstPos + 3;
	} else if (val <= 0x0FFFFFFF) {
		dst[dstPos] = (unsigned char)((val & 0x7F) | 0x80);
		dst[dstPos + 1] = (unsigned char)(((val >> 7) & 0x7F) | 0x80);
		dst[dstPos + 2] = (unsigned char)(((val >> 14) & 0x7F) | 0x80);
		dst[dstPos + 3] = (unsigned char)((val >> 21) & 0x7F);
		return dstPos + 4;
	} else {
		dst[dstPos] = (unsigned char)((val & 0x7F) | 0x80);
		dst[dstPos + 1] = (unsigned char)(((val >> 7) & 0x7F) | 0x80);
		dst[dstPos + 2] = (unsigned char)(((val >> 14) & 0x7F) | 0x80);
		dst[dstPos + 3] = (unsigned char)(((val >> 21) & 0x7F) | 0x80);
		dst[dstPos + 4] = (unsigned char)((val >> 28) & 0x0F);
		return dstPos + 5;
	}
}

static size_t sleb128_encode_impl(
		unsigned char *dst,
		size_t dstPos,
		long val)
{
	if (val <= 0x3F) {
		dst[dstPos] = (unsigned char)val;
		return dstPos + 1;
	} else if (val <= 0x1FFF) {
		dst[dstPos] = (unsigned char)((val & 0x7F) | 0x80);
		dst[dstPos + 1] = (unsigned char)((val >> 7) & 0x7F);
		return dstPos + 2;
	} else if (val <= 0x0FFFFF) {
		dst[dstPos] = (unsigned char)((val & 0x7F) | 0x80);
		dst[dstPos + 1] = (unsigned char)(((val >> 7) & 0x7F) | 0x80);
		dst[dstPos + 2] = (unsigned char)((val >> 14) & 0x7F);
		return dstPos + 3;
	} else if (val <= 0x07FFFFFF) {
		dst[dstPos] = (unsigned char)((val & 0x7F) | 0x80);
		dst[dstPos + 1] = (unsigned char)(((val >> 7) & 0x7F) | 0x80);
		dst[dstPos + 2] = (unsigned char)(((val >> 14) & 0x7F) | 0x80);
		dst[dstPos + 3] = (unsigned char)((val >> 21) & 0x7F);
		return dstPos + 4;
	} else {
		dst[dstPos] = (unsigned char)((val & 0x7F) | 0x80);
		dst[dstPos + 1] = (unsigned char)(((val >> 7) & 0x7F) | 0x80);
		dst[dstPos + 2] = (unsigned char)(((val >> 14) & 0x7F) | 0x80);
		dst[dstPos + 3] = (unsigned char)(((val >> 21) & 0x7F) | 0x80);
		dst[dstPos + 4] = (unsigned char)((val >> 28) & 0x3F);
		return dstPos + 5;
	}
}

size_t sleb128_encode(
		unsigned char *dst,
		size_t dstPos,
		long val)
{
	if (val >= 0) {
		return sleb128_encode_impl(dst, dstPos, val);
	} else if (val >= -64 /* 0xFFFFFFC0 */) {
		dst[dstPos] = ((unsigned char)val) & 0x7F;
		return dstPos + 1;
	} else if (val >= -8192 /* 0xFFFFE000 */) {
		dst[dstPos] = (unsigned char)((val & 0x7F) | 0x80);
		dst[dstPos + 1] = (unsigned char)((val >> 7) & 0x7F);
		return dstPos + 2;
	} else if (val >= -1048576 /* 0xFFF00000 */) {
		dst[dstPos] = (unsigned char)((val & 0x7F) | 0x80);
		dst[dstPos + 1] = (unsigned char)(((val >> 7) & 0x7F) | 0x80);
		dst[dstPos + 2] = (unsigned char)((val >> 14) & 0x7F);
		return dstPos + 3;
	} else if (val >= -134217728 /* 0xF8000000 */) {
		dst[dstPos] = (unsigned char)((val & 0x7F) | 0x80);
		dst[dstPos + 1] = (unsigned char)(((val >> 7) & 0x7F) | 0x80);
		dst[dstPos + 2] = (unsigned char)(((val >> 14) & 0x7F) | 0x80);
		dst[dstPos + 3] = (unsigned char)((val >> 21) & 0x7F);
		return dstPos + 4;
	} else {
		dst[dstPos] = (unsigned char)((val & 0x7F) | 0x80);
		dst[dstPos + 1] = (unsigned char)(((val >> 7) & 0x7F) | 0x80);
		dst[dstPos + 2] = (unsigned char)(((val >> 14) & 0x7F) | 0x80);
		dst[dstPos + 3] = (unsigned char)(((val >> 21) & 0x7F) | 0x80);
		dst[dstPos + 4] = (unsigned char)((val >> 28) & 0x7F);
		return dstPos + 5;
	}
}


size_t leb128_addToByteAry(
		struct ByteAry *dst,
                unsigned long val)
{
	unsigned char buf[8];
	size_t size;

	size = leb128_encode(buf, 0, val);
	ByteAry_add(dst, buf, size);

	return size;
}
                
size_t sleb128_addToByteAry(
		struct ByteAry *dst,
                long val)
{
	unsigned char buf[8];
	size_t size;

	size = sleb128_encode(buf, 0, val);
	ByteAry_add(dst, buf, size);

	return size;
}

