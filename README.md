# tap-pessimist
[![npm status](http://img.shields.io/npm/v/tap-pessimist.svg)](https://www.npmjs.org/package/tap-pessimist)
[![build status](https://secure.travis-ci.org/clux/tap-pessimist.svg)](http://travis-ci.org/clux/tap-pessimist)

A small command line filtration tool for filtering some of the constant spam from node-tap. It will only show failed asserts and it will exit with a zero exit code if everything passed, or 1 if there were failed asserts.

## Usage
Pipe to:

```bash
$ producerApp | tap-pessimist
```

or

```bash
$ cat log.txt | tap-pessimist
```

## Installation

```
npm install -g tap-pessimist
```

## License
MIT-Licensed. See license file for details.
