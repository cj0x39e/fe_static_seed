

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
        commonStyles: {
          name: 'common',
          test: (module, chunks, entry = 'foo') => {
            return module.constructor.name === 'CssModule' && /common-styles/.test(module.context)
          },
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}