.PHONY: build clean
default: build

build:
	$(MAKE) clean
	cd ./xer && ng build --prod

clean:
	rm -f ./3rdpartylicenses.txt
	rm -f ./favicon.ico
	rm -f ./*.html
	rm -f ./*.js
	rm -f ./*.css
	rm -f ./*.map