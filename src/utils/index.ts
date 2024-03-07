import { ElMessageBox } from 'element-plus'
import { cloneDeep, isEqual, mergeWith, unionWith } from 'lodash-es'
import { App, Plugin, Ref } from 'vue'
import { isObject, isArray } from './is'

/**
 * 将来源对象的属性赋值给目标对象，并返回一个新对象。
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(
  target: T,
  source: U
): T & U {
  return mergeWith(cloneDeep(target), source, (objValue, srcValue) => {
    if (isObject(objValue) && isObject(srcValue)) {
      return mergeWith(cloneDeep(objValue), srcValue, (prevValue, nextValue) => {
        // 如果是数组，合并数组(去重)
        return isArray(prevValue) ? unionWith(prevValue, nextValue, isEqual) : undefined
      })
    }
  })
}

/**
 * @param url
 * @returns Object
 * @description 截取url参数
 */
export function cutUrlParams(url: string) {
  const obj: Record<string, string> = {}
  const paramsArr = url.replace(/.*\?/g, '').split('&')
  paramsArr.forEach((item) => {
    const temp = item.split('=')
    if (temp[1]) {
      obj[temp[0]] = temp[1]
    }
  })
  return obj
}

/**
 * 组件注册方法
 */
export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

// 使用a标签下载
export function downloadFile(
  blobUrl: string,
  filename?: string,
  appendEl?: Ref<HTMLElement | undefined>
) {
  const a = document.createElement('a')
  if (!a.click) {
    throw new Error('DownloadManager: "a.click()" is not supported.')
  }
  a.href = process.env.VUE_APP_API_URL + blobUrl
  a.target = '_parent'
  if ('download' in a) {
    a.download = filename || ''
  }
  if (appendEl) {
    console.log('aaaaaaaa')
    appendEl.value && appendEl.value.append(a)
  } else {
    (document.body || document.documentElement).append(a)
  }
  a.click()
  a.remove()
}

export async function confirmPopup(title: string, context: string): Promise<boolean> {
  try {
    await ElMessageBox.confirm(context, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: '',
      center: true
    })
    return new Promise((resolve) => resolve(true))
  } catch (error) {
    return new Promise((resolve) => resolve(false))
  }
}
