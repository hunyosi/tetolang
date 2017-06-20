#include "tokenizer.h"

#include <stdlib.h>
#include <string.h>


struct Tokenizer *Tokenizer_new(struct SrcFileInfo *srcFileInfo)
{
	struct Tokenizer *self = malloc(sizeof(struct Tokenizer));
	self->srcFileInfo = srcFileInfo;
	self->srcFile = SrcFile_new(srcFileInfo);
	self->srcFileStat = SrcFile_open(self->srcFile);
	self->buf = Str_new(NULL);
	self->ungetBuf = Str_new(NULL);
	self->token = NULL;
	return self;
}

void Tokenizer_delete(struct Tokenizer *self)
{
	if (self == NULL) return;
	Str_delete(self->buf);
	self->buf = NULL;
	SrcFileStat_close(self->srcFileStat);
	self->srcFileStat = NULL;
	SrcFile_delete(self->srcFile);
	self->srcFile = NULL;
	Token_delete(self->token);
	self->token = NULL;
	free(self);
}




static void Tokenizer_begin(struct Tokenizer *self)
{
	if (self->srcFileStat == NULL) return;
	self->srcFileStat = SrcFileStat_begin(self->srcFileStat);
}

static void Tokenizer_commit(struct Tokenizer *self)
{
	if (self->srcFileStat == NULL) return;
	self->srcFileStat = SrcFileStat_commit(self->srcFileStat);
}

static void Tokenizer_rollback(struct Tokenizer *self)
{
	if (self->srcFileStat == NULL) return;
	self->srcFileStat = SrcFileStat_rollback(self->srcFileStat);
}

static int Tokenizer_getc(struct Tokenizer *self)
{
	if (self->srcFileStat == NULL) return SrcFile_eof;
	if (self->ungetBuf->len > 0) {
		int c = self->ungetBuf->str[0];
		Str_clear(self->ungetBuf);
		return c;
	}
	return SrcFileStat_getc(self->srcFileStat);
}

static void Tokenizer_ungetc(struct Tokenizer *self, int c)
{
	if (self->srcFileStat == NULL) return;
	if (c < 0) {
		return;
	}
	Str_addc(self->ungetBuf, (char)c);
}

static int Tokenizer_eof(struct Tokenizer *self)
{
	if (self->srcFileStat == NULL) return 1;
	return self->srcFileStat->isEof;
}

static void Tokenizer_addc(struct Tokenizer *self, int c)
{
	Str_addc(self->buf, (char)c);
}

static void Tokenizer_clear(struct Tokenizer *self)
{
	Str_clear(self->buf);
}

static struct Token *Tokenizer_prepareToken(
		struct Tokenizer *self)
{
	if (self->token != NULL) Token_delete(self->token);
	self->token = Token_new();
	Token_setSrcFileStat(self->token, self->srcFileStat);
	return self->token;
}

static struct Token *Tokenizer_newToken(
		struct Tokenizer *self,
		enum TokenKind kind)
{
	struct Token *token = self->token;
	if (token == NULL) token = Tokenizer_prepareToken(self);
	Token_setStr(token, self->buf->str);
	Token_setKind(token, kind);
	Tokenizer_clear(self);
	self->token = NULL;
	return token;
}

static struct Token *Tokenizer_newInt(
		struct Tokenizer *self)
{
	return Tokenizer_newToken(self, TokenKind_intNum);
}

static struct Token *Tokenizer_newOp(
		struct Tokenizer *self)
{
	return Tokenizer_newToken(self, TokenKind_op);
}

static struct Token *Tokenizer_newName(
		struct Tokenizer *self)
{
	return Tokenizer_newToken(self, TokenKind_name);
}



#define CHRATTR_OCTBODY	0x0001
#define CHRATTR_DECBODY	0x0002
#define CHRATTR_HEXBODY	0x0004
#define CHRATTR_BINBODY	0x0008
#define CHRATTR_MARKMASK	0x0030
#define CHRATTR_OPERATOR	0x0010
#define CHRATTR_SPECIALMARK	0x0020
#define CHRATTR_QUOTE	0x0030
#define CHRATTR_NAMETOP	0x0040
#define CHRATTR_NAMEBODY	0x0080

static const unsigned short CHRATTR_TBL_IMPL[] = {
	    0x0000,
	    0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000,
	    0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000,
	    0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000,
	    0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000,
	/*    0x20,   0x21,   0x22,   0x23,   0x24,   0x25,   0x26,   0x27,
	 *               !       "       #       $       %       &       '
	 */ 0x0000, 0x0010, 0x0030, 0x0010, 0x0020, 0x0010, 0x0010, 0x0030,
	/*    0x28,   0x29,   0x2A,   0x2B,   0x2C,   0x2D,   0x2E,   0x2F,
	 *       (       )       *       +       ,       -       .       /
	 */ 0x0020, 0x0020, 0x0010, 0x0010, 0x0020, 0x0010, 0x0010, 0x0010,
	/*    0x30,   0x31,   0x32,   0x33,   0x34,   0x35,   0x36,   0x37,
	 *       0       1       2       3       4       5       6       7
	 */ 0x008F, 0x008F, 0x0087, 0x0087, 0x0087, 0x0087, 0x0087, 0x0087,
	/*    0x38,   0x39,   0x3A,   0x3B,   0x3C,   0x3D,   0x3E,   0x3F,
	 *       8       9       :       ;       <       =       >       ?
	 */ 0x0086, 0x0086, 0x0020, 0x0020, 0x0010, 0x0010, 0x0010, 0x0010,
	/*    0x40,   0x41,   0x42,   0x43,   0x44,   0x45,   0x46,   0x47,
	 *       @       A       B       C       D       E       F       G
	 */ 0x0020, 0x00C4, 0x00C4, 0x00C4, 0x00C4, 0x00C4, 0x00C4, 0x00C0,
	/*    0x48,   0x49,   0x4A,   0x4B,   0x4C,   0x4D,   0x4E,   0x4F,
	 *       H       I       J       K       L       M       N       O
	 */ 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0,
	/*    0x50,   0x51,   0x52,   0x53,   0x54,   0x55,   0x56,   0x57,
	 *       P       Q       R       S       T       U       V       W
	 */ 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0,
	/*    0x58,   0x59,   0x5A,   0x5B,   0x5C,   0x5D,   0x5E,   0x5F,
	 *       X       Y       Z       [       \       ]       ^       _
	 */ 0x00C0, 0x00C0, 0x00C0, 0x0020, 0x0010, 0x0020, 0x0010, 0x00CF,
	/*    0x60,   0x61,   0x62,   0x63,   0x64,   0x65,   0x66,   0x67,
	 *       `       a       b       c       d       e       f       g
	 */ 0x0030, 0x00C4, 0x00C4, 0x00C4, 0x00C4, 0x00C4, 0x00C4, 0x00C0,
	/*    0x68,   0x69,   0x6A,   0x6B,   0x6C,   0x6D,   0x6E,   0x6F,
	 *       h       i       j       k       l       m       n       o
	 */ 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0,
	/*    0x70,   0x71,   0x72,   0x73,   0x74,   0x75,   0x76,   0x77,
	 *       p       q       r       s       t       u       v       w
	 */ 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0, 0x00C0,
	/*    0x78,   0x79,   0x7A,   0x7B,   0x7C,   0x7D,   0x7E,   0x7F,
	 *       x       y       z       {       |       }       ~
	 */ 0x00C0, 0x00C0, 0x00C0, 0x0020, 0x0010, 0x0020, 0x0010, 0x0000,
	    0x0000
};

static const unsigned short *CHRATTR_TBL = &CHRATTR_TBL_IMPL[1];


#define isDigit(chr) ( ( ((unsigned int)(chr)) - '0' ) <= 9 )
#define isOctBody(chr) (CHRATTR_TBL[chr] & CHRATTR_OCTBODY)
#define isDecBody(chr) (CHRATTR_TBL[chr] & CHRATTR_DECBODY)
#define isHexBody(chr) (CHRATTR_TBL[chr] & CHRATTR_HEXBODY)
#define isBinBody(chr) (CHRATTR_TBL[chr] & CHRATTR_BINBODY)

#define isMark(chr) (CHRATTR_TBL[chr] & CHRATTR_MARKMASK)
#define isOperator(chr) \
	((CHRATTR_TBL[chr] & CHRATTR_MARKMASK) == CHRATTR_OPERATOR)
#define isSpecialMark(chr) \
	((CHRATTR_TBL[chr] & CHRATTR_MARKMASK) == CHRATTR_SPECIALMARK)
#define isQuote(chr) \
	((CHRATTR_TBL[chr] & CHRATTR_MARKMASK) == CHRATTR_QUOTE)

#define isNameTop(chr) (CHRATTR_TBL[chr] & CHRATTR_NAMETOP)
#define isNameBody(chr) (CHRATTR_TBL[chr] & CHRATTR_NAMEBODY)




static struct Token *Tokenizer_getNumber(struct Tokenizer *self, int c)
{
	int c2 ;

	Tokenizer_prepareToken(self);
	Tokenizer_addc(self, c);

	c2 = Tokenizer_getc(self);

	if (isDecBody(c2)) {
		do {
			Tokenizer_addc(self, c2);
			c2 = Tokenizer_getc(self);
		} while (isDecBody(c2));
		Tokenizer_ungetc(self, c2);
		return Tokenizer_newInt(self);

	} else {
		Tokenizer_ungetc(self, c2);
		return Tokenizer_newInt(self);
	}
}


static struct Token *Tokenizer_getOperator(struct Tokenizer *self, int c)
{
	int c2;

	Tokenizer_prepareToken(self);
	Tokenizer_addc(self, c);
	c2 = Tokenizer_getc(self);

	while (isOperator(c2)) {
		Tokenizer_addc(self, c2);
		c2 = Tokenizer_getc(self);
	}

	Tokenizer_ungetc(self, c2);

	return Tokenizer_newOp(self);
}


static struct Token *Tokenizer_getName(struct Tokenizer *self, int c)
{
	int c2;

	Tokenizer_prepareToken(self);
	Tokenizer_addc(self, c);
	c2 = Tokenizer_getc(self);

	while (isNameBody(c2)) {
		Tokenizer_addc(self, c2);
		c2 = Tokenizer_getc(self);
	}

	Tokenizer_ungetc(self, c2);

	return Tokenizer_newName(self);
}


struct Token *Tokenizer_getNext(struct Tokenizer *self)
{
	int c;

	for (;;) {
		c = Tokenizer_getc(self);
		if (c < 0) {
			return NULL;
		}

		if (c <= 0x20 || (0x7F <= c && c <= 0xA0)) {
			continue;
		}

		if (isDigit(c)) {
			return Tokenizer_getNumber(self, c);
		}

		if (c == '+' || c == '-') {
			int c2 = Tokenizer_getc(self);
			Tokenizer_ungetc(self, c2);
			if (isDigit(c2)) {
				return Tokenizer_getNumber(self, c);
			}
		}

		if (isOperator(c)) {
			return Tokenizer_getOperator(self, c);
		}

		if (isNameTop(c)) {
			return Tokenizer_getName(self, c);
		}
	}

	return NULL;
}
