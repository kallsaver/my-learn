import axios from 'axios'
// async结合了Generator和Promise
// await和yield这些关键字都有明显的缺陷,就是限制在async/Generator内部使用
// 如果在其他函数中使用会报错

function updateImg (img, hadFixed) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // PromiseA+机制本身就有await的特性
      if (img !== 2 && !hadFixed) {
        console.log(`第${img}张图片上传成功`)
        resolve(img)
      } else {
        console.log(`第${img}张图片上传失败`)
        reject(`第${img}张图片上传失败`)
      }
    }, 1000)
  })
}

async function updateImgList (text) {
  // await后面是一个Promise对象,不过不是会转化成Promise.resolve(xx)
  await updateImg(1)
  await updateImg(2)
  await updateImg(3)
  console.log(text)
}

// updateImgList('结束').then(() => {
//   // 全部的await都resolve执行完毕
//   console.log('then')
// })

// 如果希望即使一个操作失败,也不要中断后面的异步操作
let imgList = [1, 2, 3, 4]
async function f () {
  for (let i = 0; i < imgList.length; i++) {
    let item = imgList[i]
    // if (item === 3) {
    //   return
    // }
    // 当await中的Promise对象reject被catch处理时,不会阻断下一个await执行
    // 否则会阻断
    await updateImg(item).catch((err) => {
      // console.error(err)
    })
  }
  console.log('f到底了')
}

f().then(() => {
  // async函数体全部执行完毕或者中途被return
  console.log('async函数体全部执行完毕')
}).catch((err) => {
  console.log(err)
})






