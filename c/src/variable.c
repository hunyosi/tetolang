#include "variable.h"

#include <stdlib.h>

#include "strutils.h"


struct Variable *Variable_new(	const char	*name,
	enum PrimitiveType	type)
{
	struct Variable *self = malloc(sizeof(struct Variable));
	self->kind = NameTblEntryKind_var;
	self->name = dupStr(name);
	self->type = type;
	self->value = NULL;
	return self;
}


void Variable_setInt(	struct Variable	*self,
	int	value)
{
	if (self->value == NULL) {
		self->value = malloc(sizeof(int));
	}

	*((int*)(self->value)) = value;
}

int Variable_getInt(	struct Variable	*self)
{
	if (self->value == NULL) {
		return 0;
	} else {
		return *((int*)(self->value));
	}
}
