const { assert } = require('console')
const { spawn } = require('child_process')
const imageToAscii = require('image-to-ascii')
const stringify = require('asciify-pixel-matrix')
const sharp = require('sharp')
const moment = require('moment')

const log = console.log.bind(console)
const ASCII_STR = "`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
const MAX_PIXEL_VALUE = 250

const to2dArray = (data, width) => {
  const pixels = []
  let index = 0
  let pixel = null
  let tuple = []
  for (const b of data) {
    if (index++ === 0) {
      pixel = []
    }
    tuple.push(b)
    if (index % 3 === 0) {
      pixel.push(tuple)
      tuple = []
    }
    if (index === width * 3) {
      pixels.push(pixel)
      index = 0
    }
  }
  return pixels
}

const toIntensity = (data, algoName = 'average') => {
  const intensities = []
  for (const row of data) {
    const intensityRow = []
    for (const pixel of row) {
      const [R, G, B] = pixel
      let intensity
      if (algoName === 'average')
        intensity = (R + G + B / 3.0)
      else if (algoName === 'lightness')
        intensity = (Math.max(...pixel) + Math.min(...pixel) / 2.0)
      else if (algoName === 'luminosity')
        intensity = 0.21*R + 0.72*G + 0.07*B
      intensityRow.push(intensity)
    }
    intensities.push(intensityRow)
  }
  return intensities
}

const f = (x, n, m) => {
  // if (n > m) return f(x, m, n)
  return Math.floor(x/n*m)
}
const toAscii = (x, n) => ASCII_STR[f(x, n, ASCII_STR.length)]
const toAsciis = (data) => iterating2dArray(data, (pixel, length) => toAscii(pixel, length))
const isDefined = i => i != null && typeof i !== 'undefined'

const normalizeIntensityMatrix = data => {
  const normalizedData = []
  const maxPixel = Math.max(...data.map(row => Math.max(...row)))
  const minPixel = Math.min(...data.map(row => Math.min(...row)))
  for (const row of data) {
    rescaledRow = []
    for (const p of row) {
      r = Math.floor(MAX_PIXEL_VALUE * (p - minPixel) / parseFloat(maxPixel - minPixel))
      rescaledRow.push(r)
    }
    normalizedData.push(rescaledRow)
  }
  return normalizedData
}

const convertToAscii = (intensityMatrix, asciiChars = ASCII_STR) => 
  iterating2dArray(
    intensityMatrix, 
    pixel => asciiChars[parseInt(pixel/MAX_PIXEL_VALUE * asciiChars.length) - 1]
  )

const to2dString = arr => arr.map(row => row.join('')).join('')
    

const iterating2dArray = (data, fun = log) => {
  const result = []
  for (const row of data) {
    const rowArray = []
    for (const col of row) {
      const val = fun(col, row.length)
      if (isDefined(val)) {
        rowArray.push(val)
      }
    }
    result.push(rowArray)
  }
  return result
}

const printAsciiArray = arr => {
  for (const row of arr) {
    log(row.join(''))
  }
}

const formatStr = 'YMDHHmmss'
const filePath = () => {
  return `./test-${moment().format(formatStr)}.jpg`
}
const imagePath = filePath()
const proc = spawn('imagesnap', [imagePath, '-w', '2'])

const main = () => {
  const image = sharp(imagePath)

  image
    // .resize(250)
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(imageData => {
      // console.log(imageData.length, imageData)
      const { width, height } = imageData.info
      const pixels = to2dArray(imageData.data, width)
      assert(
        pixels.length === height && pixels[0].length === width, 
        'pixels should now contains the image color for each pixel'
      )
      const intensities = toIntensity(pixels)
      const intensitiesLight = toIntensity(pixels, 'lightness')
      const intensitiesLumi = toIntensity(pixels, 'luminosity')
      // printAsciiArray(toAsciis(normalizeIntensityMatrix(intensities)))
      // printAsciiArray(toAsciis(normalizeIntensityMatrix(intensitiesLight)))
      printAsciiArray(toAsciis(normalizeIntensityMatrix(intensitiesLumi)))
      // const normalized = normalizeIntensityMatrix(intensities)
      // const asciilized = convertToAscii(normalized)
      // log(to2dString(asciilized))
      // log(asciis.map(s => s.join('')).join(''))
    })
}

proc.on('close', () => {
  // main()
  
  imageToAscii(imagePath, {
    // colored: false,
    // reverse: true,
    bg: true,
    fg: false,
    stringify: false,
    concat: false
  }, (err, converted) => {
    if (err) {
      log('...', err)
      return
    }

    log(stringify.stringifyMatrix(converted))
  })
})
