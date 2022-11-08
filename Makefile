packageName = mdplantlib

all: test

test:
	@mocha

dts:
	find * -iname "*.d.ts" | xargs -I {} rm {}
	tsc --allowJs --declaration index.js

.PHONY: test
