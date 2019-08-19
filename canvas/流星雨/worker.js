// self或者this
this.onmessage = function (event) {
  let data = event.data
  let imageData = data.imageData
  let width = data.width
  let height = data.height
  let pixelData = imageData.data

  let len = pixelData.length
  for (let i = 0; i < len; i += 4) {
    // 像素位置
    let pixelIndex = i / 4
    let r = pixelData[i]
    let g = pixelData[i + 1]
    let b = pixelData[i + 2]
    let x = pixelIndex % width
    let y = pixelIndex / width
    // let a = pixelData[i + 3]
    if (r < 10 && g < 20 && b < 30 && (x < 320 || y > 540)) {

    } else {
      pixelData[i + 3] = 0
    }
  }
  this.postMessage({ imageData })
}
