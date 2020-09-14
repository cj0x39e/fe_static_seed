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
const constants = require('./constants')

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

      if (process.env.NODE_ENV === 'development') {
        $('head').append(`
          <link rel="stylesheet" href="./${constants.COMMON_STYLES}.css" />
          <link rel="stylesheet" href="./${constants.UI_COMPONENTS}.css" />
          <link rel="stylesheet" href="./${pageName}.css" />
        `)

        // add vue init container
        // $('body').prepend('<div id="app"></div>')
        $('body').prepend('<!--vue-ssr-outlet-->')
        
        //  webpack bug, 抽取 css 产生的多余的 js 需要引入
        // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/85
        $('#app').after(`
          <!--开发环境框架使用，无需关注-->
          <script src="./${constants.COMMON_STYLES}.js"></script>
          <script src="./${constants.UI_COMPONENTS}.js"></script>
          <script src="./${pageName}.js"></script>
          <!--/开发环境框架使用，无需关注-->
        `)

        // 需要放在 body 的最后
        $('body').append(`<script src="./${pageName}.es5.js"></script>`)
      }

      if (process.env.NODE_ENV === 'production') {
        $('head').append(`
          <link rel="stylesheet" href="./css/${constants.COMMON_STYLES}.css" />
          <link rel="stylesheet" href="./css/${constants.UI_COMPONENTS}.css" />
          <link rel="stylesheet" href="./css/${pageName}.css" />
        `)

        // https://ssr.vuejs.org/zh/guide/#using-a-page-template
        $('body').prepend('<!--vue-ssr-outlet-->')
        $('body').append(`<script src="./js/${pageName}.es5.js"></script>`)
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