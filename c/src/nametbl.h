#ifndef NAMETBL_H
#define NAMETBL_H


#include "nametblhdr.h"
#include "variable.h"


struct NameTblEntryCmn {
	NAME_TBL_ENTRY_HEADER
};


union NameTblEntry {
	struct NameTblEntryCmn	cmn;
	struct Variable	var;
};


struct NameTbl;


struct NameTbl *NameTbl_new();

void NameTbl_add(
		struct NameTbl	*self,
		union NameTblEntry	*entry);

union NameTblEntry *NameTbl_find(
		struct NameTbl	*self,
		const char	*name);

#endif
