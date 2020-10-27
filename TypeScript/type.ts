interface A {
  readonly aReadonlyAttr: | string | { A: A } | number
}

let a: A = { aReadonlyAttr: "String Here" }

// Readonly can not mutate
// a.aReadonlyAttr = 123

const preact = null

export = preact
