function pickSome(count, options = [], arr = []) {
  if (Array.isArray(options)) {
    arr = options;
    options = { sequential: false, unique: false };
  }
  const arrLen = arr.length;

  if (!options.sequential && !options.unique) {
    return [...Array(count)].map(() => arr[Math.floor(Math.random() * arrLen)]);
  }

  if (!options.sequential && options.unique) {
    const set = new Set();
    const limitCount = Math.min(count, arrLen)
    while (set.size < limitCount) set.add(Math.floor(Math.random() * arrLen))
    return [...set].map(i => arr[i]);
  }

  if (options.sequential && !options.unique) {
    return pickSome(count, {}, Object.keys(arr).map(Number)).sort().map(i => arr[i]);
  }

  if (options.sequential && options.unique) {
    const idxs = pickSome(count, { unique: true }, Object.keys(arr).map(Number));
    return idxs.sort().map(i => arr[i]);
  }

  throw new Error('Unsupported options');
}

module.exports = {
  pickSome,
  pickSomeUnique: (count, arr) => pickSome(count, { unique: true }, arr),
  pickSomeSequential: (count, arr) => pickSome(count, { sequential: true }, arr),
}
