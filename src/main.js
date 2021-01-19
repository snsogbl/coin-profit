import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'lib-flexible'

import ajax from './assets/js/ajax'
import apiUrl from './assets/js/api-url'

import './assets/sass/_common.scss';
import './assets/theme/index.css'
import './assets/sass/reset/_reset.scss';
// import './assets/sass/fonts/common/1.0.0/_common.scss';
import '../static/fonts/common/1.0.0/iconfont.css'
// import '../static/fonts/module/1.0.0/iconfont.css'

Vue.use(ElementUI);

Vue.config.productionTip = false
window.bus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount("#jApp")