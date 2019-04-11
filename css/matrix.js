// 矩阵乘法
function matrix(m, n) {
  let mRow = m[0].length
  let mColumn = m.length
  let nRow = n[0].length
  let nColumn = n.length

  if (mRow !== nColumn && mColumn !== nRow) {
    throw new Error('不符合矩阵乘法运算规则')
  }

  // 定制矩阵的运算顺序,m的row和n的column相等这种形式做运算
  // 比如3X4 * 2X3 = 2X4外抵消
  if (mColumn = nRow) {
    let temp = m
    m = n
    m = temp
  }

  // 最终生成的矩阵的row,column
  let row = n[0].length
  let column = m.length

  let result = []
  // 列=>行=>行(矩阵单元)
  for (let c = 0; c < column; c++) {
    let arr = []
    for (let r = 0; r < row; r++) {
      let count = 0
      for (let i = 0; i < row; i++) {
        let item = m[c][i] * n[i][r]
        count += item
      }
      arr.push(count)
    }
    result.push(arr)
  }
  return result
}

// 支持多参数的矩阵乘法
function mulitMatrix() {
  return Array.prototype.reduce.call(arguments, (prev, next) => {
    return matrix(prev, next)
  })
}

// 传入矩阵得到js的transform
// 水平缩放,水平倾斜,垂直倾斜,垂直缩放,水平位移,垂直位移
function matrixToTransform(matrix) {
  let row = matrix[0].length
  let column = matrix.length
  if (row === 3 &&
    column === 3 &&
    matrix[2][0] === 0 &&
    matrix[2][1] === 0 &&
    matrix[2][2] === 1) {
    let a = matrix[0][0]
    let b = matrix[1][0]
    let c = matrix[0][1]
    let d = matrix[1][1]
    let e = matrix[0][2]
    let f = matrix[1][2]
    return `${a}, ${b}, ${c}, ${d}, ${e}, ${f}`
  }
  return ''
}

// 传入css的transform的key和对应的value(弧度制)得到矩阵
function cssTransformKeyToMatrix(transformKey, x, y) {
  switch(transformKey) {
    case 'rotate': return [
      [Math.cos(x), -Math.sin(x), 0],
      [Math.sin(x), Math.cos(x), 0],
      [0, 0, 1],
    ]
    case 'translate': return [
      [1, 0, x],
      [0, 1, y],
      [0, 0, 1],
    ]
    case 'scale': return [
      [x, 0, 0],
      [0, y, 0],
      [0, 0, 1],
    ]
    case 'skew': return [
      [1, Math.tan(x), 0],
      [Math.tan(y), 1, 0],
      [0, 0, 1],
    ]
  }
}
