#ifndef SYNTAXKIND_H
#define SYNTAXKIND_H

struct SyntaxKind {
	const char *name;
};

#ifndef SYNTAXKIND_C
#define SYNTAXKIND_DEFINE(name) \
	extern const struct SyntaxKind * const SyntaxKind_##name \
/* end of SYNTAXKIND_DEFINE */
#else
#define SYNTAXKIND_DEFINE(name) \
	static const struct SyntaxKind SyntaxKind_impl_##name = { \
		#name \
	}; \
	const struct SyntaxKind * const SyntaxKind_##name = \
			&SyntaxKind_impl_##name \
/* end of SYNTAXKIND_DEFINE */
#endif

SYNTAXKIND_DEFINE(stDo);
SYNTAXKIND_DEFINE(stFor);
SYNTAXKIND_DEFINE(stWhile);
SYNTAXKIND_DEFINE(stIf);
SYNTAXKIND_DEFINE(stReturn);
SYNTAXKIND_DEFINE(stBreak);
SYNTAXKIND_DEFINE(stContinue);
SYNTAXKIND_DEFINE(stAssignment);
SYNTAXKIND_DEFINE(stPlusEq);
SYNTAXKIND_DEFINE(stMinusEq);
SYNTAXKIND_DEFINE(stMulEq);
SYNTAXKIND_DEFINE(stDivEq);
SYNTAXKIND_DEFINE(stShiftLEq);
SYNTAXKIND_DEFINE(stShiftREq);
SYNTAXKIND_DEFINE(stOrEq);
SYNTAXKIND_DEFINE(stXorEq);
SYNTAXKIND_DEFINE(stAndEq);
SYNTAXKIND_DEFINE(stPlusPlus);
SYNTAXKIND_DEFINE(stMinusMinus);
SYNTAXKIND_DEFINE(opLogicalOr);
SYNTAXKIND_DEFINE(opLogicalXor);
SYNTAXKIND_DEFINE(opLogicalAnd);
SYNTAXKIND_DEFINE(opLogicalParen);
SYNTAXKIND_DEFINE(opLogicalNot);
SYNTAXKIND_DEFINE(opEqual);
SYNTAXKIND_DEFINE(opNotEqual);
SYNTAXKIND_DEFINE(opLessOrEq);
SYNTAXKIND_DEFINE(opLessThan);
SYNTAXKIND_DEFINE(opGraterOrEq);
SYNTAXKIND_DEFINE(opGraterThan);
SYNTAXKIND_DEFINE(opIf);
SYNTAXKIND_DEFINE(opShiftL);
SYNTAXKIND_DEFINE(opShiftR);
SYNTAXKIND_DEFINE(opVerticalLine);
SYNTAXKIND_DEFINE(opCircumflex);
SYNTAXKIND_DEFINE(opAmpersand);
SYNTAXKIND_DEFINE(opPlus);
SYNTAXKIND_DEFINE(opMinus);
SYNTAXKIND_DEFINE(opAsterisk);
SYNTAXKIND_DEFINE(opSlash);
SYNTAXKIND_DEFINE(opPercent);
SYNTAXKIND_DEFINE(opParen);
SYNTAXKIND_DEFINE(prefixOpBitNot);
SYNTAXKIND_DEFINE(prefixOpMinus);
SYNTAXKIND_DEFINE(prefixOpPlus);
SYNTAXKIND_DEFINE(referName);
SYNTAXKIND_DEFINE(defineName);

#endif
