let toposort = require('toposort')

// [parentNode, node]的关系,最终通常还要转成依赖(reverse)关系[node, parentNode]
let graph = [
  ['webpack', 'webpack-dev-server'],
  ['css-loader', 'style-loader'],
  ['less-loader', 'css-loader'],
  ['less-loader', 'postcss-loader'],
  ['postcss-loader', 'css-loader'],
  ['webpack-dev-server', 'css-loader'],
  ['babel-loader', 'babel-plugin']
]

// 第一个参数要把需要排序的数组的元素都写进去,并且是默认的[parentNode, node]关系
// 如果和第二个参数里面的二维数组的元素是第一个参数没有的,就会报错
let result1 = toposort.array([
  'node',
  'webpack',
  'webpack-dev-server',
  'css-loader',
  'style-loader',
  'less-loader',
  'postcss-loader',
  'babel-loader',
  'babel-plugin'
], graph)

let result2 = toposort(graph)

console.log(result1)

console.log(result2)
