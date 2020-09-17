const fs = require('fs')
const path = require('path')
const requireFromString = require('require-from-string')
const replaceVueClassToCssModule = require('./replaceVueClassToCssModule')

module.exports = function(templateSource) {
  const loaderContext = this
  const callback = loaderContext.async()
  const resourcePathMap = path.parse(this.resourcePath)
  const loaders = this.loaders

  let code = `
    const template = \`${templateSource}\`;
  `
  const normalCallback = () => {
    code += `
      \nexport default template
    `
    callback(null, code)
  }

  // 不是 vue 模板，直接输出
  if (resourcePathMap.ext !== '.vue') {
    normalCallback()
  } else {
    const fileName = resourcePathMap.name
    const cssPath = path.resolve(this.context, `./${fileName}.scss`)
    fs.access(cssPath, fs.constants.F_OK, (err) => {
      // 不存在对应的模块样式文件直接输出
      if (err) {
        normalCallback()

      // 存在样式文件，导入样式
      } else {
        code = `
          import style from './${fileName}.scss';
          debugger
          \nexport default '<div>test</div>'
        `
        // ${code}
        // normalCallback()
        callback(null, code)
      }
    })
  }
}
