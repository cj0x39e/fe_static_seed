/**
 * layouts 布局模板处理
 */
const fs = require('fs')
const path = require('path')
const ejs = require('ejs');
const cheerio = require('cheerio');
const { tempDir } = require('./utils/common')
const printer = require('./utils/printer')
const config = require('./utils/config')

const filename = path.resolve(__dirname, '../src/layouts/index.ejs')
const data = {}
const options = {
  root: path.resolve(__dirname, '../src/layouts/')
}

module.exports = function (data) {

  return new Promise((resolve) => {
    ejs.renderFile(filename, data, options, async function(err, str){
      if (err) throw err;
      
      const pageName = config.getConfigByKey('pageName')
      const $ = cheerio.load(str)

      $('head').append('<link rel="stylesheet" href="./common.css" />')
      $('head').append('<link rel="stylesheet" href="./ui-components.css" />')
      $('head').append(`<link rel="stylesheet" href="./${pageName}.css" />`)
      // $('head').append(`<link rel="stylesheet" href="./${pageName}.css" />`)

      if (process.env.NODE_ENV === 'development') {
        // add vue init container
        $('body').prepend('<div id="app"></div>')
        
        //  webpack bug, 抽取 css 产生的多余的 js 需要引入
        // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/85
        $('#app').after(`
          <!--webpack use-->
          <script src="./ui-components.js"></script>
          <script src="./common.js"></script>
          <!--/webpack use-->
          <script src="./${pageName}.js"></script>
        `)
        $('body').append(`<script src="./${pageName}.es5.js"></script>`)
      }

      if (process.env.NODE_ENV === 'production') {
        // https://ssr.vuejs.org/zh/guide/#using-a-page-template
        $('body').prepend('<!--vue-ssr-outlet-->')
      }

      str = $.html()
  
      try {
        const filePath = path.join(tempDir, '/index.html')
        fs.writeFileSync(filePath, str, 'utf8')
        resolve([null, null])
      } catch (err) {
        throw err
      }
    });
  })
}