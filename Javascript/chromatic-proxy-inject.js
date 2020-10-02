const fs = require('fs')

const pathToChromatic = './node_modules/.bin/chromatic'
const data = fs.readFileSync(pathToChromatic).toString()

const [firstLine, ...rest] = data

const proxyedChromatic = [
  firstLine,
  `
  // --
  var http = require('http');
  var https = require('https');
  var HttpsProxyAgent = require('https-proxy-agent');

  const globalAgent = new HttpsProxyAgent(process.env.http_proxy || process.env.HTTP_PROXY);
  http.globalAgent = globalAgent;
  https.globalAgent = globalAgent;
  // --
  `.split('\n').map(s => s.trim()).join('\n'),
  ...rest
]

fs.writeFileSync(pathToChromatic, proxyedChromatic.join('\n'), 'UTF-8')
