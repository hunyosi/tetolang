
cat <<__EOF__ >testprog.c
#include <stdio.h>

#include "../src/tokenizer.h"

void printToken(struct Token *token)
{
	if (token == NULL) {
		puts("*EOF*");
	} else {
		switch (token->kind) {
		case TokenKind_unknown: printf("unknown: "); break;
		case TokenKind_intNum: printf("infNum: "); break;
		case TokenKind_name: printf("name: "); break;
		case TokenKind_op: printf("op: "); break;
		}
		printf("lineNo=%lu, colNo=%lu, pos=%lu, len=%lu, str=\"%s\"\n",
				(unsigned long)token->lineNo,
				(unsigned long)token->colNo,
				(unsigned long)token->pos,
				(unsigned long)token->len,
				token->str);
	}
}


void test_Tokenizer_1(void)
{
	struct SrcFileInfo *srcFileInfo = SrcFileInfo_new("t_1.tmp");
	struct Tokenizer *tokenizer = Tokenizer_new(srcFileInfo);
	struct Token *token = Tokenizer_getNext(tokenizer);
	printToken(token);
	Tokenizer_delete(tokenizer);
	SrcFileInfo_delete(srcFileInfo);
}

void test_Tokenizer_2(void)
{
	struct SrcFileInfo *srcFileInfo = SrcFileInfo_new("t_2.tmp");
	struct Tokenizer *tokenizer = Tokenizer_new(srcFileInfo);
	struct Token *token;
	do {
       		token = Tokenizer_getNext(tokenizer);
		printToken(token);
	} while(token != NULL);
	Tokenizer_delete(tokenizer);
	SrcFileInfo_delete(srcFileInfo);
}

void test_Tokenizer_3(void)
{
	struct SrcFileInfo *srcFileInfo = SrcFileInfo_new("t_3.tmp");
	struct Tokenizer *tokenizer = Tokenizer_new(srcFileInfo);
	struct Token *token = Tokenizer_getNext(tokenizer);
	printToken(token);
	Tokenizer_delete(tokenizer);
	SrcFileInfo_delete(srcFileInfo);
}


int main(int argc, char *argv[])
{
	test_Tokenizer_1();
	test_Tokenizer_2();
	test_Tokenizer_3();

	return 0;
}

__EOF__

echo 1234 > t_1.tmp
cat t_1.tmp >/dev/null

echo abcde+/-1234 > t_2.tmp
cat t_2.tmp >/dev/null

echo -1234 > t_3.tmp
cat t_3.tmp >/dev/null

cc -g -c -o str.o ../src/str.c
cc -g -c -o strutils.o ../src/strutils.c
cc -g -c -o srcfile.o ../src/srcfile.c
cc -g -c -o token.o ../src/token.c
cc -g -c -o tokenizer.o ../src/tokenizer.c
cc -g -o testprog testprog.c tokenizer.o str.o strutils.o srcfile.o token.o
./testprog
