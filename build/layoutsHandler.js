/**
 * layouts 布局模板处理
 */
const fs = require('fs')
const path = require('path')
const ejs = require('ejs');
const printer = require('./utils/printer')

const filename = path.resolve(__dirname, '../src/layouts/index.ejs')
const data = {}
const options = {
  root: path.resolve(__dirname, '../src/layouts/')
}

module.exports = function (data) {

  return new Promise((resolve) => {
    ejs.renderFile(filename, data, options, function(err, str){
      if (err) throw err;
  
      try {
        const filePath = path.resolve(__dirname, '../static/index.html')
        fs.writeFileSync(filePath, str, 'utf8')
        resolve([null, null])
      } catch (err) {
        throw err
      }
    });
  })
}