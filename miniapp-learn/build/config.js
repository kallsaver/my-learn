const { getLocalIP } = require('./util')

module.exports = {
  workspace: 'src',
  output: 'dist',
  cloudImgDir: 'static/images',
  configFile: 'src/config/config.js',
  envFile: 'dist/config/env.js',
  devFile: 'dist/config/dev.js',
  host: getLocalIP(),
  imgServerPort: 8086,
  sassCompilerOps: {
    outputStyle: 'expanded'
  },
  lessCompilerOps: {
    outputStyle: 'expanded'
  }
}
