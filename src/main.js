import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import Home from './components/Home'
import Login from './components/Login'
import './assets/css/global.css'
import axios from 'axios'
import './assets/css/video.css'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

axios.defaults.baseURL = 'http://127.0.0.1:8000/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/login',
    component: Login
  }, {
    path: '/home',
    component: Home
  }, {
    path: '*',
    component: Home
  }]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
