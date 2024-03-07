import { ProjectConfig } from '#/config'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { useAppStore } from '@/store/modules/app'
import { deepMerge } from '@/utils'
import { WebCache } from '@/utils/cache'
import { ElMessage } from 'element-plus'
import { updateHtmlTheme } from '../hooks/setting/useTheme'
import projectSetting from './projectSetting'

export function initConfigStore() {
  const appStore = useAppStore()
  const theme = appStore.getThemeMode

  let projCfg: ProjectConfig = projectSetting

  const { update, first } = checkVersion()
  if (update) {
    !first && ElMessage.info('系统版本更新，请重新登录')
  } else {
    projCfg = deepMerge(
      projectSetting,
      (WebCache.getLocal('PROJECT_SETTING') as ProjectConfig) || {}
    )
  }

  // 进行主题、语言、样式的初始设置
  setHtmlRem()
  useWindowSizeFn(() => {
    setHtmlRem()
  }, 150)
  appStore.setProjectSetting(projCfg)
  updateHtmlTheme(theme)
}

// 检查是否需要更新
function checkVersion() {
  const currentVersion = process.env.VUE_APP_VERSION
  console.log('version', currentVersion)
  const localVersion = WebCache.getLocal('VERSION')

  let update = true
  const first = typeof localVersion !== 'string'
  if (localVersion === currentVersion) {
    update = false
    return { update, first }
  }
  WebCache.clearLocal()
  WebCache.setLocal('VERSION', currentVersion)
  return { update, first }
}

// 设置html的fontsize大小
function setHtmlRem() {
  const html = document.documentElement
  if (!html) {
    return
  }
  // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
  const htmlWidth = html.clientWidth || document.body.clientWidth
  // 得到html的Dom元素
  const htmlDom = document.getElementsByTagName('html')[0]
  // 设置根元素字体大小
  if (htmlWidth > 800) {
    htmlDom.style.fontSize = htmlWidth / (1920 / 16) + 'px'
  } else {
    htmlDom.style.fontSize = '16px'
  }
}
