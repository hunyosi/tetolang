PROJECTNAME=tetolang

#EXEEXT=.exe
OBJEXT=.o

TARGET=$(PROJECTNAME)$(EXEEXT)

OBJS=	main$(OBJEXT)	\
	nametbl$(OBJEXT)	\
	variable$(OBJEXT)	\
	utils$(OBJEXT)	\
	stree$(OBJEXT)	\
	syntaxkind$(OBJEXT)	\
	towasm$(OBJEXT)	\
	leb128enc$(OBJEXT)	\
	byteary$(OBJEXT)	\
	proginfo$(OBJEXT)	\
	errbuf$(OBJEXT)	\
	strutils$(OBJEXT)	\
	str$(OBJEXT)	\
	srcfile$(OBJEXT)	\
	token$(OBJEXT)	\
	tokenizer$(OBJEXT)	\
	synana$(OBJEXT)	\
	optbl$(OBJEXT)	\
	opdef$(OBJEXT)	\
#	parser$(OBJEXT)	\
#	scanner$(OBJEXT)	\
# end of OBJS


YFLAGS=-d -v


all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) -o $(TARGET) $(OBJS)

#scanner.c: scanner.l "y.tab.h
#
#parser.c "y.tab.h: parser.y

clean:
	$(RM) $(TARGET)
	$(RM) *$(OBJEXT)
	$(RM) scanner.c
	$(RM) parser.c
	$(RM) y.tab.h
	$(RM) *.output
	$(RM) a_out.*
	$(RM) *~
