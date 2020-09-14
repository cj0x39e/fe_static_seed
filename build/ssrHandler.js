const path = require('path')
const fs = require('fs')
const pretty = require('pretty')
const { createBundleRenderer } = require('vue-server-renderer')
const { distDir, tempDir } = require('./utils/common')
const config = require('./utils/config')

// MemoryFS
// https://juejin.im/post/6844903693373046792

module.exports = function () {
  
  const bundlePath = path.join(distDir, 'vue-ssr-server-bundle.json')
  const renderer = createBundleRenderer(bundlePath, {
    template: fs.readFileSync(path.join(tempDir, '/index.html'), 'utf-8')
  })

  const context = {};
  renderer.renderToString(context, (err, html) => {
    console.error('err', err)
    if (err) throw err

    const pageName = config.getConfigByKey('pageName')
    const htmlPath = path.join(distDir, `${pageName}.html`)
    
    fs.writeFileSync(htmlPath, pretty(html), 'utf-8')
  })
}
