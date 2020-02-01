import Vue from 'vue';
import VueRouter from 'vue-router';

import Notfound from '@/views/Admin/404.vue';
import Register from '@/views/Admin/Register.vue';
import Login from '@/views/Admin/login.vue';

// import Home from '@/views/Home.vue';
import adminRouter from '@/router/admin';
import userRouter from '@/router/user';

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use (VueRouter);

const routes = [
  adminRouter,
  userRouter,

  {
    path: '*',
    name: '/404',
    component: Notfound,
  },

  {
    path: '/admin/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/admin/login',
    name: 'login',
    component: Login,
  },

  // {
  //   path: '/',
  //   redirect: '/index',
  // },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];


const router = new VueRouter ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
