/**
 * 编译脚本
 */
const path = require('path')
const shellEnhance = require('./utils/shellEnhance');

 const frontTask = require('./frontTask');

 (async () => {

  await frontTask()

  const configPath = path.join(__dirname, './webpack/webpack.build.js');
  shellEnhance.exec(`npx cross-env NODE_ENV=production  webpack --config ${configPath}`, () => {})

  const ssrConfigPath = path.join(__dirname, './webpack/webpack.ssr.js');
  shellEnhance.exec(`npx cross-env NODE_ENV=production  webpack --config ${ssrConfigPath}`, () => {})
 })()