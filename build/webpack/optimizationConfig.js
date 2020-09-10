const constants = require('../constants')

/**
 * 分离样式到单个文件
 */

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        uiComponentsStyles: {
          name: constants.UI_COMPONENTS,
          test: (module, chunks, entry) => {
            return module.constructor.name === 'CssModule' && (new RegExp(constants.UI_COMPONENTS)).test(module.context)
          },
          chunks: 'all',
          enforce: true
        },
        commonStyles: {
          name: constants.COMMON_STYLES,
          test: (module, chunks, entry) => {
            return module.constructor.name === 'CssModule' && (new RegExp(constants.COMMON_STYLES)).test(module.context)
          },
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}
