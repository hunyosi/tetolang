
cat <<__EOF__ >testprog.c
#include <stdio.h>

#include "../src/str.h"


void test_Str_new_1(void)
{
	struct Str *str = Str_new(NULL);
	printf("str->len=%ld, str->bufSize=%ld, str->str=%s\n",
			(long)str->len, (long)str->bufSize, str->str);
	Str_delete(str);
}

void test_Str_new_2(void)
{
	struct Str *str = Str_new("");
	printf("str->len=%ld, str->bufSize=%ld, str->str=%s\n",
			(long)str->len, (long)str->bufSize, str->str);
	Str_delete(str);
}

void test_Str_new_3(void)
{
	struct Str *str = Str_new("12345678901234");
	printf("str->len=%ld, str->bufSize=%ld, str->str=%s\n",
			(long)str->len, (long)str->bufSize, str->str);
	Str_delete(str);
}

void test_Str_new_4(void)
{
	struct Str *str = Str_new("123456789012345");
	printf("str->len=%ld, str->bufSize=%ld, str->str=%s\n",
			(long)str->len, (long)str->bufSize, str->str);
	Str_delete(str);
}


void test_Str_addc_1(void)
{
	struct Str *str = Str_new(NULL);
	Str_addc(str, 'a');
	printf("str->len=%ld, str->bufSize=%ld, str->str=%s\n",
			(long)str->len, (long)str->bufSize, str->str);
	Str_delete(str);
}

void test_Str_addc_2(void)
{
	struct Str *str = Str_new("1234567890123");
	Str_addc(str, 'a');
	printf("str->len=%ld, str->bufSize=%ld, str->str=%s\n",
			(long)str->len, (long)str->bufSize, str->str);
	Str_delete(str);
}

void test_Str_addc_3(void)
{
	struct Str *str = Str_new("12345678901234");
	Str_addc(str, 'a');
	printf("str->len=%ld, str->bufSize=%ld, str->str=%s\n",
			(long)str->len, (long)str->bufSize, str->str);
	Str_delete(str);
}


void test_Str_adds_1(void)
{
	struct Str *str = Str_new(NULL);
	Str_adds(str, "abcdefghijklmn");
	printf("str->len=%ld, str->bufSize=%ld, str->str=%s\n",
			(long)str->len, (long)str->bufSize, str->str);
	Str_delete(str);
}

void test_Str_adds_2(void)
{
	struct Str *str = Str_new("12345");
	Str_adds(str, "abcdefghijklmn");
	printf("str->len=%ld, str->bufSize=%ld, str->str=%s\n",
			(long)str->len, (long)str->bufSize, str->str);
	Str_delete(str);
}

void test_Str_adds_3(void)
{
	struct Str *str = Str_new("1234567890");
	Str_adds(str, "abcdefghijklmnopqrstuvwxyz");
	printf("str->len=%ld, str->bufSize=%ld, str->str=%s\n",
			(long)str->len, (long)str->bufSize, str->str);
	Str_delete(str);
}


int main(int argc, char *argv[])
{
	test_Str_new_1();
	test_Str_new_2();
	test_Str_new_3();
	test_Str_new_4();

	test_Str_addc_1();
	test_Str_addc_2();
	test_Str_addc_3();

	test_Str_adds_1();
	test_Str_adds_2();
	test_Str_adds_3();

	return 0;
}

__EOF__

cc -c -o str.o ../src/str.c
cc -o testprog testprog.c str.o
./testprog

