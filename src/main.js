import Vue from 'vue'
import 'vueui-widgets/dist/index.css'
import VueUI from 'vueui-widgets'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
Vue.prototype.axios = axios
Vue.use(VueUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
