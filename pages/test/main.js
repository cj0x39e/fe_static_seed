import Vue from 'vue'
import App from './test.vue'

// new Vue({
//   el: '#app',
//   render: h => h(App),
//   mounted () {
//     // You'll need this for renderAfterDocumentEvent.
//     document.dispatchEvent(new Event('render-event'))
//   }
// })

export default context => {
  const app = new Vue({
    render: h => h(App)
  })

  return app
}