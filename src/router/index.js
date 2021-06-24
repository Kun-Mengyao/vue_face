import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'

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

export default router
