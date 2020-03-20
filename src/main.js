import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // CSS样式重置
import '@/styles/index.scss' // global css

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  const {
    mockXHR
  } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')