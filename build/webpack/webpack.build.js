const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.js')
const optimizationConfig = require('./optimizationConfig.js')
const CleanUpPlugin = require('./plugins/CleanUpPlugin')
const { tempDir, entryFileName } = require('../utils/common')
const config = require('../utils/config')
const pageName = config.getConfigByKey('pageName')

module.exports = merge(baseConfig, optimizationConfig, {
  mode: 'production',
  entry: {
    [pageName]: entryFileName,
    'js-component': path.resolve(__dirname, '../jsComponentEntry.js')
  },
  externals: {
    vue: 'Vue'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(tempDir, '/index.html'),
      inject: false,
      filename: `${pageName}.html`,
      minify: false // 不压缩代码
    }),
    new CleanUpPlugin()
  ]
})
