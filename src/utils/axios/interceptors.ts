import { useUserStore } from '@/store/modules/user'
import { router } from '@/router'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { AxiosInterceptorsConfig, Result } from './types'

export const axiosInterceptors: AxiosInterceptorsConfig = {
  requestInterceptors: (config) => {
    // 添加请求头
    const { getToken } = useUserStore()
    if (getToken) {
      (config.headers as Record<string, string>).token = getToken
    }
    return config
  },
  responseInterceptors: (response: AxiosResponse<Result>) => {
    const { code, message, data } = response.data // 根据自定义错误码判断请求是否成功
    if (code === 200) {
      // 将组件用的数据返回
      return data
    } else {
      // 处理业务错误。
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  requestInterceptorsCatch: (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  },
  responseInterceptorsCatch: (error) => {
    // 处理 HTTP 网络错误
    let errMessage = ''
    // HTTP 状态码
    const status = error.response?.status
    switch (status) {
      case 401:
        errMessage = '用户没有权限（令牌、用户名、密码错误）!'
        // 这里可以触发退出的 action
        break
      case 403:
        errMessage = '用户得到授权，但访问是被禁止的。!'
        // router.replace('/error/403')
        break
      case 404:
        errMessage = '网络请求错误,未找到该资源!'
        // router.replace('/error/404')
        break
      case 405:
        errMessage = '登录状态已失效,请重新登录'
        router.replace('/login')
        break
      case 408:
        errMessage = '网络请求超时!'
        break
      case 500:
        errMessage = '服务器错误,请联系管理员!'
        router.replace('/error/500')
        break
      case 501:
        errMessage = '网络未实现!'
        break
      case 502:
        errMessage = '网络错误!'
        break
      case 503:
        errMessage = '服务不可用，服务器暂时过载或维护!'
        break
      case 504:
        errMessage = '网络超时!'
        break
      case 505:
        errMessage = 'http版本不支持该请求!'
        break
      default:
        errMessage = 'Error Status:' + status
    }
    ElMessage.error(errMessage)
    return Promise.reject(error)
  }
}
