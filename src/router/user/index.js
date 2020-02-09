import Home from '@/views/User/Home.vue'
import Login from '@/views/User/Login.vue'
import Register from '@/views/User/Register.vue'
import Index from '@/views/User/Index.vue'
import Detail from '@/views/User/Detail.vue'
import Cart from '@/views/User/Cart.vue'
import Order from '@/views/User/Order.vue'
import Question from '@/views/User/Question.vue'
import Product from '@/views/User/Product.vue'
import Qualifications from '@/views/User/Qualifications.vue'
import Resources from '@/views/User/Resources.vue'
import Market from '@/views/User/Market.vue'
import Video from '@/views/User/Video.vue'
import Video_detail from '@/views/User/Video_detail.vue'
import Person from '@/views/User/Person.vue'
export default {
    path: '/',
    component: Home,
    children: [{
        path: '/',
        component: Index
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'index',
        component: Index
    },
    {
        path: 'detail/:id',
        component: Detail
    },
    {
        path: 'cart',
        component: Cart
    },
    {
        path: 'order',
        component: Order
    },
    {
        path: 'Question',
        component: Question
    },
    {
        path: 'Product',
        component: Product
    },
    {
        path: 'Qualifications',
        component: Qualifications
    },
    {
        path: 'Resources',
        component: Resources
    }
    ,
    {
        path: 'Market',
        component: Market
    }
    ,
    {
        path: 'Video',
        component: Video
    },    
    {
        path: 'Video_detail/:id/:sort',
        component: Video_detail
    }
    ,    
    {
        path: 'Person',
        component: Person
    }
    ]
}