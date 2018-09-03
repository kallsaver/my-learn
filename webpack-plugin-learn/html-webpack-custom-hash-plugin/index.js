
class HtmlWebpackCustomHashPlugin {
  constructor(options) {
    this.options = Object.assign({
      chunkPipe: undefined
    }, options)
  }

  apply(compiler) {
    if (typeof this.options.chunkPipe !== 'function') {
      throw new TypeError('chunkPipe argument must be a function')
    }

    // 去拿chunk.hash
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-alter-chunks', (chunks) => {
        console.log(chunks)
        console.log('----------------')
      })
    })

    // 自定义hash
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-before-html-generation', (a, b) => {
        let JSChunkFiles = a.assets.js
        let CssChunkFiles = a.assets.css
        let customJSChunkFiles = JSChunkFiles.map((chunkFile) => {
          return this.options.chunkPipe(chunkFile)
        })
        console.log(customJSChunkFiles)
      })
    })
  }
}

module.exports = HtmlWebpackCustomHashPlugin
