# tap-pessimist
A small command line filtration tool for filtering some of the constant spam from node-tap.
It will output the test plan, *not ok* messages, potentially a bailout, then exit once the stream
has ended.

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
