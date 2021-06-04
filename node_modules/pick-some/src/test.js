const test = require('tape');
const { pickSome, pickSomeUnique, pickSomeSequential } = require('./index');

test('#pickSome - bad params', (t) => {
  pickSome(3, {});
  pickSome();
  pickSome('cat');
  pickSome({},{});
  t.end();
});

test('#pickSome - basic', (t) => {
  const arr = [1,2,3,4,5];
  const actual = pickSome(3, arr);
  t.is(actual.length, 3, 'contains all items');
  actual.forEach(a => {
    t.ok(arr.indexOf(a) >= 0);
  })
  t.end();
});

test('#pickSome - unique', (t) => {
  const arr = [1,2,3,4,5,6,7,8,9];
  const actual = pickSome(7, { unique: true }, arr);
  t.is(actual.length, 7, 'contains all items');
  t.is((new Set(actual)).size, 7);
  t.end();
});

test('#pickSome - sequential', (t) => {
  const arr = [1,2,3,4,5,6,7,8,9];
  const actual = pickSome(4, { sequential: true }, arr);
  t.is(actual.length, 4, 'contains all items');
  let last = 0;
  for (let i = 0; i < actual.length; i ++) {
    t.ok(last <= actual[i]);
    last = actual[i];
  }
  t.end();
});

test('#pickSome - sequential & unique', (t) => {
  const arr = [1,2,3,4,5,6,7,8,9];
  const actual = pickSome(4, { unique: true, sequential: true }, arr);
  t.is(actual.length, 4, 'contains all items');
  let last = 0;
  for (let i = 0; i < actual.length; i ++) {
    t.ok(last < actual[i]);
    last = actual[i];
  }
  t.end();
});

test('#pickSomeUnique', (t) => {
  const arr = [1,2,3,4,5,6,7,8,9];
  const actual = pickSomeUnique(7, arr);
  t.is(actual.length, 7, 'contains all items');
  t.is((new Set(actual)).size, 7);
  t.end();
});

test('#pickSomeUnique - pick more', (t) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const actual = pickSomeUnique(10, arr);
  t.is(actual.length, 9, 'contains all items');
  t.is((new Set(actual)).size, 9);
  t.end();
})

