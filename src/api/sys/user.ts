// import { LoginParam, LoginRes } from '#/api'
import { Menu } from '#/list'
import { http } from '@/utils/axios/index'

/**
 * 登录
 */
export function login(data: LoginParam) {
  // return http.post<LoginRes>('/user/login', data)
  return http.post<LoginRes>('/manage/login/accountLogin', data)
}
// export function getMenuList() {
//   console.log('获取菜单列表')
//   return http.get<Menu[]>('/manage/accountRole/getMenuList')
// }
