let numExp = /(\d+,*\d*)+/g

let parser = () =>
  [].map
    .call(document.querySelectorAll(".diffstat.tooltipped"), (i) => i.ariaLabel)
    .filter((i) => i)
    .map((i) => i.match(numExp))
    .filter((i) => i)
    .map((i) => i.map(mapToNumber));

let mapToNumber = numText => 
  numText.indexOf(',') 
  ? Number(numText.split(',').join(''))
  : Number(numText)

let bullshitTriggerPoint = 1000
let filterOutShit = n => n < bullshitTriggerPoint

let takeNth = (arr, n) => arr[n]

let outofBullshit = () => parser().filter(([t]) => filterOutShit(t))
let sumUpRealshitArgs = [(acc, [t]) => acc + t, 0]

let realshits = () => outofBullshit().reduce(...sumUpRealshitArgs)
