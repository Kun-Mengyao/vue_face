import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'

Vue.use(Router)

const router = new Router({
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
