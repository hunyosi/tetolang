#include "str.h"

#include <stdlib.h>
#include <string.h>


#define STR_GROW_LEN 16


struct Str *Str_new(const char *src)
{
	size_t len = 0;
	size_t bufSize = 0;
	struct Str *self = malloc(sizeof(struct Str));

	if (self == NULL) {
		return NULL;
	}

	if (src != NULL) {
		len = strlen(src);
	}

	bufSize = ((len + 1) / STR_GROW_LEN + 1) * STR_GROW_LEN;

	self->len = len;
	self->bufSize = bufSize;
	self->str = malloc(bufSize);

	if (self->str == NULL) {
		free(self);
		return NULL;
	}

	if (src) {
		memcpy(self->str, src, len);
	}

	self->str[len] = '\0';

	return self;
}


void Str_delete(struct Str *self)
{
	if (self == NULL) return;
	if (self->str != NULL) free(self->str);
	free(self);
}


int Str_addc(struct Str *self, int chr)
{
	size_t len = self->len;
	size_t newLen = len + 1;

	if (newLen + 1 >= self->bufSize) {
		size_t newBufSize = self->bufSize + STR_GROW_LEN;
		char *newStr = realloc(self->str, newBufSize);
		if (newStr == NULL) {
			return 1;
		}
		self->bufSize = newBufSize;
		self->str = newStr;
	}

	self->str[len] = (char) chr;
	self->len = newLen;
	self->str[newLen] = '\0';

	return 0;
}


int Str_adds(struct Str *self, const char *src)
{
	size_t srcLen = strlen(src);
	size_t len = self->len;
	size_t newLen = len + srcLen;

	if (newLen + 1 >= self->bufSize) {
		size_t newBufSize =
			((newLen + 1) / STR_GROW_LEN + 1) * STR_GROW_LEN;
		char *newStr = realloc(self->str, newBufSize);
		if (newStr == NULL) {
			return 1;
		}
		self->bufSize = newBufSize;
		self->str = newStr;
	}

	memcpy(&self->str[len], src, srcLen);
	self->len = newLen;
	self->str[newLen] = '\0';

	return 0;
}

void Str_clear(struct Str *self)
{
	self->str[0] = '\0';
	self->len = 0;
}
