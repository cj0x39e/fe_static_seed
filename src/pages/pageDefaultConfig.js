/**
 * 页面默认配置文件
 */

module.exports = {
  title: '[页面标题]',
  head: {
    content: `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
      <link rel="stylesheet" href="./css/lib/normalize.css">
      <link rel="stylesheet" href="./css/lib/vant_2.10.css">
    `
  },
  bodyScript: {
    content: `
      <script src="./js/lib/zepto.min.js"></script>
      <script src="./js/lib/vue.js"></script>
      <script src="./js/lib/vant_2.10.min.js"></script>
    `
  }
}
