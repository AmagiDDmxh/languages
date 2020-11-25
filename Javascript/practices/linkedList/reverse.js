const assert = require("assert")
const { link } = require("fs")

class LinkedList {
  constructor (value, next) {
    Object.assign(this, { value, next })
  }

  static fromArray(arr) {
    const root = new LinkedList(arr[0])
    let head = root
    let i = 0
    while (i < arr.length - 1) {
      i++
      head.next = new LinkedList(arr[i])
      head = head.next
    }
    return root
  }

  join(divider = ',') {
    let head = this
    let result = head.value.toString()
    while (!!(head = head.next)) {
      result += divider + head.value.toString()
    }
    return result
  }

  toString() {
    return this.join()
  }
}

const ll = LinkedList.fromArray([1,2,3,4,5])
assert.strictEqual(reverse(ll).join(' '), '5 4 3 2 1', 'reversed ll should be "5 4 3 2 1"')

//   1 -> 2
//p  c    n
function reverse(linkedList) {
  let prev,
    curr = linkedList,
    next = curr.next
  
    while (next) {
      curr.next = prev
      prev = curr
      curr = next
      next = next.next
    }

    curr.next = prev

    return curr
}
