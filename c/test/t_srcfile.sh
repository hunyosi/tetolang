
cat <<__EOF__ >testprog.c
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include "../src/srcfile.h"


void printStat(struct SrcFileStat *stat)
{
	printf("%lu, %lu: %d, \'%c\'\n",
		(unsigned long)stat->lineNo,
		(unsigned long)stat->colNo,
		stat->prevChr,
		stat->prevChr);
}

void printStat2(struct SrcFileStat *stat, int c)
{
	printf("%lu, %lu: %d, \'%c\'\n",
		(unsigned long)stat->lineNo,
		(unsigned long)stat->colNo,
		c,
		c);
}


void test_SrcFile_1(void)
{
	char path[] = "test.txt";
	struct SrcFileInfo *info = SrcFileInfo_new(path);
	path[3] = '2';
	printf("%s, %s\n", info->path, path);
	SrcFileInfo_delete(info);
}


void test_SrcFile_2(void)
{
	struct SrcFileInfo *info = SrcFileInfo_new("t_srcfile.txt");
	struct SrcFile *srcFile = SrcFile_new(info);
	struct SrcFileStat *stat = SrcFile_open(srcFile);
	int c;

	c = SrcFileStat_getc(stat);
	printStat2(stat, c);

	SrcFileStat_close(stat);
	SrcFile_delete(srcFile);
	SrcFileInfo_delete(info);
}


void test_SrcFile_3(void)
{
	struct SrcFileInfo *info = SrcFileInfo_new("t_srcfile.txt");
	struct SrcFile *srcFile = SrcFile_new(info);
	struct SrcFileStat *stat = SrcFile_open(srcFile);

	puts("========");
	do {
		int c = SrcFileStat_getc(stat);
		printStat2(stat, c);
	} while(!stat->isEof);
	puts("========");

	SrcFileStat_close(stat);
	SrcFile_delete(srcFile);
	SrcFileInfo_delete(info);
}


void test_SrcFile_4(void)
{
	struct SrcFileInfo *info = SrcFileInfo_new("t_srcfile.txt");
	struct SrcFile *srcFile = SrcFile_new(info);
	struct SrcFileStat *stat = SrcFile_open(srcFile);

	puts("========");
	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);

	stat = SrcFileStat_begin(stat);

	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);

	stat = SrcFileStat_begin(stat);

	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);

	puts("--------");

	stat = SrcFileStat_rollback(stat);

	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);


	puts("--------");

	stat = SrcFileStat_commit(stat);

	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);
	SrcFileStat_getc(stat);
	printStat(stat);

	stat = SrcFileStat_commit(stat);
	if (stat == NULL) {
		puts("ok");
	} else {
		puts("NG");
	}

	puts("========");

	SrcFile_delete(srcFile);
	SrcFileInfo_delete(info);
}


int main(int argc, char *argv[])
{
	test_SrcFile_1();
	test_SrcFile_2();
	test_SrcFile_3();
	test_SrcFile_4();
	return 0;
}

__EOF__

cc -c -o srcfile.o ../src/srcfile.c
cc -c -o strutils.o ../src/strutils.c
cc -o testprog testprog.c srcfile.o strutils.o
./testprog
