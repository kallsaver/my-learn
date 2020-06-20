// babel分三个阶段运行代码
// 1.解析(parsing)将代码字符串转换成AST抽象语法树
// 2.转译(transfoming)对抽象语法树进行变换操作
// 3.生成(generation)根据变换后的抽象语法树生成新的代码字符串
// 在线解析树: https://astexplorer.net/
// 参考: https://segmentfault.com/a/1190000015127436?utm_source=channel-hottest

const path = require('path')
const fs = require('fs')
const util = require('./util')
const recast = require('recast')
const babylon = require('babylon')
const generator = require('@babel/generator').default
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const types = require('@babel/types')

const src = util.resolve('src')
const dist = util.resolve('dist')
const glob = require('glob')

const jsFilePathList = glob.sync(`${src}/**/*.js`)
const vueFilePathList = glob.sync(`${src}/**/*.vue`)

function compileConst(code) {
  // 解析
  const ast = parser.parse(code)
  // 访问者
  const visitor = {
    // 关键字触发
    VariableDeclaration(path) {
      const node = path.node
      if (node.kind === 'const') {
        node.kind = 'var'
      }
    },
  }
  // 遍历ast树
  traverse(ast, visitor)
  const result = generator(ast, {}, code)
  return result.code
}

// jsFilePathList.forEach((filePath) => {
//   const basename = path.basename(filePath)
//   const code = util.readFileSync(filePath)
//   const result = compileConst(code)
//   const generatorFilePath = `${dist}/${basename}`
//   const dirPath = `${dist}`
//   if (!util.existsSync(generatorFilePath)) {
//     util.mkdirSync(dirPath)
//   }
//   util.writeFileSync(generatorFilePath, result)
// })

function compileVue(code) {
  // 解析
  const ast = babylon.parse(code, {
    sourceType: 'module'
  })
  // 访问者
  const visitor = {
    ObjectMethod(path) {
      const node = path.node
      if (node.key.name === 'data') {
        let blockStatement
        path.traverse({
          BlockStatement(path) {
            const node = path.node
            blockStatement = node
          }
        })
        // 用blockStatement生成ArrowFunctionExpression
        const arrowFunctionExpression = types.arrowFunctionExpression([], blockStatement)
        // 生成CallExpression
        const callExpression = types.callExpression(arrowFunctionExpression, [])
        // 生成property
        const objectProperty = types.objectProperty(types.identifier('data'), callExpression)
        // 插入到原data函数下方
        path.insertAfter(objectProperty)
        // 删除原data函数
        path.remove()
      }
    }
  }
  // 遍历ast树
  traverse(ast, visitor)
  const result = generator(ast, {}, code).code
  return result
}

vueFilePathList.forEach((filePath) => {
  const basename = path.basename(filePath)
  const code = util.readFileSync(filePath)
  const result = compileVue(code)
  const generatorFilePath = `${dist}/${basename}`
  const dirPath = `${dist}`
  if (!util.existsSync(generatorFilePath)) {
    util.mkdirSync(dirPath)
  }
  util.writeFileSync(generatorFilePath, result)
})
