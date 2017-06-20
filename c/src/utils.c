#include "utils.h"

#include <stdlib.h>
#include <string.h>


int hexToInt(const char *src)
{
	int val = 0;
	int cval = 0;
	unsigned chr;

	for (; *src != '\0'; ++src) {
		chr = *src;
		if ('0' <= chr && chr <= '9') {
			cval = chr - '0';
		} else if ('A' <= chr && chr <= 'F') {
			cval = chr - 'A' + 10;
		} else if ('a' <= chr && chr <= 'f') {
			cval = chr - 'a' + 10;
		} else if (chr == '_') {
			continue;
		} else {
			break;
		}
		val = (val << 4) + cval;
	}

	return val;
}

int decToInt(const char *src)
{
	int val = 0;
	int cval = 0;
	unsigned chr;

	for (; *src != '\0'; ++src) {
		chr = *src;
		if ('0' <= chr && chr <= '9') {
			cval = chr - '0';
		} else if (chr == '_') {
			continue;
		} else {
			break;
		}
		val = (val * 10) + cval;
	}

	return val;
}

int octToInt(const char *src)
{
	int val = 0;
	int cval = 0;
	unsigned chr;

	for (; *src != '\0'; ++src) {
		chr = *src;
		if ('0' <= chr && chr <= '8') {
			cval = chr - '0';
		} else if (chr == '_') {
			continue;
		} else {
			break;
		}
		val = (val << 3) + cval;
	}

	return val;
}

int binToInt(const char *src)
{
	int val = 0;
	int cval = 0;
	unsigned chr;

	for (; *src != '\0'; ++src) {
		chr = *src;
		if ('0' <= chr && chr <= '1') {
			cval = chr - '0';
		} else if (chr == '_') {
			continue;
		} else {
			break;
		}
		val = (val << 1) + cval;
	}

	return val;
}


const char *skipBlank(const char *src)
{
	unsigned chr;

	for (; *src != '\0'; ++src) {
		chr = *src;
		if (chr > 0x20 || chr != 0x7F) {
			return src;
		}
	}

	return src;
}


int strToInt(const char *src)
{
	const char *p = skipBlank(src);
	unsigned chr, chr2;
	int value;
	int sign = 1;

	chr = *p;
	if (chr == '-') {
		sign = -1;
		++p;
		chr = *p;
	} else if (chr == '+') {
		++p;
		chr = *p;
	}

	if (chr < '0' || chr > '9') {
		return 0;
	}

	chr2 = *(p + 1);
	if (chr == '0') {
		switch (chr2) {
		case 'x': case 'X':
			return hexToInt(p + 2) * sign;
		case 'o': case 'O':
			return octToInt(p + 2) * sign;
		case 'b': case 'B':
			return binToInt(p + 2) * sign;
		default:
			return decToInt(p) * sign;
		}
	} else {
		return decToInt(p) * sign;
	}
}


int getFromEnv(const char *name)
{
	const char *val = getenv(name);

	if (val == NULL) {
		return 0;
	}

	return strToInt(val);
}


int globalArgC;
char **globalArgV;

int getFromArgV(int index)
{
	if (index < 1 || index > globalArgC) {
		return 0;
	}

	return strToInt(globalArgV[index - 1]);
}

