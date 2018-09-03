module.exports = {
  dev: {
    publicPath: '/',
    useEslint: true,
    buildDirector: 'pages/tween',
    host: 'localhost',
    port: '8081',
    proxy: {
      '/dev': {
        // 这里的地址应该是开发环境的前缀,木有接口
        target: 'https://c.y.qq.com',
        // 把/dev去掉
        pathRewrite: { '^/dev': '' },
        changeOrigin: true,
        logLevel: 'debug',
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
      },
    }
  },
  build: {
    publicPath: './',
    buildDirectors: ['pages/canvas', 'pages/tween'],
  }
}
