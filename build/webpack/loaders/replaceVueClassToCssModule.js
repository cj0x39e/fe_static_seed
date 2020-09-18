const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

// vue 模板 class 转换为 module css 工具函数

// ↓---TODO ---↓
// 1. vue class 模板字符串解析
// 1. vue class 数组语法

const getVueClassStr = (originStr, className, moduleClassName) => {
  let str = originStr
  // 对象的写法
  if (/^\s*\{/.test(originStr)) {
    // 使对象解析为对象语句
    const astStr = `(${originStr})`
    const ast = parser.parse(astStr)
    traverse(ast, {
      ObjectProperty: ({ node }) => {
        const keyNode = node.key
        // 字符串写法 {'className': true}
        if (
          keyNode.type === 'StringLiteral' &&
          keyNode.value === className
        ) {
          keyNode.value = moduleClassName
        // 正常写法 {className: true}
        } else if (
          keyNode.type === 'Identifier' &&
          keyNode.name === className
        ) {
          keyNode.name = `'${moduleClassName}'`
        }
      }
    })
    const { code } = babel.transformFromAstSync(ast, null, {
      retainLines: true, // 不添加换行
      compact: true // 不保留空格
    })
    str = code.substring(1, code.length - 2) // 去掉自动生成的括号和分号 (需要的代码);
    str = str.replace(/"/g, "'") // 转换双引号为单引号
  // 数组的写法
  } else if (/^\s*\[/.test(originStr)) {
    // TODO 暂不解析数组写法
  // 字符串
  } else {
    // 字符串语法理论上返回的是 ''xx''，需要去除多余的首尾引号
    // 返回的时候需要加上
    const cleanStr = originStr.substring(1, originStr.length - 1)

    const classList = cleanStr.split(/\s+/)
    str = classList.map(name => name === className ? moduleClassName : name).join(' ')
    str = "'" + str + "'"
  }

  return str
}

const replaceVueClassToCssModule = (className, moduleClassName, html) => {
  const reg = new RegExp(`(?:class|\:class)=\"(.*?)\"`, 'g')

  const resultHtml = html.replace(reg, function(replacement, $1) {
    // 不包含 class 的直接返回匹配语句
    if (!$1.includes(className)) return replacement

    let str = $1
    // vue class
    if (/:class/.test(replacement)) {
      str = getVueClassStr($1, className, moduleClassName)
    // 原生 class
    } else {
      const classList = $1.split(/\s+/)
      str = classList.map(name => name === className ? moduleClassName : name).join(' ')
    }

    return str === $1 ? replacement : replacement.replace($1, str)
  })

  return resultHtml
}

module.exports = replaceVueClassToCssModule
