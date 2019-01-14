// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ajax from './configs/ajax'
import wxajax from './configs/wxajax'
import winInfo from './configs/tools'
import usefulFn from './configs/usefulFn'
import deconsole from './configs/deconsole'
import adaptive from 'adaptive.js'
import axios from 'axios'
import echarts from 'echarts'

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css';
import anime from 'animejs'

Vue.config.productionTip = false;

//移动端自适应
adaptive.desinWidth = 750;
adaptive.baseFont = 24;
adaptive.scaleType = 1;
adaptive.init();

Vue.prototype.$myhttp=ajax;
Vue.prototype.$mywxhttp=wxajax;
Vue.prototype.$winInfo=winInfo;
Vue.prototype.$usefulFn=usefulFn;
Vue.prototype.$deconsole=deconsole;
//作为中央事件处理器使用（注意$on需要在beforedestroy中使用$off移除，不然会触发多次）
Vue.prototype.$bus=new Vue();

axios.defaults.baseURL = 'http://localhost:8080/';
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios=axios;

//年/月
Vue.filter('dealtime', function (value) {
  if (!value) return ''
  value = value.toString()
  let nowTime = new Date(value);
  return (nowTime.getMonth() + 1) + '月' + nowTime.getDate() + '日'
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
