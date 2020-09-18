const ssrHandler = require('../../ssrHandler')

function SSRRenderPlugin() {}

SSRRenderPlugin.prototype.apply = function(compiler) {
  compiler.hooks.done.tap('SSRRenderPlugin', stats => {
    ssrHandler()
  })
}

module.exports = SSRRenderPlugin
