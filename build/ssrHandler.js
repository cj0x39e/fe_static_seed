const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

const renderer = createBundleRenderer(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'), {
  // ……renderer 的其他选项
})

const context = {};
renderer.renderToString(context, (err, html) => {
  console.log(html)
})

console.log('okkk')