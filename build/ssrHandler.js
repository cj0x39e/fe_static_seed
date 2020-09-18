const path = require('path')
const fs = require('fs')
// const pretty = require('pretty')
const { createBundleRenderer } = require('vue-server-renderer')
const { distDir, tempDir } = require('./utils/common')

module.exports = function () {
  
  const bundlePath = path.join(distDir, 'vue-ssr-server-bundle.json')
  const renderer = createBundleRenderer(bundlePath, {
    template: fs.readFileSync(path.join(tempDir, '/layout.html'), 'utf-8')
  })

  const context = {};
  renderer.renderToString(context, (err, html) => {
    if (err) throw err

    const htmlPath = path.join(tempDir, `index.html`)
    
    fs.writeFileSync(htmlPath, html, 'utf-8')
  })
}
