/**
 * 启动脚本
 */

const fs = require('fs')
const viewUtil = require('./utils/view')
const printer = require('./utils/printer')


function main () {
  const viewName = viewUtil.getViewName(process.argv)
  console.log(viewName)
}

main()

// console.log(process.argv.indexOf('-v'))