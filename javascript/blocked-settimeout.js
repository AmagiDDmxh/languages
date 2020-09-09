const log = require('./logger')

const second = 1000

// waht a setTimeout might be
// time in second
const setTimeoutd = (cb, time = 0) => {
  const ms = Date.now()
  while (true) {
    if ((Date.now() - ms) >= time) {
      cb()
      break
    }
  }
}

const aNewDay = () => new Date().toISOString()

const doneWithAmagiCallback = () => {
  log('XXX: im done with you, amagi!', aNewDay())
}

// log('Amagi: Lets work together', aNewDay())
// setTimeoutd(doneWithAmagiCallback, 10 * second)
// log('Amagi: Okay, thats fine...', aNewDay())

// How about immediately done with amagi
// log('Amagi: Lets work together', aNewDay())
// setTimeoutd(doneWithAmagiCallback, 0)
// log('Amagi: Okay, thats fine...', aNewDay())

for (let i = 0; i < 10; i++) {
  log(aNewDay())
  // 10 people concurrently done with amagi in the quite same time but FIFO order
  // setTimeout(doneWithAmagiCallback, 10)
  
  // 10 people concurrently done with amagi in sequential order
  // so that in order to block amagi 10x times
  setTimeoutd(doneWithAmagiCallback, 10)
}
