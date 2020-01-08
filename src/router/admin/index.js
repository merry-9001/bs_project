import Index from '@/views/Admin/index.vue';
import Home from '@/views/Admin/Home.vue';
import InfoShow from '@/views/Admin/InfoShow.vue';
import FoundList from '@/views/Admin/FoundList.vue';
export default {
  path: '/admin/index',
  component: Index,
  children: [
    {
      path: '',
      component: Home,
    },
    {
      path: '/admin/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/admin/infoshow',
      name: 'infoshow',
      component: InfoShow,
    },
    {
      path: '/admin/fundlist',
      name: 'fundlist',
      component: FoundList,
    },
  ],
};

// const router = new Router({
//     mode: 'history',
//     base: process.env.BASE_URL,
//     routes: [{
//             path: '/index',
//             component: Index,
//             children: [{
//                     path: '',
//                     component: Home
//                 },
//                 {
//                     path: '/home',
//                     name: 'home',
//                     component: Home
//                 },
//                 {
//                     path: '/infoshow',
//                     name: 'infoshow',
//                     component: InfoShow
//                 },
//                 {
//                     path: '/fundlist',
//                     name: 'fundlist',
//                     component: FoundList
//                 }
//             ]
//         }
//     ]
// });

// router.beforeEach((to, from, next) => {
//     const isLogin = localStorage.eleToken ? true : false;
//     if (to.path == '/login' || to.path == '/register') {
//         next();
//     } else {
//         isLogin ? next() : next('/login');
//     }
// })
// export default router;
