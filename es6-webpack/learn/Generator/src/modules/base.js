import axios from 'axios'
// Generator函数的ES7改进语法是async

// yield指针
function* gen() {
  yield 'first'
  // 当指针指到这里,才会求值
  yield (() => {
    console.log('second')
    return 'second'
  })()
  return 'ending'
}

let genStep = gen()

console.log(genStep.next('s'))
// console.log(genStep.next())
// console.log(genStep.next())
// console.log(genStep.next())

// yield的返回值
// 第一个next的参数是没有意义的
// 第二个next的参数作为第一个yield的返回值

function* foo(obj) {
  let x = obj.x
  console.log('x', x)
  let y = yield (x + 100)
  console.log('y', y)
  let z = yield y
  console.log('z', z)
  return x + y
}

let fooStep = foo({
  x: 5
})

console.log(fooStep.next())
console.log(fooStep.next())
console.log(fooStep.next())

function* bar(obj) {
  let x = obj.x
  console.log('x', x)
  let y = yield (x + 100)
  console.log('y', y)
  let z = yield y
  console.log('z', z)
  return x + y
}

let barStep = bar({
  x: 5
})

console.log(barStep.next(1))
console.log(barStep.next(3))
console.log(barStep.next(7))

// for...of循环
function* forof() {
  yield 1
  yield 2
  return 3
}

for (let v of forof()) {
  console.log(v)
}

// 异步迭代器
function* pro() {
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1000)
      resolve(1000)
    }, 1000)
  })
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2000)
      resolve(2000)
    }, 2000)
  })
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3000)
      resolve(3000)
    }, 3000)
  })
}
let proResult = null
for (let v of pro()) {
  console.log(v)
  proResult = v
}
console.log('proResult', proResult)
proResult.then((data) => {
  console.log('proResultData',data)
})

// yield*用来在一个 Generator 函数里面执行另一个 Generator 函数
function* father() {
  yield 'x'
  yield* son()
  yield 'z'
}

function* son() {
  yield 'y'
}

let fatherStep = father()
console.log(fatherStep.next())
console.log(fatherStep.next())
console.log(fatherStep.next())

// 使用yield解维数组
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i])
    }
  } else {
    yield tree
  }
}

const tree = ['a', ['b', 'c'], ['d', 'e']]

for (let x of iterTree(tree)) {
  console.log(x)
}

// Generator函数中是没有this的
function* g() {

}

g.prototype.hello = function () {
  return 'hi!'
};

let obj = g()
obj.next()
// true
console.log(obj instanceof g)
// 'hi!'
console.log(obj.hello())

// Generator和状态机
let flag = true
function toggle() {
  console.log(flag)
  flag = !flag
}

function* toggleMach() {
  console.log('循环体外面')
  while (true) {
    console.log('Tick!')
    yield
    console.log('Tock!')
    yield
  }
}

let toggleMachStep = toggleMach()
console.log(toggleMachStep.next())
console.log(toggleMachStep.next())
console.log(toggleMachStep.next())
console.log(toggleMachStep.next())

// Generator函数和异步

function* ajax() {
  let url = 'https://api.github.com/users/github'
  let result = yield axios({
    url
  })
}

let ajaxStep = ajax()
let result = ajaxStep.next().value
result.then((data) => {
  console.log(data)
})

// 基于Promise的自动执行
let imgList = [1, 2, 3, 4]
// updateAllImg(imgList)

function updateAllImg(imgList) {

  function updateImg(img) {
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

  function* updateImgGen(imgList) {
    while (imgList.length > 0) {
      yield updateImg(imgList[0])
      imgList.shift()
    }
    return '所有的图片上次结束'
  }

  function next() {
    let result = updateImgStep.next()
    if (result.done) {
      console.log('结束了')
    } else {
      result.value.then(() => {
        next()
      })
    }
  }

  let updateImgStep = updateImgGen(imgList)
  next()
}

// 不用Generator函数做
let imgList1 = [1, 2, 3, 4]
updateAllImg1(imgList)

function updateAllImg1(imgList) {
  function updateImg(img) {
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

  function next() {
    if (!imgList.length) {
      console.log('图片全部上传完成')
      return
    } else {
      updateImg(imgList[0]).then(() => {
        imgList.shift()
        next()
      }).catch((err) => {
        console.error(err)
        imgList.shift()
        next()
      })
    }
  }

  next()
}
