#include "nametbl.h"

#include <stdlib.h>
#include <string.h>


struct NameTblNode {
	struct NameTblNode	*next;
	union NameTblEntry	*entry;
};


struct NameTbl {
	struct NameTblNode	*entries;
};


struct NameTbl *NameTbl_new()
{
	struct NameTbl *self;

	self = malloc(sizeof(struct NameTbl));
	self->entries = NULL;
	return self;
}


void NameTbl_add(
		struct NameTbl *self,
		union NameTblEntry *entry)
{
	struct NameTblNode *node;

	node = malloc(sizeof(struct NameTblNode));
	node->next = self->entries;
	node->entry = entry;

	self->entries = node;
}


union NameTblEntry *NameTbl_find(
		struct NameTbl	*self,
		const char	*name)
{
	struct NameTblNode *node;

	if (self->entries == NULL) {
		return NULL;
	}

	for (node = self->entries; node != NULL; node = node->next) {
		union NameTblEntry *entry = node->entry;
		if (strcmp(entry->cmn.name, name) == 0) {
			return entry;
		}
	}

	return NULL;
}


