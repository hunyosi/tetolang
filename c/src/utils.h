#ifndef UTILS_H
#define UTILS_H

extern int globalArgC;
extern char **globalArgV;

int getFromArgV(int index);
int getFromEnv(const char *name);
int hexToInt(const char *src);
int decToInt(const char *src);
int octToInt(const char *src);
int binToInt(const char *src);
int strToInt(const char *src);

#endif
