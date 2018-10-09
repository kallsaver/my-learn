

// 生命周期
function run () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
      console.log('2x')
    }, 1000)
  })
}

run().then(() => {
  console.log('then')
})



function updateImg (img) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (img !== 2) {
        console.log(`第${img}张图片上传成功`)
        resolve(img)
      } else {
        console.log(`第${img}张图片上传失败`)
        reject(`第${img}张图片上传失败`)
      }
    }, 1000)
  })
}

// catch
updateImg(2).then(() => {
  // catch之前的then是resolve的then
  console.log('resolve')
}).catch((err) => {
  console.error(err)
}).then(() =>{
  // catch之后的then是在catch触发后可以无限触发,没有意义的存在
  // 而且影响了封装
  console.log('after catch then')
})
