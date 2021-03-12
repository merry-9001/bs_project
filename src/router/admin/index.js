export default {
  path: '/admin/index',
  component: resolve => require(['@/views/Admin/index.vue'], resolve),
  children: [
    {
      path: '',
      component: resolve => require(['@/views/Admin/Home.vue'], resolve),
    },
    {
      path: '/admin/home',
      name: 'home',
      component: resolve => require(['@/views/Admin/Home.vue'], resolve),
    },
    {
      path: '/admin/PersonUserState',
      name: 'PersonUserState',
      component: resolve => require(['@/components/Admin/PersonUserState.vue'], resolve),
    },
    {
      path: '/admin/infoshow',
      name: 'infoshow',
      component: resolve => require(['@/views/Admin/InfoShow.vue'], resolve),
    },
    {
      path: '/admin/fundlist',
      name: 'fundlist',
      component: resolve => require(['@/views/Admin/FoundList.vue'], resolve),
    },
    {
      path: '/admin/fundlist2',
      name: 'fundlist',
      component: resolve => require(['@/views/Admin/FoundList2.vue'], resolve),
    },    {
      path: '/admin/fundlist3',
      name: 'fundlist',
      component: resolve => require(['@/views/Admin/FoundList3.vue'], resolve),
    },
    
    {
      path: '/admin/PersonCustom',
      component: resolve => require(['@/components/Admin/PersonCenter.vue'], resolve),
  },
  {
    path: '/admin/PersonLogo',
    component: resolve => require(['@/components/Admin/PersonLogo.vue'], resolve),
},
  {
    path: '/admin/PersonCustom',
    component: resolve => require(['@/components/Admin/PersonCenter.vue'], resolve),
},
  {
    path: '/admin/PersonDatabse',
    component: resolve => require(['@/components/Admin/PersonDatabse.vue'], resolve),
},
{
  path: '/admin/PersonVideo',
  component: resolve => require(['@/components/Admin/PersonVideo.vue'], resolve),
},
  {
      path: '/admin/Order',
      component: resolve => require(['@/views/Admin/Order.vue'], resolve),
  },
  {
      path: '/admin/question',
      component: resolve => require(['@/views/Admin/Question.vue'], resolve),
  },
  {
      path: '/admin/user',
      component: resolve => require(['@/views/Admin/User.vue'], resolve),
  },
  {
      path: '/admin/apply',
      component: resolve => require(['@/views/Admin/Apply.vue'], resolve),
  }
  ],
};