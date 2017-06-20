#ifndef NAMETBLHDR_H
#define NAMETBLHDR_H

union NameTblEntry;


enum NameTblEntryKind {
	NameTblEntryKind_var
};


#define NAME_TBL_ENTRY_HEADER \
	enum NameTblEntryKind	kind;	\
	const char	*name;	\
/* end of NAME_TBL_ENTRY_HEADER */


#endif
