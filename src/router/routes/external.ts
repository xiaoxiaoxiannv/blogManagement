import { AddRouteRecordRaw } from '../types'

export const EXTERNAL_PAGES: AddRouteRecordRaw[] = [
  {
    path: '/external/editform',
    name: 'EditForm',
    component: () =>
      import(/* webpackChunkName: "EditForm" */ '@/views/external/editForm/index.vue'),
    meta: {
      title: '编辑表单',
      hideMenu: true
    }
  }
]
