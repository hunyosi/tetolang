#ifndef VARIABLE_H
#define VARIABLE_H

#include "nametblhdr.h"
#include "type.h"
#include "stree.h"


struct Variable {
	NAME_TBL_ENTRY_HEADER
	enum PrimitiveType	type;
	void	*value;
	union STreeElm	*stree;
};

struct Variable *Variable_new(
		const char	*name,
		enum PrimitiveType	type);

void Variable_setInt(
		struct Variable	*self,
		int	value);

int Variable_getInt(
		struct Variable	*self);


#endif
