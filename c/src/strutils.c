#include "strutils.h"

#include <stdarg.h>
#include <stdlib.h>
#include <string.h>


char *joinNoDupSep(char sep, ...)
{
	va_list ap;
	const char *p;
	char *buf = NULL;
	char *newBuf;
	size_t bufPos;
	size_t len;
	size_t bufLen = 0;

	va_start(ap, sep);
	for (p = va_arg(ap, char *); p != NULL; p = va_arg(ap, char *)) {
		len = strlen(p);
		if (len > 0) {
			if (p[len - 1] == sep) {
				-- len;
			}
			if (p[0] == sep) {
				-- len;
				++ p;
			}
		}

		bufLen += len + 1;

		if (buf == NULL) {
			buf = malloc(bufLen);
			strncpy(buf, p, len);
			bufPos = len;
			buf[bufPos] = '\0';
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
			bufPos += len;
			buf[bufPos] = '\0';
		}
	}
	va_end(ap);

	return buf;
}


char *concatStr(const char *str, ...)
{
	va_list ap;
	const char *p;
	char *buf = NULL;
	char *newBuf;
	size_t bufPos;
	size_t len;
	size_t bufLen = 1;

	va_start(ap, str);
	for (p = str; p != NULL; p = va_arg(ap, char *)) {
		len = strlen(p);
		if (len < 1) continue;

		bufLen += len;

		if (buf == NULL) {
			buf = malloc(bufLen);
			strncpy(buf, p, len);
			bufPos = len;
			buf[bufPos] = '\0';
		} else {
			newBuf = realloc(buf, bufLen);
			if (newBuf == NULL) {
				free(buf);
				return NULL;
			}
			buf = newBuf;
			strncpy(&buf[bufPos], p, len);
			bufPos += len;
			buf[bufPos] = '\0';
		}
	}
	va_end(ap);

	return buf;
}


char *dupStr(const char *str)
{
	size_t len;
	char *dst;

	if (str == NULL) {
		return NULL;
	}

	len = strlen(str);
	dst = malloc(len + 1);
	memcpy(dst, str, len);
	dst[len] = '\0';
	return dst;
}


