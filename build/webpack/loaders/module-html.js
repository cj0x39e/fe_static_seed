const fs = require('fs')
const path = require('path')
const requireFromString = require('require-from-string')
const replaceVueClassToCssModule = require('./replaceVueClassToCssModule')

module.exports = function(templateSource) {
  const loaderContext = this
  const callback = loaderContext.async()
  const resourcePathMap = path.parse(this.resourcePath)

  const normalCallback = () => {
    callback(null, templateSource)
  }

  // 非 vue 模板直接输出
  if (resourcePathMap.ext !== '.vue') {
    normalCallback()
  } else {
    const fileName = resourcePathMap.name
    const cssPath = path.resolve(this.context, `./${fileName}.module.scss`)
    fs.access(cssPath, fs.constants.F_OK, (err) => {
      // 不存在对应的模块样式文件直接输出
      if (err) {
        normalCallback()

      // 存在样式文件，导入样式文件，并替换 class
      } else {
        this.loadModule(cssPath, function(err, source, sourceMap, module) {
          if (err) throw err

          const styles = requireFromString(source)

          let code = templateSource
          code = Object.keys(styles).reduce((template, className) => {
            return replaceVueClassToCssModule(className, styles[className], template)
          }, templateSource)

          callback(null, code)
        })
      }
    })
  }
}
