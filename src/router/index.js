import Vue from 'vue';
import VueRouter from 'vue-router';
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
    component: resolve => require(['@/views/Admin/404.vue'], resolve),
  },

  {
    path: '/admin/register',
    name: 'register',
    component: resolve => require(['@/views/Admin/Register'], resolve),
  },
  {
    path: '/admin/login',
    name: 'login',
    component: resolve => require(['@/views/Admin/login'], resolve),
  },
];


const router = new VueRouter ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
