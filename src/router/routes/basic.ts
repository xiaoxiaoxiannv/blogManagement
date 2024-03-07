import { AddRouteRecordRaw } from '../types'
const Layout = () => import('@/layout/index.vue')

export const LOGIN_ROUTE: AddRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "Login" */ '@/views/login/index.vue'),
  meta: {
    title: '登录'
  }
}

export const PAGE_NOT_FOUND_ROUTE: AddRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: Layout,
  meta: {
    title: 'ErrorPage',
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'PageNotFound',
      component: () => import(/* webpackChunkName: "PageNotFound" */ '@/views/error/404.vue'),
      meta: {
        title: 'ErrorPage',
        hideMenu: true
      }
    }
  ]
}

export const REDIRECT_ROUTE: AddRouteRecordRaw = {
  path: '/redirect',
  component: Layout,
  name: 'RedirectTo',
  meta: {
    title: 'Redirect'
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      component: () => import(/* webpackChunkName: "Redirect" */ '@/layout/redirect/index.vue'),
      meta: {
        title: 'Redirect'
      }
    }
  ]
}

export const ERROR_PAGE: AddRouteRecordRaw = {
  path: '/error',
  component: Layout,
  name: 'Error',
  redirect: '/error/404',
  meta: {
    title: 'Error',
    hideMenu: true
  },
  children: [
    {
      path: '404',
      name: 'PageNotFound',
      component: () => import(/* webpackChunkName: "PageNotFound" */ '@/views/error/404.vue'),
      meta: {
        title: 'PageNotFound',
        hideMenu: true
      }
    },
    {
      path: '403',
      name: '403',
      component: () => import(/* webpackChunkName: "403" */ '@/views/error/403.vue'),
      meta: {
        title: '403',
        hideMenu: true
      }
    },
    {
      path: '500',
      name: '500',
      component: () => import(/* webpackChunkName: "500" */ '@/views/error/500.vue'),
      meta: {
        title: '500',
        hideMenu: true
      }
    },
    {
      path: 'test',
      name: 'Test',
      component: () => import(/* webpackChunkName: "Test" */ '@/views/error/Test.vue'),
      meta: {
        title: 'Test',
        hideMenu: true
      }
    }
  ]
}

// export const ERROR_LOG_ROUTE: AddRouteRecordRaw = {
//   path: '/error-log',
//   name: 'ErrorLog',
//   component: Layout,
//   redirect: '/error-log/list',
//   meta: {
//     title: 'ErrorLog',
//     hideBreadcrumb: true,
//     hideMenu: true
//   },
//   children: [
//     {
//       path: 'list',
//       name: 'ErrorLogList',
//       component: () => import('@/views/error/404.vue'),
//       meta: {
//         title: 'ErrorLogList'
//       }
//     }
//   ]
// }
