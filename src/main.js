import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './utils/http'
import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueCropper from 'vue-cropper'
import VueLazyload from 'vue-lazyload'
require('./mock/index.js')


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.use(VueCropper);
Vue.use(VueLazyload ,{
  error: 'dist/error.png',
  // loading: 'https://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif',
})

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
