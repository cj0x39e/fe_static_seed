var path = require('path')
var webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.resolve(__dirname, '../../\.tuliu/entry.js')
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|.\.es5\.js)/
      },
      {
        test: /\.es5\.js$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader',
        ]
      },
      // {
      //   test: /\.((c|sa|sc)ss)$/i,
      //   include: /(pages|styles)/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].css'
      //       }
      //     },
      //     'extract-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: {
      //           localIdentName: '[name]__[local]--[hash:base64:5]'
      //         },
      //         importLoaders: 2
      //       }
      //     },
      //     'postcss-loader',
      //     'sass-loader',
      //   ]
      // }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        uiComponentsStyles: {
          name: 'ui-components',
          test: (module, chunks, entry = 'foo') => {
            // console.log('m.constructor.name', )
            const isC = module.constructor.name === 'CssModule' && /ui-components/.test(module.context)
            if (isC) {
              console.log(module)
            }
            return isC
          },
          chunks: 'all',
          enforce: true
        }
      }
    }
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
      filename: '[name].css',
    }),
  ]
}