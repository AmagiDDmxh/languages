const assert = require("assert");

const arr1 = [1, 3, 4, 5];
const arr2 = [2, 6, 7, 8];
const result = [1, 2, 3, 4, 5, 6, 7, 8];

const mergeSortedArray = (first, second) => {
  let i = (j = 0);
  const result = [];

  while (i < first.length && j < second.length) {
    if (first[i] < second[j]) {
      result.push(first[i]);
      i++;
    } else {
      result.push(second[j]);
      j++;
    }
  }

  return i === first.length
    ? result.concat(second.slice(j))
    : result.concat(first.slice(i));
};

assert.deepEqual(mergeSortedArray(arr1, arr2), result);
