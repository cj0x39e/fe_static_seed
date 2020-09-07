const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { entryFileName } = require('../utils/common')


module.exports = merge(baseConfig, {
  entry: {
    main: path.resolve(__dirname, '../../\.tuliu/entry.js')
  },

  devtool: 'source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../static/index.html'),
      inject: false
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../../static/'),
    // publicPath: `/${name}/`,
    hot: false,
    host: "0.0.0.0",
    port: 1024, 
    open: true,
    stats: {
      maxModules: 0
    },
    // 配置 host 为 0.0.0.0 后，不配置 public 在 windows 上默认打开的地址无法访问
    // 所以配置这个解决，参考 https://github.com/webpack/webpack-dev-server/issues/1204
    public: `localhost:${1024}`
  }
})