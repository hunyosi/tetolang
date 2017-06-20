#ifndef STREE_H
#define STREE_H

#include "syntaxkind.h"

#include <stdio.h>

#include "nametblhdr.h"
#include "token.h"

enum STreeElmType {
	STreeElmType_node,
	STreeElmType_syntax,
	STreeElmType_name,
	STreeElmType_int,
};


#define STREE_ELM_HDR \
	enum STreeElmType	elmType;	\
/* enf of STREE_ELM_HDR */


union STreeElm;


struct STreeElmCmn {
	STREE_ELM_HDR
};


struct STreeElmNode {
	STREE_ELM_HDR
	union STreeElm	*l;
	union STreeElm	*r;
};


struct STreeElmSyntax {
	STREE_ELM_HDR
	const struct SyntaxKind	*syntaxKind;
	struct Token	*token;
	union STreeElm	*elm;
};


struct STreeElmName {
	STREE_ELM_HDR
	struct Token	*token;
	union NameTblEntry	*nameTblEntry;
};


struct STreeElmInt {
	STREE_ELM_HDR
	struct Token	*token;
	long	val;
};


union STreeElm {
	struct STreeElmCmn	cmn;
	struct STreeElmNode	node;
	struct STreeElmSyntax	syntax;
	struct STreeElmName	name;
	struct STreeElmInt	intVal;
};


union STreeElm *STreeElmNode_new(union STreeElm *l, union STreeElm *r);

union STreeElm *STreeElmNode_add(union STreeElm *self, union STreeElm *elm);


union STreeElm *STreeElmSyntax_new(
 		const struct SyntaxKind	*syntaxKind,
		struct Token	*token,
		union STreeElm	*elm);

union STreeElm *STreeElmSyntax_newLR(
		const struct SyntaxKind	*syntaxKind,
		struct Token	*token,
		union STreeElm	*l,
		union STreeElm	*r);

union STreeElm *STreeElmSyntax_newL2R(
		const struct SyntaxKind	*syntaxKind,
		struct Token	*token,
		union STreeElm	*l1,
		union STreeElm	*l2,
		union STreeElm	*r);

union STreeElm *STreeElmSyntax_newL3R(	
		const struct SyntaxKind	*syntaxKind,
		struct Token	*token,
		union STreeElm	*l1,
		union STreeElm	*l2,
		union STreeElm	*l3,
		union STreeElm	*r);

union STreeElm *STreeElmSyntax_add(
		union STreeElm *self,
	       	union STreeElm *elm);


union STreeElm *STreeElmName_new(
		struct Token *token);


union STreeElm *STreeElmInt_new(
		struct Token *token);


void STreeElm_pprint(const union STreeElm *self, FILE *out);

#endif
