#XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
# TetoTetoProlog
# written by ASAKURA, Hunyosi.
#
# This software is made available under
# the Creative Commons CC0 1.0 Universal Public Domain Dedication.
# See "LICENSE" file.
#XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


# using SWI-Prolog
PROLOG=swipl

# using GNU Prolog
#PROLOG=gprolog

OBJS=js/tetotetoprolog.js example/ttp_example.js

all: $(OBJS)

js/tetotetoprolog.js: src/ttprosrc.js src/compiler.pro
	echo "['src/compiler.pro']. ttp_build_js_library('src/ttprosrc.js', 'js/tetotetoprolog.js')." | $(PROLOG)

example/ttp_example.js: example/ttp_example.pro
	echo "['src/compiler.pro']. ttpc('example/ttp_example.pro', 'example/ttp_example.js')." | $(PROLOG)

clean:
	rm -f $(OBJS)

