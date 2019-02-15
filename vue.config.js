const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  baseUrl: './',
  devServer: {
    disableHostCheck: true,
    port: 8080,
    proxy: {
      '/api': {
        'target': 'http://192.168.0.141:81',
        // 'target': 'https://www.ypcxpt.com/',
        'changeOrigin': true,
        'secure': false
        // 'pathRewrite': {
        //     '^/api': ''
        // }
      }
    }
  },
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log']// 移除console
            }
          }
        })
      ]
    }
  }
}
