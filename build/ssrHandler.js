const path = require('path')
const fs = require('fs')
const pretty = require('pretty')
const { createBundleRenderer } = require('vue-server-renderer')
const { distDir, tempDir } = require('./utils/common')
const config = require('./utils/config')

module.exports = function () {
  const bundlePath = path.join(distDir, 'vue-ssr-server-bundle.json')

  const renderer = createBundleRenderer(bundlePath, {
    template: fs.readFileSync(path.join(tempDir, '/index.html'), 'utf-8')
  })

  const context = {};
  renderer.renderToString(context, async(err, html) => {
    if (err) throw err

    const pageName = config.getConfigByKey('pageName')
    const htmlPath = path.join(distDir, `${pageName}.html`)
    
    fs.writeFileSync(htmlPath, pretty(html), 'utf-8')
  })
}
