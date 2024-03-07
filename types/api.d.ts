type UserInfo = import('./store').UserInfo

/* 登录接口参数类型 */
declare interface LoginParam {
  userName: string
  password: string
}
/* 登录接口返回值类型 */
declare interface LoginRes extends UserInfo {
  token: string
  roles: string[]
}

interface BaseDataRes {
  id: string
  enabled: number
  createdBy: string
  updatedBy: string
  createAt: string
  updateAt: string
}

// 标签类型
declare interface TagType extends BaseDataRes {
  tagName: string
  type: number
}
