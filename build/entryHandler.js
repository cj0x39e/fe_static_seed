/**
 * 生成入口文件
 */
const fs = require('fs').promises;
const path = require('path')
const { tempDir, pagesDir, entryFileName } = require('./utils/common')


module.exports = async function (options) {
  const { pageName } = options

  let entryCode = `
    import '~/common-styles/main.scss'
    import Vue from 'vue'
    import App from '~/pages/${pageName}/${pageName}.vue'
    import '~/pages/${pageName}/${pageName}.es5.js'
  `

  if (process.env.NODE_ENV === 'development') {
    entryCode += `
      new Vue({
        render: h => h(App)
      }).$mount('#app')
    `
  }

  if (process.env.NODE_ENV === 'production') {
    entryCode += `
    export default function createApp (context) {
      return new Vue({
        render: h => h(App)
      })
    }
    `
  }

  try {
    await fs.writeFile(entryFileName, entryCode, 'utf-8')
  } catch(err) {
    throw err
  }
}