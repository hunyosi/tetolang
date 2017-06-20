
cat <<__EOF__ >testprog.c
#include <stdio.h>
#include <string.h>

#include "../src/leb128enc.h"

static void printBuf(unsigned char *buf, size_t len)
{
	size_t pos;

	printf("len: %lu: ", len);
	for (pos = 0; pos < len; ++pos) {
		printf(" %02X", buf[pos]);
	}
	putchar('\n');
}

void test_leb128_encode(unsigned long val)
{
	unsigned char buf[32];
	size_t afterPos = 0;

	memset(buf, 0, sizeof(buf));
	afterPos = leb128_encode(buf, 0, val);
        printBuf(buf, afterPos);
}

void test_sleb128_encode(long val)
{
	unsigned char buf[32];
	size_t afterPos = 0;

	memset(buf, 0, sizeof(buf));
	afterPos = sleb128_encode(buf, 0, val);
        printBuf(buf, afterPos);
}

int main(int argc, char *argv[])
{
	test_leb128_encode(0);
	test_leb128_encode(1);
	test_leb128_encode(127);
	test_leb128_encode(128);
	test_leb128_encode(0x00003FFF);
	test_leb128_encode(0x00004000);
	test_leb128_encode(0x001FFFFF);
	test_leb128_encode(0x00200000);
	test_leb128_encode(0x0FFFFFFF);
	test_leb128_encode(0x10000000);
	test_leb128_encode(0xFFFFFFFF);

	return 0;
}

__EOF__

cc -c -o leb128enc.o ../src/leb128enc.c
cc -o testprog testprog.c leb128enc.o
./testprog

