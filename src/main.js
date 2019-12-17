import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './utils/http'
import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$message = (options = {}) => {
  const { isSingle } = options
  if (isSingle) {
    const messageCounts = document.getElementsByClassName('el-message').length
    messageCounts === 0 && Message(options)
  } else {
    Message(options)
  }
}


Vue.prototype.$http = http;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
