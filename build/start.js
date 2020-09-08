/**
 * 启动脚本
 */
const path = require('path')
const shellEnhance = require('./utils/shellEnhance');

 const frontTask = require('./frontTask');

 (async () => {

  await frontTask()
 
})()