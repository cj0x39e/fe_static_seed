

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        uiComponentsStyles: {
          name: 'ui-components',
          test: (module, chunks, entry = 'foo') => {
            return module.constructor.name === 'CssModule' && /ui-components/.test(module.context)
          },
          chunks: 'all',
          enforce: true
        },
        globalStyles: {
          name: 'global',
          test: (module, chunks, entry = 'foo') => {
            return module.constructor.name === 'CssModule' && /styles/.test(module.context)
          },
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}