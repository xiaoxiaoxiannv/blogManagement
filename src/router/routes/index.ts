import { AddRouteRecordRaw } from '../types'
import { LOGIN_ROUTE, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE, ERROR_PAGE } from './basic'
import { EXTERNAL_PAGES } from './external'
import { asyncRoutes as syncRoutes } from './modules/index'

// 根路由
export const RootRoute: AddRouteRecordRaw = {
  path: '/',
  name: 'Root',
  // redirect: '/home',
  redirect: '/article',
  meta: {
    title: 'Root'
  }
}

export const basicRoutes: Array<AddRouteRecordRaw> = [
  RootRoute,
  LOGIN_ROUTE,
  ERROR_PAGE,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  ...EXTERNAL_PAGES
]

export const asyncRoutes = syncRoutes
