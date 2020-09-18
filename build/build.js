/**
 * 编译脚本
 */
const path = require('path')
 const webpack = require('webpack') 
const buildConfig = require('./webpack/webpack.build')
const ssrConfig = require('./webpack/webpack.ssr')
const frontTask = require('./frontTask');

 
async function main () {
  await frontTask()

  const startBuild = () => {
    const buildCompiler = webpack(buildConfig)
    buildCompiler.run((err, stats) => {
      if (err) throw err
    })
  }

  // ssr 
  const ssrCompiler = webpack(ssrConfig)
  ssrCompiler.run((err, stats) => {
    if (err) throw err
    startBuild()
  })
}

main()