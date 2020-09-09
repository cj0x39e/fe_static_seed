const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const optimizationConfig = require('./optimizationConfig.js')

module.exports = merge(baseConfig, optimizationConfig, {
})