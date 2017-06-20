#include "toc.h"

#include <stdarg.h>
#include <stdlib.h>
#include <stdio.h>


struct TlToC {
	struct ProgInfo *progInfo;
	FILE *outs;
};
 
static void TlToC_puts(
		struct TlToC *self,
		const char *str)
{
	fputs(str, self->outs);
}

static void TlToC_printf(
		struct TlToC *self,
		const char *format,
		...)
{
	va_list ap;

	va_start(ap, format);
	vfprintf(self->outs, format, ap);
	va_end(ap);
}

static void TlToC_sTreeElm(
		struct TlToC *self,
		union STreeElm *stree);

static void TlToC_operator(
		struct TlToC *self,
		const char *op,
		struct STreeElmSyntax *p)
{
}

static void TlToC_sTreeElmSyntax(
		struct TlToC *self,
		struct STreeElmSyntax *p)
{
	const struct SyntaxKind *sk = p->syntaxKind;
	if (sk == SyntaxKind_opPlus) {
		
		storeCodeFromSTree(dst, p->elm);
		ByteAry_addByte(dst, 0x6A);
	} else if (sk == SyntaxKind_opMinus) {
		storeCodeFromSTree(dst, p->elm);
		ByteAry_addByte(dst, 0x6B);
	} else if (sk == SyntaxKind_opAsterisk) {
		storeCodeFromSTree(dst, p->elm);
		ByteAry_addByte(dst, 0x6C);
	} else if (sk == SyntaxKind_opSlash) {
		storeCodeFromSTree(dst, p->elm);
		ByteAry_addByte(dst, 0x6D);
	} else if (sk == SyntaxKind_opPercent) {
		storeCodeFromSTree(dst, p->elm);
		ByteAry_addByte(dst, 0x6F);
	}
}

static void TlToC_sTreeElm(
		struct ByteAry *dst,
		union STreeElm *stree)
{
	union STreeElm *p = stree;
	while (p) {
		switch (p->cmn.elmType) {
		case STreeElmType_node:
			storeCodeFromSTree(dst, p->node.l);
			p = p->node.r;
			break;

		case STreeElmType_syntax:
			storeCodeFromSyntax(dst, &p->syntax);
			return;

		case STreeElmType_name:
			return;

		case STreeElmType_int:
			/* i32.const 100 */
			ByteAry_addByte(dst, 0x41);
			sleb128_addToByteAry(dst, p->intVal.val);
			return;
		}
	}
}

char *joinWithSep(char sep, ...)
{
	va_list ap;
	const char *p;
	const char *buf = NULL;
	const char *newBuf;
	size_t bufPos;
	size_t len;
	size_t bufLen = 0;

	va_start(ap, sep);
	for (p = va_arg(ap, char *); p != NULL; p = va_arg(ap, char *)) {
		len = strlen(p);
		if (len > 0)
			if (p[len - 1] == sep) {
				-- len;
			}
			if (p[0] == sep) {
				-- len;
				++ p;
			}
		}

		bufLen += len + 1;

		if (buf != NULL) {
			buf = malloc(bufLen);
			strncpy(buf, p, len);
			buf[len] = '\0';
			bufPos = len;
		} else {
			newBuf = realloc(buf, bufLen);
			if (newBuf == NULL) {
				free(buf);
				return NULL;
			}
			buf = newBuf;
			buf[bufPos] = sep;
			++ bufPos;
			strncpy(&buf[bufPos], p, len);
			buf[bufLen] = '\0';
			bufPos = bufLen;
		}
	}
	va_end(ap);

	return buf;
}


int compileToC(
        struct ProgInfo *progInfo,
        const char *outDir,
        const char *baseName)
{
	const char *outPath
}

