import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/menu',
    children: [{
      path: 'menu',
      name: 'menu',
      component: () => import('@/views/menu1/index'),
      meta: {
        title: '概览',
        icon: ''
      }
    }]
  },
  {
    path: '/menu2',
    component: Layout,
    redirect: '/menu2/menu2-1',
    name: 'menu2',
    meta: {
      title: '商品管理',
      icon: ''
    },
    children: [{
        path: 'menu2-1',
        name: 'menu2-1',
        component: () => import('@/views/menu2-1/index'),
        meta: {
          title: '商品分类',
          icon: ''
        }
      },
      {
        path: 'menu2-2',
        name: 'menu2-2',
        component: () => import('@/views/menu2-2/index'),
        meta: {
          title: '商品列表',
          icon: ''
        }
      },
      {
        path: 'menu2-2',
        name: 'menu2-2',
        component: () => import('@/views/menu2-2/index'),
        meta: {
          title: '评论列表',
          icon: ''
        }
      }
    ]
  },
  {
    path: '/menu3',
    component: Layout,
    children: [{
      path: 'menu3',
      name: 'menu3',
      component: () => import('@/views/menu3/index'),
      meta: {
        title: '广告管理',
        icon: ''
      }
    }]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router