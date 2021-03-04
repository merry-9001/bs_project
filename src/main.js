import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'

import axios from './http.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import './assets/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/display.css';
Vue.use(vueSwiper);

import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video

import echarts from 'echarts'
 
Vue.prototype.$echarts = echarts


window.router=router;
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
