#!/usr/bin/env node

/**
 * Consumer for TAP compliant output
 *
 * Usage:
 * a) producerApp | tap-pessimist
 * b) cat log.txt | tap-pessimist
 */

var tap = require('tap')
  , log = require('logule')
  , consumer = new tap.Consumer(); // inherits from Stream

var num = 0, fails = 0;

consumer.on('plan', function (end, comment) {
  log.info('Test plan: [1..' + end + ']', (comment) ? ': ' + comment : '');
});

consumer.on('data', function (data) {
  if (Object(data) === data) {
    // comments get here, but not non-tap compliant stuff
    num += 1;
    if (!data.ok) {
      fails += 1;
      log.sub('#' + data.id).error(data.name); // might as well highlight id of failed tests
    }
  }
});

consumer.on('bailout', function (reason) {
  log.error("Bailed out after", num, "messages,", fails, 'failures. because:', reason);
  process.exit();
});

consumer.on('end', function () {
  if (fails > 0) {
    log.warn('output terminated - ' + fails + ' errors');
  }
  else {
    log.info('output terminated - all ' + num + ' messages verified');
  }
  process.exit();
});

process.stdin.resume();
process.stdin.pipe(consumer);
