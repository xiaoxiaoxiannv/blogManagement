import { defineStore } from 'pinia'
import { login } from '@/api/sys/user'
import { router } from '@/router'
import { asyncRoutes } from '@/router/routes/modules/index'
import { store } from '../index'
import { WebCache } from '@/utils/cache'
import { RouteRecordRaw } from 'vue-router'
import { flatMultiRoutes } from '@/hooks/route'
import { PageEnum } from '@/enums/pageEnum'
import { UserInfo, UserState } from '#/store'

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    isDynamicAddedRoute: false,
    sessionTimeout: false,
    lastUpdateTime: 0
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || WebCache.getLocal('USER_INFO') || ({} as UserInfo)
    },
    // getToken(): string | undefined {
    //   if (this.token) {
    //     return this.token
    //   }
    //   const userInfo = (WebCache.getLocal('USER_INFO') || {}) as UserInfo
    //   return userInfo.token
    // },
    getToken(): string {
      return this.token || (WebCache.getLocal('TOKEN') as string)
    },
    getRoleList(): string[] {
      if (this.roleList.length > 0) {
        return this.roleList
      }
      const userInfo = (WebCache.getLocal('USER_INFO') || {}) as UserInfo
      return userInfo.roles || []
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    }
  },
  actions: {
    resetState() {
      this.userInfo = null
      this.token = ''
      this.roleList = []
      this.sessionTimeout = false
      this.isDynamicAddedRoute = false
      WebCache.removeLocal('TOKEN')
      WebCache.removeLocal('USER_INFO')
    },
    setToken(info: string | undefined) {
      if (info) {
        this.token = info
      } else {
        this.token = ''
      }
      WebCache.setLocal('TOKEN', info)
    },
    setRoleList(roleList: string[]) {
      this.roleList = roleList
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      WebCache.setLocal('USER_INFO', info)
      this.setRoleList(info?.roles || [])
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    setIsDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    /**
     * @description: login
     */
    async toLogin(params: LoginParam): Promise<UserInfo | null> {
      try {
        const { ...loginParam } = params
        const data = await login(loginParam)
        const userInfo = await this.handleLoginBack(data)
        await this.afterLogin()
        return userInfo
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLogin() {
      if (!this.token) return null
      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        const routes = asyncRoutes
        console.log('在user.ts中的routes', routes)
        // 构建路由
        const flatRoutes = flatMultiRoutes(routes as RouteRecordRaw[])
        flatRoutes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
        })
        console.log('在user.ts中的flatRoutes', flatRoutes)

        // 添加路由已经添加的状态
        this.setIsDynamicAddedRoute(true)
        await router.replace(PageEnum.BASE_HOME)
      }
    },
    /**
     * @description: 处理登录返回信息，得到用户信息
     */
    async handleLoginBack<T extends LoginRes>(data: T): Promise<UserInfo | null> {
      const { token, ...userInfo } = data
      // save token
      this.setToken(token)
      this.setUserInfo(userInfo)
      return userInfo
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          // await doLogout();
        } catch {
          console.log('注销Token失败')
        }
      }
      goLogin && router.push(PageEnum.BASE_LOGIN)
    }
  }
})

export function useUserStoreOther() {
  return useUserStore(store)
}
