#ifndef STRUTILS_H
#define STRUTILS_H

#ifdef __cplusplus
extern "C" {
#endif

char *joinNoDupSep(char sep, ...);
char *concatStr(const char *str, ...);
char *dupStr(const char *str);

#ifdef __cplusplus
}
#endif

#endif

