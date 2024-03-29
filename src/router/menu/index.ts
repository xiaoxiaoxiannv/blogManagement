import { treeMap } from '@/hooks/tree'
import { Menu } from '#/list'
import { routeToMenu } from './util'
import { asyncRoutes } from '../routes'

export async function getAsyncMenus() {
  const menulist = routeToMenu(asyncRoutes)
  console.log('menulist: ', menulist)
  // 剔除隐藏菜单
  const filtermenu = treeMap(menulist, {
    conversion: (node: Menu) => {
      const { children = [], hideMenu = false } = node
      if (hideMenu) {
        return undefined
      }
      for (let index = 0; index < children.length; index++) {
        const { meta: { hideMenu = false } = {} } = children[index]
        if (hideMenu) {
          children.splice(index, 1)
        }
      }
      return node
    }
  })
  // 菜单排序
  sortMenu(filtermenu)
  return filtermenu
}

// 菜单排序
function sortMenu(menus: Menu[]) {
  if (menus.length === 0) {
    return
  }
  menus.sort((a, b) => {
    return (a?.orderNo || 0) - (b?.orderNo || 0)
  })
  menus.forEach((menu) => {
    sortMenu(menu.children || [])
  })
}
