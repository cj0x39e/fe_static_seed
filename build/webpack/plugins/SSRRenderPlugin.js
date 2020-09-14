const ssrHandler = require('../../ssrHandler')

function SSRRenderPlugin() {}

SSRRenderPlugin.prototype.apply = function(compiler) {
  compiler.hooks.done.tap('SSRRenderPlugin', stats => {
    console.log('ompiler.hooks.done SSRRenderPlugin')
    ssrHandler()
  })
}

module.exports = SSRRenderPlugin
