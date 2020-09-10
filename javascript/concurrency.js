const log = require('./logger')

let callbackFunc = (arg, callback) => {
  let arr = []
  for(i = 0; i < arg; i++) {
    arr.push({ name: `User ${i + 1}`, id: i + 1 })
  }
  callback(arr)
}

callbackFunc(10, log)

