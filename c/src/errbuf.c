#include "errbuf.h"

#include <stdlib.h>
#include <stdarg.h>


struct ErrBuf *ErrBuf_new()
{
	struct ErrBuf *self;

	self = malloc(sizeof(struct ErrBuf));
	self->outs = stderr;
	self->numOfErrors = 0;
	self->numOfWarns = 0;

	return self;
}


void ErrBuf_error(struct ErrBuf *self, const char *msg, ...)
{
	va_list ap;

	va_start(ap, msg);
	vfprintf(self->outs, msg, ap);
	va_end(ap);
	fputc('\n', self->outs);

	self->numOfErrors ++;
}


void ErrBuf_warn(struct ErrBuf *self, const char *msg, ...)
{
	va_list ap;

	va_start(ap, msg);
	vfprintf(self->outs, msg, ap);
	va_end(ap);
	fputc('\n', self->outs);

	self->numOfWarns ++;
}

