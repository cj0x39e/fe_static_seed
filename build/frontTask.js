/**
 * 编译前置任务
 */

const fs = require('fs')
const pageUtil = require('./utils/page')
const printer = require('./utils/printer')
const config = require('./utils/config')
const layoutsHandler = require('./layoutsHandler')
const entryHandler = require('./entryHandler')


module.exports = async function main () {
  printer.info('') // 打印 banner
  // const pageName = pageUtil.getViewName(process.argv)
  const pageName = 'download'

  config.setConfigByKey('pageName', pageName)
  
  await layoutsHandler()

  await entryHandler({
    pageName
  })
}