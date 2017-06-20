#ifndef ERRBUF_H
#define ERRBUF_H

#include <stdio.h>

#ifdef __cplusplus
extern "C" {
#endif

struct ErrBuf {
	FILE *outs;
	int numOfErrors;
	int numOfWarns;
};


struct ErrBuf *ErrBuf_new();
void ErrBuf_error(struct ErrBuf *self, const char *msg, ...);
void ErrBuf_warn(struct ErrBuf *self, const char *msg, ...);


#ifdef __cplusplus
}
#endif

#endif

