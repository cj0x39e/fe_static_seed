const path = require('path')
const fs = require('fs')
const pretty = require('pretty')
// const cheerio = require('cheerio');
const htmlparser2 = require("htmlparser2");
const { createBundleRenderer } = require('vue-server-renderer')
const { distDir } = require('./utils/common')
const config = require('./utils/config')

const getTemplate = () => {
  const template = fs.readFileSync(path.resolve(__dirname, '../static/index.html'), 'utf-8')
  
}

const bundlePath = path.join(distDir, 'vue-ssr-server-bundle.json')
const renderer = createBundleRenderer(bundlePath, {
  template: fs.readFileSync(path.resolve(__dirname, '../static/index.html'), 'utf-8')
})

const context = {
  
};
renderer.renderToString(context, async(err, html) => {
  if (err) throw err

  const pageName = await config.getConfigByKey('pageName')
  const htmlPath = path.join(distDir, `${pageName}.html`)
  
  fs.writeFileSync(htmlPath, pretty(html), 'utf-8')
})
