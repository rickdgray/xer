.PHONY: build clean install
default: build

TYPESCRIPT_VERSION=4.2
INSTALL_DIR=./node_modules/typescript/bin/
TSC=$(INSTALL_DIR)tsc
	
install:
	npm install --save-dev typescript@$(TYPESCRIPT_VERSION)

build:
	$(TSC)

clean:
	rm -f ./*.js