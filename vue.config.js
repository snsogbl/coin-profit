module.exports = {
  devServer: {
    port: 8080,
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            // 以设计稿750为例， 750 / 10 = 75
            remUnit: 75
          }),
        ]
      }
    }
  },
  //publicPath: process.env.NODE_ENV === 'production' ? '/static/' : './'
  publicPath: './'
}