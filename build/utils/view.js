const printer = require('./printer')

/**
 * 通过命令行获取编译页面参数
 */
const getViewName = (argv) => { 
  const viewFlag = ['-v', '--view']
  let name = null

  let flagIndex = -1
  for (let i = 0; i < viewFlag.length; i++) {
    flagIndex = argv.indexOf(viewFlag[i])
    if (flagIndex !== -1) {
      name = argv[flagIndex + 1] || null
      break
    }
  }

  if (name === null) {
    printer.error('请使用 -v [view name] 或者 --view [view name] 指定编译页面！')
    process.exit(0)
  }

  return name
}


module.exports = {
  getViewName
}
