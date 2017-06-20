#ifndef STR_H
#define STR_H

#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

struct Str {
	size_t len;
	size_t bufSize;
	char *str;
};


struct Str *Str_new(const char *src);
void Str_delete(struct Str *self);
int Str_addc(struct Str *self, int chr);
int Str_adds(struct Str *self, const char *src);
void Str_clear(struct Str *self);


#ifdef __cplusplus
}
#endif

#endif
