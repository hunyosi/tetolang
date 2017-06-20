#include "opdef.h"

#include <stddef.h>


struct OpParam OpDef_defaultOps[] = {
	{"+", 500, OpType_yfx},
	{"-", 500, OpType_yfx},
	{"*", 400, OpType_yfx},
	{"/", 400, OpType_yfx},
	{NULL, 0, OpType_end}
};
