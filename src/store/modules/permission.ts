import { Menu } from '#/list'
import { getMenuList } from '@/api/sys/user'
import { filterRoutesFromMenu } from '@/router/menu/util'
import { defineStore } from 'pinia'
import { useUserStore } from './user'

interface permissionState {
  // 菜单列表
  menuList: Menu[]
  // 菜单最后更新事件
  updateMenuLastTime: number
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): permissionState => ({
    menuList: [],
    updateMenuLastTime: 0
  }),
  getters: {
    getMenuList(): Menu[] {
      return this.menuList || []
    }
  },
  actions: {
    setMenuList(list: Menu[]) {
      this.menuList = list
      this.updateMenuLastTime = new Date().getTime()
    },
    async buildRoutes() {
      const { getToken } = useUserStore()
      const menu = await getMenuList()
      const routes = filterRoutesFromMenu(menu)
      // this.setMenuList(routeToMenu(routes))
      this.setMenuList(menu)
      return routes
    }
  }
})
