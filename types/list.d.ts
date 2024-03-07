import type { RouteMeta } from 'vue-router'
import { Component } from 'vue'

export interface MenuButton {
  buttonId: string | number
  buttonName: string
}

export interface Menu {
  path: string

  name: string
  // 父级路径
  parentPath?: string

  redirect?: string

  orderNo?: number

  children?: Menu[]

  meta?: RouteMeta
  // 按钮权限
  rights?: MenuButton[]

  hideMenu?: boolean

  noKeepAlive?: boolean

  fixedTab?: boolean
}

export interface DropMenu {
  icon?: Component
  event: string | number
  text: string
  disabled?: boolean
  divided?: boolean
}
