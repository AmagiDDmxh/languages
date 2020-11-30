const glob = require('glob');

glob.sync('./**/*.json', {
  ignore: [
    '**/node_modules/**',
    '**/.git/**',
  ]
}).map(f =>{
  console.log(f);
  return f
})
