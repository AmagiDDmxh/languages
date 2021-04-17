const EventEmitter = require("events");

/* 
Try out event emitter, the 10 default maximum listener
 */

const em = new EventEmitter();
let count = 1;

em.once("newListener", (event, listener) => {
  if (event === "event") {
    // Insert a new listener in front
    em.on("event", () => {
      console.log("B");
    });
  }
});

em.on("newListener", (event, listener) => {
  console.log("New Listener", count++, em.listenerCount('newListener'));
});

em.on("newListener", (event, listener) => {
  console.log("New Listener", count++, em.listenerCount('newListener'));
});

em.on("newListener", (event, listener) => {
  console.log("New Listener", count++, em.listenerCount('newListener'));
});

em.on("newListener", (event, listener) => {
  console.log("New Listener", count++, em.listenerCount('newListener'));
});

em.on("newListener", (event, listener) => {
  console.log("New Listener", count++, em.listenerCount('newListener'));
});

em.on("newListener", (event, listener) => {
  console.log("New Listener", count++, em.listenerCount('newListener'));
});

em.on("newListener", (event, listener) => {
  console.log("New Listener", count++, em.listenerCount('newListener'));
});

em.on("newListener", (event, listener) => {
  console.log("New Listener", count++, em.listenerCount('newListener'));
});

em.on("newListener", (event, listener) => {
  console.log("New Listener", count++, em.listenerCount('newListener'));
});

em.on("newListener", (event, listener) => {
  console.log("New Listener", count++, em.listenerCount('newListener'));
});

em.on("newListener", (event, listener) => {
  console.log("New Listener", count++, em.listenerCount('newListener'));
});

em.on("event", () => {
  console.log("A");
});

em.emit("event");
