#include <stdio.h>


int main(int argc, char *argv[])
{
	FILE *ins;
	unsigned long  pos;
	int c;
	char str[17];

	if (argc != 2) {
		fprintf(stderr, "usage: btoh <input_binary_file>\n");
		return 1;
	}

	ins = fopen(argv[1], "rb");
	if (ins == NULL) {
		perror( "Couldn't open <input_binary_file>\n");
		return 1;
	}

	str[16] = '\0';

	pos = 0;
	while ((c = fgetc(ins)) != EOF) {
		if ((pos & 0xF) == 0) printf("%08lX:", pos);
		printf(" %02X", c);
		str[pos & 0xF] = ((0x20 <= c && c <= 0x7E) ? (char)c : '.');
		++pos;
		if ((pos & 0xF) == 0) printf(" | %s\n", str);
	}

	if ((pos & 0xF) != 0) {
		for (; (pos & 0xF) != 0; ++pos) {
			printf("   ");
			str[pos & 0xF] = '\0';
		}
		printf(" | %s\n", str);
	}

	return 0;
}

