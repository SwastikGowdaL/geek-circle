[![Build Status](https://travis-ci.org/DveMac/pick-some.svg?branch=master)](https://travis-ci.org/DveMac/pick-some)  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# pick-some

Simple utility to pick, select, choose random items from an array. Items can be chosen uniquely and/or sequentially.

## api

```
pickSome(amount: number, [options: object], arr: array);

options = { unique: boolean, sequential: boolean }
```

## example


```js
const { pickSome } = require('pick-some');

// basic use
pickSome(3, [1,2,3,4,5]) // => [2,5,5]

// unqiue items only
pickSome(3, { unique: true }, [1,2,3,4,5]) // => [3,5,1]

// sequential pick
pickSome(3, { sequential: true }, [1,2,3,4,5]) // => [3,3,4]

// sequential & unique pick
pickSome(3, { unique: true, sequential: true }, [1,2,3,4,5]) // => [2,3,5]

// additional helpers
const { pickSomeUnique, pickSomeSequential } = require('pick-some');
pickSomeUnique(3, [1,2,3,4,5]) // => [3,5,1]
pickSomeSequential(3, [1,2,3,4,5]) // => [3,3,4]
```

## license

[MIT](./LICENSE)
