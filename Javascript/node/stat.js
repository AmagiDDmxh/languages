const fs = require('fs')

const stat = fs.statSync('./simple-git')
const stat2 = fs.statSync('./glob.js')

console.log(stat, stat2);
