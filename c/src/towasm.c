#include "towasm.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "leb128enc.h"


enum WasmTypeCode {
	WASM_TYPE_I32	= -0x01,
	WASM_TYPE_I64	= -0x02,
	WASM_TYPE_F32	= -0x03,
	WASM_TYPE_F64	= -0x04,
	WASM_TYPE_ANYFUNC	= -0x10,
	WASM_TYPE_FUNC	= -0x20,
	WASM_TYPE_BLOCK	= -0x40
};


enum WasmSectionCode {
	WASM_SECTION_CUSTOM,
	WASM_SECTION_TYPE,
	WASM_SECTION_IMPORT,
	WASM_SECTION_FUNCTION,
	WASM_SECTION_TABLE,
	WASM_SECTION_MEMORY,
	WASM_SECTION_GLOBAL,
	WASM_SECTION_EXPORT,
	WASM_SECTION_START,
	WASM_SECTION_ELEMENT,
	WASM_SECTION_CODE,
	WASM_SECTION_DATA
};


enum WasmExternalKind {
	WASM_EXTERNAL_KIND_FUNCTION,
	WASM_EXTERNAL_KIND_TABLE,
	WASM_EXTERNAL_KIND_MEMORY,
	WASM_EXTERNAL_KIND_GLOBAL
};


static void storeKnownSection(
		struct WasmBin *obj,
		enum WasmSectionCode sectionCode,
		struct ByteAry *content)
{
	struct ByteAry *body = obj->body;

	leb128_addToByteAry(body, sectionCode);
	leb128_addToByteAry(body, content->size);
	ByteAry_addAry(body, content);
}


static void storeTypeSectionContent(
		struct ByteAry *dst)
{
	leb128_addToByteAry(dst, 1);

	/* form */
	sleb128_addToByteAry(dst, WASM_TYPE_FUNC);
	/* param_count */
	leb128_addToByteAry(dst, 0);
	/* param_types */
	/*
	sleb128_addToByteAry(dst, WASM_TYPE_I32);
	*/
	/* return_count */
	leb128_addToByteAry(dst, 1);
	/* return_type */
	sleb128_addToByteAry(dst, WASM_TYPE_I32);
}

static void storeTypeSection(
		struct WasmBin *obj)
{
	struct ByteAry *content;

	content = ByteAry_new(256);
	storeTypeSectionContent(content);
	storeKnownSection(obj, WASM_SECTION_TYPE, content);
	ByteAry_delete(content);
}


static void storeFunctionSectionContent(
		struct ByteAry *dst)
{
	/* count */
	leb128_addToByteAry(dst, 1);
	/* types */
	leb128_addToByteAry(dst, 0);
}

static void storeFunctionSection(
		struct WasmBin *obj)
{
	struct ByteAry *content;

	content = ByteAry_new(256);
	storeFunctionSectionContent(content);
	storeKnownSection(obj, WASM_SECTION_FUNCTION, content);
	ByteAry_delete(content);
}


static void storeExportSectionContent(
		struct ByteAry *dst)
{
	const char *name = "main";
	size_t nameSize = strlen(name);

	/* count */
	leb128_addToByteAry(dst, 1);

	/* entries */

	/* field_len */
	leb128_addToByteAry(dst, nameSize);
	/* field_str */
	ByteAry_add(dst, (const unsigned char *)name, nameSize);
	/* kind */
	leb128_addToByteAry(dst, WASM_EXTERNAL_KIND_FUNCTION);
	/* index */
	leb128_addToByteAry(dst, 0);
}

static void storeExportSection(
		struct WasmBin *obj)
{
	struct ByteAry *content;

	content = ByteAry_new(256);
	storeExportSectionContent(content);
	storeKnownSection(obj, WASM_SECTION_EXPORT, content);
	ByteAry_delete(content);
}



static void storeCodeFromSTree(
		struct ByteAry *dst,
		union STreeElm *stree);

static void storeCodeFromSyntax(
		struct ByteAry *dst,
		struct STreeElmSyntax *p)
{
	const struct SyntaxKind *sk = p->syntaxKind;
	if (sk == SyntaxKind_opPlus) {
		storeCodeFromSTree(dst, p->elm);
		ByteAry_addByte(dst, 0x6A);
	} else if (sk == SyntaxKind_opMinus) {
		storeCodeFromSTree(dst, p->elm);
		ByteAry_addByte(dst, 0x6B);
	} else if (sk == SyntaxKind_opAsterisk) {
		storeCodeFromSTree(dst, p->elm);
		ByteAry_addByte(dst, 0x6C);
	} else if (sk == SyntaxKind_opSlash) {
		storeCodeFromSTree(dst, p->elm);
		ByteAry_addByte(dst, 0x6D);
	} else if (sk == SyntaxKind_opPercent) {
		storeCodeFromSTree(dst, p->elm);
		ByteAry_addByte(dst, 0x6F);
	}
}

static void storeCodeFromSTree(
		struct ByteAry *dst,
		union STreeElm *stree)
{
	union STreeElm *p = stree;
	while (p) {
		switch (p->cmn.elmType) {
		case STreeElmType_node:
			storeCodeFromSTree(dst, p->node.l);
			p = p->node.r;
			break;

		case STreeElmType_syntax:
			storeCodeFromSyntax(dst, &p->syntax);
			return;

		case STreeElmType_name:
			return;

		case STreeElmType_int:
			/* i32.const 100 */
			ByteAry_addByte(dst, 0x41);
			sleb128_addToByteAry(dst, p->intVal.val);
			return;
		}
	}
}

static void storeFunctionBodyContent(
		struct ByteAry *dst,
		union STreeElm *stree)
{
	/* local_count */
	leb128_addToByteAry(dst, 1);
	/* locals */
	/* Local Entry: count */
	leb128_addToByteAry(dst, 1);
	/* Local Entry: type */
	sleb128_addToByteAry(dst, WASM_TYPE_I32);

	/* code */
	 storeCodeFromSTree(dst, stree);

	/* end */
	leb128_addToByteAry(dst, 0x0B);
}

static void storeFunctionBody(
		struct ByteAry *dst,
		union STreeElm *stree)
{
	struct ByteAry *content;

	content = ByteAry_new(65536);
	storeFunctionBodyContent(content, stree);
	/* body_size */
	leb128_addToByteAry(dst, content->size);
	ByteAry_addAry(dst, content);
	ByteAry_delete(content);
}

static void storeCodeSectionContent(
		struct ByteAry *dst,
		union STreeElm *stree)
{
	/* count */
	leb128_addToByteAry(dst, 1);

	/* bodies */
	storeFunctionBody(dst, stree);
}

static void storeCodeSection(
		struct WasmBin *obj,
		union STreeElm *stree)
{
	struct ByteAry *content;

	content = ByteAry_new(65536);
	storeCodeSectionContent(content, stree);
	storeKnownSection(obj, WASM_SECTION_CODE, content);
	ByteAry_delete(content);
}


static void compileToWasmImpl(
		struct WasmBin *obj,
		union STreeElm *stree)
{
	storeTypeSection(obj);
	storeFunctionSection(obj);
	storeExportSection(obj);
	storeCodeSection(obj, stree);
}


static void storeWasmHeader(
		struct WasmBin *obj)
{
	struct ByteAry *body = obj->body;

	// magic number
	ByteAry_addULong(body, 'msa\0');
	// version
	ByteAry_addULong(body, 1);
}


struct WasmBin *compileToWasm(union STreeElm *stree)
{
	struct WasmBin *obj;

	obj = calloc(sizeof(struct WasmBin), 1);
	obj->body = ByteAry_new(65536);

	storeWasmHeader(obj);
	compileToWasmImpl(obj, stree);

	return obj;
}

