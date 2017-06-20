
cat <<__EOF__ >testprog.c
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include "../src/strutils.h"


void test_concatStr_1(void)
{
	char *str = concatStr("abc", "123", "def", NULL);
	puts(str);
	free(str);
}

void test_concatStr_2(void)
{
	char *str = concatStr("abc", NULL);
	puts(str);
	free(str);
}

void test_concatStr_3(void)
{
	char *str = concatStr(NULL);
	if (str == NULL) {
		puts("ok");
	} else {
		puts("NG");
	}
}


void test_joinNoDupSep_1(void)
{
	char *str = joinNoDupSep('/', "abc", "123", "def", NULL);
	puts(str);
	free(str);
}

void test_joinNoDupSep_2(void)
{
	char *str = joinNoDupSep('/', "abc", NULL);
	puts(str);
	free(str);
}

void test_joinNoDupSep_3(void)
{
	char *str = joinNoDupSep('/', NULL);
	if (str == NULL) {
		puts("ok");
	} else {
		puts("NG");
	}
}

void test_joinNoDupSep_4(void)
{
	char *str = joinNoDupSep('/', "aaa/", "bbb", "/ccc", NULL);
	puts(str);
	free(str);
}

void test_joinNoDupSep_5(void)
{
	char *str = joinNoDupSep('/', "/111/", "/222/", "/333/", NULL);
	puts(str);
	free(str);
}

void test_joinNoDupSep_6(void)
{
	char *str = joinNoDupSep('/', "/1/2/3", "456", NULL);
	puts(str);
	free(str);
}

int main(int argc, char *argv[])
{
	test_concatStr_1();
	test_concatStr_2();
	test_concatStr_3();

	test_joinNoDupSep_1();
	test_joinNoDupSep_2();
	test_joinNoDupSep_3();
	test_joinNoDupSep_4();
	test_joinNoDupSep_5();
	test_joinNoDupSep_6();

	return 0;
}

__EOF__

cc -c -o strutils.o ../src/strutils.c
cc -o testprog testprog.c strutils.o
./testprog

