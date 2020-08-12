const fs = require('fs')
const path = require('path')
const sourceMap = require('source-map')
const glob = require('glob')

const scripts = glob.sync('dist/**/*.js.map')

scripts.forEach((file) => {
  if (file.indexOf('app') > -1) {
    const rawSourceMap = fs.readFileSync(`${file}`, 'utf-8')
    sourceMap.SourceMapConsumer.with(rawSourceMap, null, consumer => {
      const pos = consumer.originalPositionFor({
        line: 1,
        column: 982
      })
      console.log(pos)
    })
  }
})
