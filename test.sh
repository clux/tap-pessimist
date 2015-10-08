#!/usr/bin/env bash
fail () {
  echo "$@"
  exit 1
}
cat test/fail.txt | node tapno.js
test $? -eq 1 || fail "Failed fail test"

cat test/ok.txt | node tapno.js
test $? -eq 0 || fail "Failed ok test"
