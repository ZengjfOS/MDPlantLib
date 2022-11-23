packageName = MDPlantLib
countLine = $(shell find test lib -iname "*.js" | xargs wc -l | tail -n 1 | awk -F ' ' '{print $$1}')

examplejs   = test/0001_example.js
indexjs     = test/0002_index.js
indentjs    = test/0003_indent.js
tablejs     = test/0004_table.js
plantumljs  = test/0005_plantuml.js
pastejs     = test/0006_paste.js
listjs 	    = test/0007_list.js
projectjs   = test/0008_project.js
menujs      = test/0009_menu.js
loggerjs     = test/0010_logger.js

all: dts

%:
	@echo "start -> $($@js)"
	@mocha $($@js)
	@echo "end   -> $($@js)"

dts: clean
	@echo "generating all .d.ts file"
	@-tsc --allowJs --declaration index.js 2>&1 > /dev/null
	@echo "generated all .d.ts file"

count:
	@echo $(countLine) line for valid working code :\)

clean:
	@find * -iname "*.d.ts" | xargs -I {} rm {}
	@echo "deleted all .d.ts file"

.PHONY: test clean dts
