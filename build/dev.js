/**
 * 启动脚本
 */

const fs = require('fs')
const pageUtil = require('./utils/page')
const printer = require('./utils/printer')
const layoutsHandler = require('./layoutsHandler')
const entryHandler = require('./entryHandler')


async function  main () {
  // const pageName = pageUtil.getViewName(process.argv)
  
  await layoutsHandler()

  await entryHandler({
    pageName: 'test'
  })
  // console.log(viewName)
}

main()

// console.log(process.argv.indexOf('-v'))