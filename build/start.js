/**
 * 启动脚本
 */

const fs = require('fs')
const pageUtil = require('./utils/page')
const printer = require('./utils/printer')
const config = require('./utils/config')
const layoutsHandler = require('./layoutsHandler')
const entryHandler = require('./entryHandler')


async function  main () {
  printer.info('') // 打印 banner
  // const pageName = pageUtil.getViewName(process.argv)
  const pageName = 'test'

  await config.setConfigByKey('pageName', pageName)
  // console.log(await config.getConfigByKey('pageName'))
  
  await layoutsHandler()

  await entryHandler({
    pageName
  })
  // console.log(viewName)
}

main()

// console.log(process.argv.indexOf('-v'))