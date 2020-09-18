const loaderUtils = require('loader-utils')
const path = require('path')
const fs = require('fs')
const requireFromString = require('require-from-string')
const replaceVueClassToCssModule = require('./replaceVueClassToCssModule')

module.exports = function (code) {
  const loaderContext = this
  const callback = loaderContext.async()
  const resourcePathMap = path.parse(loaderContext.resourcePath)

  // 存在 resourceQuery 的时候，说明是第二次进 vue loader
  // 此时只对 type 为 templdate 的模板处理
  let type = null
  if (this.resourceQuery) {
    const params = loaderUtils.parseQuery(this.resourceQuery);
    type = params.type
    if (type && type !== 'template') {
      callback(null, code)
      return
    }
  }
  

  const fileName = resourcePathMap.name
  const cssPath = path.resolve(this.context, `./${fileName}.module.scss`)
  fs.access(cssPath, fs.constants.F_OK, (err) => {
    // 不存在对应的模块样式文件直接输出
    if (err) {
      callback(null, code)
    } else {
      // 对模板的 class 使用 module css 进行替换
      if (type === 'template') {
        this.loadModule(cssPath, function(err, source) {
          if (err) throw err

          const styles = requireFromString(source)

          let result = code
          result = Object.keys(styles).reduce((template, className) => {
            return replaceVueClassToCssModule(className, styles[className], template)
          }, result)

          callback(null, result)
        })
      } else {
        // 添加导入样式文件
          code = `
          import './${fileName}.module.scss'
          ${code}
        `
        // 替换 vue template 的语言为 module-css-html，交给该 loader 处理
        code = code.replace(/type=template/, 'type=template&lang=module-css-html')

        callback(null, code)
      }
    }
  })
}