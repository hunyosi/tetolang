#include "stree.h"

#include <stdlib.h>
#include <stdio.h>

#include "strutils.h"
#include "utils.h"


union STreeElm *STreeElmNode_new(union STreeElm *l, union STreeElm *r)
{
	struct STreeElmNode *self = malloc(sizeof(struct STreeElmNode));

	self->elmType	= STreeElmType_node;
	self->l	= l;
	self->r	= r;

	return (union STreeElm *)self;
}


union STreeElm *STreeElmNode_add(union STreeElm *self, union STreeElm *elm)
{
	struct STreeElmNode *p;
	struct STreeElmNode *node;

	if (self == NULL) {
		return STreeElmNode_new(elm, NULL);
	}

	for (p = &self->node; p->r != NULL; p = &p->r->node);

	p->r = STreeElmNode_new(elm, NULL);

	return self;
}


union STreeElm *STreeElmSyntax_new(
		const struct SyntaxKind	*syntaxKind,
		struct Token	*token,
		union STreeElm	*elm)
{
	struct STreeElmSyntax *self = malloc(sizeof(struct STreeElmSyntax));

	self->elmType	= STreeElmType_syntax;
	self->syntaxKind	= syntaxKind;
	self->token	= token;
	self->elm	= elm;

	return (union STreeElm *)self;
}

union STreeElm *STreeElmSyntax_newLR(
		const struct SyntaxKind	*syntaxKind,
		struct Token	*token,
		union STreeElm	*l,
		union STreeElm	*r)
{
	union STreeElm *node = STreeElmNode_new(l, r);
	return STreeElmSyntax_new(syntaxKind, token, node);
}

union STreeElm *STreeElmSyntax_newL2R(
		const struct SyntaxKind	*syntaxKind,
		struct Token	*token,
		union STreeElm	*l1,
		union STreeElm	*l2,
		union STreeElm	*r)
{
	union STreeElm *node1 = STreeElmNode_new(l2, r);
	union STreeElm *node2 = STreeElmNode_new(l1, node1);
	return STreeElmSyntax_new(syntaxKind, token, node2);
}

union STreeElm *STreeElmSyntax_newL3R(
		const struct SyntaxKind	*syntaxKind,
		struct Token	*token,
		union STreeElm	*l1,
		union STreeElm	*l2,
		union STreeElm	*l3,
		union STreeElm	*r)
{
	union STreeElm *node1 = STreeElmNode_new(l3, r);
	union STreeElm *node2 = STreeElmNode_new(l2, node1);
	union STreeElm *node3 = STreeElmNode_new(l1, node2);
	return STreeElmSyntax_new(syntaxKind, token, node3);
}

union STreeElm *STreeElmSyntax_add(union STreeElm *self, union STreeElm *elm)
{
	struct STreeElmSyntax *obj = &self->syntax;
	obj->elm = STreeElmNode_add(obj->elm, elm);
	return self;
}


union STreeElm *STreeElmName_new(
		struct Token *token)
{
	struct STreeElmName *self = malloc(sizeof(struct STreeElmName));

	self->elmType	= STreeElmType_name;
	self->token	= token;
	self->nameTblEntry	= NULL;

	return (union STreeElm *)self;
}


union STreeElm *STreeElmInt_new(
		struct Token *token)
{
	struct STreeElmInt *self = malloc(sizeof(struct STreeElmInt));

	self->elmType	= STreeElmType_int;
	self->token	= token;
	self->val	= strToInt(token->str);

	return (union STreeElm *)self;
}


/*
-+- statements
 |-+- statement
 | `-+- value_expression
 |   `-+- plus
 |     |--- 10
 |     `-- 20
 `-+- statement
   `-+- if_statement
     |-+- equal
     | |--- 1
     | `-- 2
     `-+- prefixOpBitNot
       `-- 3

-+- aa
 |-.
 | `--- int: 10
*/

struct IndentElm {
	struct IndentElm	*next;
	char	str[2];
};

struct Indent {
	struct IndentElm	*first;
	struct IndentElm	*last;
};

static struct Indent Indent_init(struct IndentElm *firstElm)
{
	struct Indent indent = {firstElm, firstElm};
	return indent;
}

static struct IndentElm IndentElm_empty()
{
	struct IndentElm indentElm = {NULL, "\0"};
	return indentElm;
}

static void Indent_put(	struct Indent	*indent,
	struct IndentElm	*elm,
	char	c)
{
	elm->next = NULL;
	elm->str[0] = c;
	elm->str[1] = '\0';

	if (indent->last != elm) {
		indent->last->next = elm;
		indent->last = elm;
	}
}

static void Indent_print(	struct Indent	*indent,
	FILE	*out)
{
	struct IndentElm	*elm;

	for (elm = indent->first; elm != NULL; elm = elm->next) {
		fputs(elm->str, out);
		if (elm->str[0] == '`') {
			elm->str[0] = ' ';
		}
	}
}

static void STreeElm_pprintImpl(
		const union STreeElm	*self,
		FILE	*out,
		char	baseChr,
		struct Indent	*indent);

static void STreeElmSyntax_pprint(
		const struct STreeElmSyntax	*self,
		FILE	*out,
		char	baseChr,
		struct Indent	*indent)
{
	char hasChild = (self->elm != NULL) ? '+' : '-';

	Indent_print(indent, out);
	fprintf(out, "%c%c- %s: %s\n",
			baseChr,
			hasChild,
			self->syntaxKind->name,
			self->token->str);

	if (self->elm != NULL) {
		struct IndentElm	indexnElm;
		struct Indent	curIndent = *indent;
		char	nextBaseChar = '-';

		if (self->elm->cmn.elmType != STreeElmType_node) {
			nextBaseChar = '`';
		}

		Indent_put(&curIndent, &indexnElm, ' ');
		STreeElm_pprintImpl(self->elm, out, nextBaseChar, &curIndent);
	}
}

static void STreeElmName_pprint(
		const struct STreeElmName	*self,
		FILE	*out,
		char	baseChr,
		struct Indent	*indent)
{
	Indent_print(indent, out);
	fprintf(out, "%c-- name: %s\n", baseChr, self->token->str);
}

static void STreeElmInt_pprint(
		const struct STreeElmInt	*self,
		FILE	*out,
		char	baseChr,
		struct Indent	*indent)
{
	Indent_print(indent, out);
	fprintf(out, "%c-- int: %s\n", baseChr, self->token->str);
}


static void STreeElmNode_pprint(
		const struct STreeElmNode	*self,
		FILE	*out,
		struct Indent	*indent)
{
	struct IndentElm	indexnElm;
	struct Indent	curIndent = *indent;

	Indent_print(indent, out);
	fputs("-.\n", out);

	Indent_put(&curIndent, &indexnElm, ' ');
	STreeElm_pprintImpl(self->l, out, '-', &curIndent);
}


static void STreeElm_pprintImpl(
		const union STreeElm	*self,
		FILE	*out,
		char	baseChr,
		struct Indent	*indent)
{
	const union STreeElm	*elm;
	const struct STreeElmNode	*obj;
	struct IndentElm	indexnElm;
	struct Indent	curIndent;
	char	hasNext;

	if (self == NULL) {
		Indent_print(indent, out);
		fprintf(out, "%c-- NULL\n", baseChr);
		return;
	}

	curIndent = *indent;

	for (elm = self; elm != NULL; elm = obj->r) {
		switch (elm->cmn.elmType) {
		case STreeElmType_node:
			obj = &elm->node;

			hasNext = (obj->r != NULL) ? '|' : '`';
			Indent_put(&curIndent, &indexnElm, hasNext);

			if (obj->l != NULL && obj->l->cmn.elmType ==
					STreeElmType_node) {
				STreeElmNode_pprint(obj, out, &curIndent);
			} else {
				STreeElm_pprintImpl(obj->l, out,
						'-', &curIndent);
			}

			if (obj->r != NULL && obj->r->cmn.elmType !=
					STreeElmType_node) {
				baseChr = '`';
			}

			Indent_put(&curIndent, &indexnElm, '\0');
			break;

		case STreeElmType_syntax:
			STreeElmSyntax_pprint(&elm->syntax, out,
					baseChr, indent);
			return;

		case STreeElmType_name:
			STreeElmName_pprint(&elm->name, out,
					baseChr,  indent);
			return;

		case STreeElmType_int:
			STreeElmInt_pprint(&elm->intVal, out,
					baseChr, indent);
			return;
		}
	}
}

void STreeElm_pprint(const union STreeElm *self, FILE *out)
{
	struct IndentElm	indentElm	= IndentElm_empty();
	struct Indent	indent	= Indent_init(&indentElm);

	STreeElm_pprintImpl(self, out, '-', &indent);
}
