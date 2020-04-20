import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'

import 'normalize.css/normalize.css' // CSS样式重置
import '@/styles/index.scss' // global css
import filter from "@/filters";
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
});

import customComponents from './utils/customComponents.js'
Vue.use(customComponents)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')