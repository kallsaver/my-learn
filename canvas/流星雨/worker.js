// self或者this
this.onmessage = function (event) {
  const data = event.data
  const imageData = data.imageData
  const width = data.width
  const height = data.height
  const pixelData = imageData.data

  const len = pixelData.length
  for (let i = 0; i < len; i += 4) {
    // 像素位置
    const pixelIndex = i / 4
    const r = pixelData[i]
    const g = pixelData[i + 1]
    const b = pixelData[i + 2]
    const x = pixelIndex % width
    const y = pixelIndex / width
    // let a = pixelData[i + 3]
    if (r < 10 && g < 20 && b < 30 && (x < 320 || y > 540)) {

    } else {
      pixelData[i + 3] = 0
    }
  }
  this.postMessage({ imageData })
}
