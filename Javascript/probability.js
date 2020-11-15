// Probability of a coin with head as 'H' tail as T
// Whats the chance of throwing it up 4 times to get exactly 2H and 2T

// TODO: Turn it into a general idea to solve probability problem

class Tree {
  constructor(value, children) {
    Object.assign(this, { value, children });
  }
}

function generateTree(base, n = 1, str) {
  const root = new Tree(base);
  if (n === 0) return root;
  let i = 0;
  while (i++ < n) {
    for (let j = 0; j < str.length; j++) {
      const s = str[j]
      root.children[j] = generateTree(s, n - 1, str)
    }
  }
  return root;
}

function traverseTree(tree, fn = console.log, result = []) {
  if (tree) {
    traverseTree(tree.left, fn, [...result, tree.value]);
    traverseTree(tree.right, fn, [...result, tree.value]);
  } else {
    fn(result.slice(1));
  }
  // balanced tree, no need the check right
  // if (!tree?.left) {
  // }
}

class _Set {
  #nativeSet = new Set();

  add(item) {
    const prevSize = this.#nativeSet.size;
    this.#nativeSet.add(item);
    const currSize = this.#nativeSet.size;
    return currSize !== prevSize;
  }
}

function uniqBy(fn, list) {
  const set = new _Set();
  const result = [];

  let idx = 0;
  while (idx < list.length) {
    const item = fn(list[idx]);
    if (set.add(item)) {
      result.push(item);
    }
    idx += 1;
  }

  return result;
}

const identity = (e) => e;
const uniq = (list) => uniqBy(identity, list);

let result = [];
traverseTree(generateTree(null, 4, "HT"), (hts) => result.push(hts.join("")));

result = uniq(result);

result.filter((HT) => {
  let h = "";
  let t = "";

  let idx = 0;
  while (idx < HT.length) {
    const item = HT[idx];
    if (item === "H") {
      h += item;
    }
    if (item === "T") {
      t += item;
    }
    idx++;
  }

  return h.length === 2 && t.length === 2;
});
