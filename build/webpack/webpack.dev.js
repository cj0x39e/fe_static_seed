const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.js')
const optimizationConfig = require('./optimizationConfig.js')
const { tempDir, entryFileName } = require('../utils/common')
const config = require('../utils/config')
const pageName = config.getConfigByKey('pageName')

module.exports = merge(baseConfig, optimizationConfig, {
  mode: 'development',
  entry: {
    [pageName]: entryFileName,
    'js-component': path.resolve(__dirname, '../jsComponentEntry.js')
  },
  externals: {
    vue: 'Vue'
  },

  devtool: 'source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(tempDir, '/index.html'),
      inject: false
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../../static/'),
    hot: false,
    host: '0.0.0.0',
    port: 1024,
    open: true,
    compress: true,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 500 // 估计值，等待 ssr 编译完成之后再进行重新编译
    },
    // 配置 host 为 0.0.0.0 后，不配置 public 在 windows 上默认打开的地址无法访问
    // 所以配置这个解决，参考 https://github.com/webpack/webpack-dev-server/issues/1204
    public: `localhost:${1024}`
  }
})
