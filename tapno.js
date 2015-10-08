#!/usr/bin/env node

/**
 * Consumer for TAP compliant output
 *
 * Usage:
 * a) producerApp | tap-pessimist
 * b) cat log.txt | tap-pessimist
 */

var parser = require('tap-parser');
var p = parser(function (results) {
  process.exit(results.ok ? 0 : 1);
});

p.on('assert', function (assert) {
  if (!assert.ok) {
    console.warn(assert.id + ' - ' + assert.name);
  }
})

process.stdin.pipe(p);
