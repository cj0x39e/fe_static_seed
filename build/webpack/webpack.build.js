const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const optimizationConfig = require('./optimizationConfig.js')
const CleanUpPlugin = require('./plugins/CleanUpPlugin')

module.exports = merge(baseConfig, optimizationConfig, {
  plugins: [
    new CleanUpPlugin()
  ]
})
