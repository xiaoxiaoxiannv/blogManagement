import type { Router, RouteRecordRaw } from 'vue-router'
import { useUserStoreOther } from '@/store/modules/user'
import { asyncRoutes } from '../routes/modules'
import { flatMultiRoutes } from '@/hooks/route'
import { EXTERNAL_PAGES } from '../routes/external'
import { router } from '@/router';
// import { usePermissionStore } from '@/store/modules/permission'

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreOther()

  router.beforeEach(async (to, from, next) => {
    // 外部页不校验直接跳
    if (EXTERNAL_PAGES.find((page) => page.name === to.name)) {
      next()
      return
    }
    const token = 'fake token ========='
    // 判断登录页
    if (to.path === '/login') {
      // 阻止地址栏跳转
      if (token) {
        next((to.query?.redirect as string) || '/')
        return
      }
      next()
      return
    }

    // token不存在重定向
    if (!token) {
      const redirectData: {
        path: string
        replace: boolean
        query?: Record<string, string>
      } = {
        path: '/login',
        replace: true
      }
      redirectData.query = {
        ...redirectData.query,
        redirect: to.path
      }
      next(redirectData)
      return
    }

    if (userStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    // 页面刷新重新添加动态路由
    // const { buildRoutes } = usePermissionStore()
    // const asyncRoutes = await buildRoutes()
    const routes = flatMultiRoutes(asyncRoutes as RouteRecordRaw[])
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })
    userStore.setIsDynamicAddedRoute(true)

    if (to.name === 'PageNotFound') {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      console.log('toPageNotFound')
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}
