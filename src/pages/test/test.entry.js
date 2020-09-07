import Vue from 'vue'
import App from './test.vue'
import './test.es5.js'


// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
// export default function createApp () {
//   const app = new Vue({
//     // 根实例简单的渲染应用程序组件。
//     render: h => h(App)
//   })
//   return app
// }

new Vue({
  render: h => h(App)
}).$mount('#app')