var path = require('path')
var webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('../utils/config')

const pageName = config.getConfigByKey('pageName')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    [pageName]: path.resolve(__dirname, '../../\.tuliu/entry.js')
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /(node_modules|.\.es5\.js)/
      },
      {
        test: /\.es5\.js$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          'eslint-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {

              limit: 2048, // 小于 2 kb 转为 base 64

              /**
               * for fallback "file-loader" option
               */
              name: (resourcePath) => {
                let dirList = resourcePath.split(path.sep)
                const imagesDir = 'images'
                const imagesIndex = dirList.indexOf(imagesDir)
                if (imagesIndex === -1) {
                  throw new Error(`图片必须放置在 ${imagesDir} 文件夹中！！！`)
                } else {
                  // 去除绝对路径和文件名
                  dirList = dirList.slice(imagesIndex, -1)
                  return `${dirList.join('/')}/[name].[contenthash:6].[ext]`
                }
              },

              // https://github.com/vuejs/vue-loader/issues/1612#issuecomment-614542603
              // for vue
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:12]'
              },
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~': path.resolve(__dirname, '../../src/')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}
