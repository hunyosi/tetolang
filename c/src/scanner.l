%{
#include <stdlib.h>

#include "type.h"
#include "utils.h"

#include "psrscnr.h"
#include "y.tab.h"
%}

newline (\r\n|\n|\r)

%%
int32	{
		yylval = STreeElmName_new(yytext);
		return PRIMITIVE_TYPE;
	}
if	{ return WORD_IF; }
else	{ return WORD_ELSE; }
for	{ return WORD_FOR; }
do	{ return WORD_DO; }
while	{ return WORD_WHILE; }
return	{ return WORD_RETURN; }
break	{ return WORD_BREAK; }
continue	{ return WORD_CONTINUE; }
\|\|	{ return OP_LOR; }
\^\^	{ return OP_LXOR; }
\&\&	{ return OP_LAND; }
\=\=	{ return OP_EQ; }
\!\=	{ return OP_NE; }
\<\=	{ return OP_LE; }
\>\=	{ return OP_GE; }
\<\<	{ return OP_SHIFTL; }
\>\>	{ return OP_SHIFTR; }
\+\=	{ return OP_PLUSEQ; }
\-\=	{ return OP_MINUSEQ; }
\*\=	{ return OP_MULEQ; }
\/\=	{ return OP_DIVEQ; }
\<\<\=	{ return OP_SHIFTLEQ; }
\>\>\=	{ return OP_SHIFTREQ; }
\|\=	{ return OP_OREQ; }
\^\=	{ return OP_XOREQ; }
\&\=	{ return OP_ANDEQ; }
\+\+	{ return OP_PLUSPLUS; }
\-\-	{ return OP_MINUSMINUS; }
[0-9_]*[0-9]	{
		long v = decToInt(yytext);
		yylval = STreeElmInt_new(v);
		return VAL_INT;
	}
0[xX][0-9A-Fa-f_]*[0-9A-Fa-f]	{
 		long v = hexToInt(yytext + 2);
		yylval = STreeElmInt_new(v);
		return VAL_INT;
	}
0[oO][0-8_]*[0-8]	{
		long v = octToInt(yytext + 2);
		yylval = STreeElmInt_new(v);
		return VAL_INT;
	}
0[bB][01_]*[01]	{
		long v = binToInt(yytext + 2);
		yylval = STreeElmInt_new(v);
		return VAL_INT;
	}
\$[A-Za-z_][A-Za-z_0-9]*	{
		long v = getFromEnv(yytext + 1);
		yylval = STreeElmInt_new(v);
		return VAL_INT;
	}
\$[0-9]+	{
		int n = decToInt(yytext + 1);
		long v = getFromArgV(n);
		yylval = STreeElmInt_new(v);
		return VAL_INT;
	}
[A-Za-z_][A-Za-z_0-9]*	{
		yylval = STreeElmName_new(yytext);
		return NAME;
	}
[\x00-\x20\x7F]	;
^\#\!.*{newline}	;
\/\/.*{newline}	;
\/\*.*\*\/	;
.	{ return yytext[0]; }

%%

int yywrap(void)
{
	return 1;
}
