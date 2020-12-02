const Buffer = require('buffer')

const decodedSubscription = ''

const links = Buffer.from(decodedSubscription, 'base64')
  .toString()
  .map(s => s.trim())
  .filter(Boolean)
  .map((link) => parseLink(link))

const isSSR = /^ssr:\/\//.test
const isSS = /^ss:\/\//.test

const parseLink = link => {
  if (isSSR(link)) {
    const body = link.substring(6)
    const decoded = Buffer.from(body, 'base64').toString()
    const _split = decoded.split('/?')
    const required = _split[0]
    const others = _split[1]
    const requiredSplit = required.split(':')
    if (requiredSplit.length !== 6) {
      return [false]
    }
    const otherSplit = {}
    others && others.split('&').forEach(item => {
      const _params = item.split('=')
      otherSplit[_params[0]] = _params[1]
    })
    return [true, requiredSplit, otherSplit]
  }

  if (isSS(link)) {
    let body = link.substring(5)
    const _split = body.split('#')
    body = _split[0]
    const decoded = decode(body)
    const split1 = decoded.split('@')
    const split2 = split1[0].split(':')
    const split3 = split1[1].split(':')
    if (split2.length !== 2 || split3.length !== 2) {
      return [false]
    }
    return [true, split2, split3, _split[1]]
  }
}
