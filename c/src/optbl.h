#ifndef OPTBL_H
#define OPTBL_H

enum OpType {
	OpType_end,
	OpType_xfx,
	OpType_xfy,
	OpType_yfx,
	OpType_fx,
	OpType_fy,
	OpType_xf,
	OpType_yf
};

struct OpElm {
	struct OpElm *next;
	char *op;
	int rank;
	enum OpType opType;
};

struct OpTbl {
	struct OpElm *elms;
};


struct OpParam {
	const char *op;
	int rank;
	enum OpType opType;
};


struct OpTbl *OpTbl_new(struct OpParam *params);

void OpTbl_delete(struct OpTbl *self);

void OpTbl_add(
		struct OpTbl *self,
		const char *op,
		int rank,
		enum OpType opType);

void OpTbl_addAll(
		struct OpTbl *self,
		struct OpParam *params);

#endif
