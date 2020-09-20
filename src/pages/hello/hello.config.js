/**
 * 页面属性配置
 */

module.exports = {
  // 页面标题
  title: '你好，世界！',

  head: {
    // 页面头部插入的样式或脚本
    append: `
      <link rel="stylesheet" href="./css/lib/xx.css">
    `
  },
  bodyScript: {
    // 页面底部插入的样式或脚本
    append: `
      <script src="./js/lib/xx.js"></script>
    `
  }
}
