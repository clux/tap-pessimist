#!/usr/bin/env node

/**
 * Consumer for TAP compliant output
 *
 * Usage:
 * a) producerApp | tap-pessimist
 * b) cat log.txt | tap-pessimist
 */

var consumer = new require('tap').Consumer() // inherits from Stream
  , log = require('logule');


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
      log.error('#' + data.id + ' not ok - ' + data.name);
    }
  }
});

consumer.on('bailout', function (reason) {
  log.error("Bailed out after", num, "messages,", fails, 'failures with: "' + reason + '"');
  process.exit(1);
});

consumer.on('end', function () {
  if (fails > 0) {
    log.warn('output terminated - ' + fails + ' failures');
    process.exit(1);
  }
  // tap will send a not ok if end with num less than test plan end
  log.info('output terminated - all ' + num + ' tests verified');
  process.exit(0);
});

process.stdin.resume();
process.stdin.pipe(consumer);
