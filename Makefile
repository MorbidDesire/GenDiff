install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

run:
	bin/gendiff.js

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .


.PHONY: test