
TESTS = $(shell find test/*.test.js)

test:
	@./node_modules/.bin/mocha -u bdd -R spec $(TESTS)

.PHONY: test
