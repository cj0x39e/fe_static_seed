/**
 * 启动脚本
 */
const webpack = require('webpack') 
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const shellEnhance = require('./utils/shellEnhance');
const devConfig = require('./webpack/webpack.dev')
const ssrConfig = require('./webpack/webpack.ssr')

 const frontTask = require('./frontTask');

 (async () => {

  await frontTask()

  const startDev = () => {
    // dev server
    const devCompiler = webpack(devConfig)
    const server = new WebpackDevServer(devCompiler, devConfig.devServer);
    server.listen(devConfig.devServer.port, devConfig.devServer.host, () => {
      console.log('Starting server on http://localhost:1024');
    });
  }

  // ssr 
  let isStartDev = false
  const ssrCompiler = webpack(ssrConfig)
  ssrCompiler.watch({}, (err, stats) => {
    if (!isStartDev) {
      isStartDev = true
      startDev()
    }
    console.log('ssr build')
  })
})()