export default {
    path: '/',
    component: resolve => require(['@/views/User/Home.vue'], resolve),
    children: [{
        path: '/',
        component: resolve => require(['@/views/User/Index.vue'], resolve)
        // component: Index
    },
    {
        path: 'UploadVideo',
        component: resolve => require(['@/views/User/UploadVideo.vue'], resolve)
        // component: UploadVideo
    },
    {
        path: 'express',
        component: resolve => require(['@/views/User/Express_select.vue'], resolve)
    },
    {
        path: 'money',
        component: resolve => require(['@/views/User/Money.vue'], resolve)
    },
    {
        path: 'login',
        component: resolve => require(['@/views/User/Login.vue'], resolve)
    },
    {
        path: 'register',
        component: resolve => require(['@/views/User/Register.vue'], resolve)
    },
    {
        path: 'index',
        component: resolve => require(['@/views/User/Index.vue'], resolve)
    },
    {
        path: 'detail/:id',
        component: resolve => require(['@/views/User/Detail.vue'], resolve)
    },
    {
        path: 'cart',
        component: resolve => require(['@/views/User/Cart.vue'], resolve)
    },
    {
        path: 'order',
        component: resolve => require(['@/views/User/Order.vue'], resolve)
    },
    {
        path: 'Question',
        component: resolve => require(['@/views/User/Question.vue'], resolve)
    },
    {
        path: 'Product',
        component: resolve => require(['@/views/User/Product.vue'], resolve)
    },
    {
        path: 'Qualifications',
        component: resolve => require(['@/views/User/Qualifications.vue'], resolve)
    },
    {
        path: 'Resources',
        component: resolve => require(['@/views/User/Resources.vue'], resolve)
    }
    ,
    {
        path: 'Market',
        component: resolve => require(['@/views/User/Market.vue'], resolve)
    }
    ,
    {
        path: 'Video',
        component: resolve => require(['@/views/User/Video.vue'], resolve)
    },    
    {
        path: 'Video_detail/:id/:sort',
        component: resolve => require(['@/views/User/Video_detail.vue'], resolve)
    }
    ,    
    {
        path: 'Person',
        component: resolve => require(['@/views/User/Person.vue'], resolve)
    }
    ]
}