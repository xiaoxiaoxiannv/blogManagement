import { ProjectConfig } from '#/config'
import {
  PermissionModeEnum,
  SessionTimeoutProcessingEnum,
  SiderColorEnum,
  HeaderColorEnum,
  MenuTypeEnum
} from '@/enums/configEnum'
import { CacheTypeEnum } from '@/enums/cacheEnum'

// 系统初始化的样式配置
const setting: ProjectConfig = {
  themeColor: {
    mainColor: {
      theme: '#6067F3',
      config: {
        '--el-color-primary': '#6067F3',
        '--el-color-primary-light-3': 'rgb(144, 149, 247)',
        '--el-color-primary-light-5': 'rgb(176, 179, 249)',
        '--el-color-primary-light-7': '#c6e2ff',
        '--el-color-primary-light-8': 'rgb(223, 225, 253)',
        '--el-color-primary-light-9': 'rgb(239, 240, 254)',
        '--el-color-primary-dark-2': 'rgb(81, 86, 198)'
      }
    },
    siderColor: {
      theme: '#ffffff',
      config: {
        [SiderColorEnum.SIDER_BG_COLOR]: '#ffffff',
        [SiderColorEnum.SIDER_CHILD_BG_COLOR]: '#E3E4FF',
        [SiderColorEnum.SIDER_TEXT_COLOR]: '#696DCD',
        [SiderColorEnum.SIDER_TEXT_HOVER_COLOR]: '#6067F3'
      }
    },
    headerColor: {
      theme: '#ffffff',
      config: {
        [HeaderColorEnum.HEADER_BG_COLOR]: '#ffffff',
        [HeaderColorEnum.HEADER_BG_HOVER_COLOR]: '#F6F8FE'
      }
    }
  },
  // Permission mode
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  // Permission-related cache is stored in sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // 顶栏设置
  headerSetting: {
    // 是否显示
    show: true,
    // 高度
    headerHeight: 98,
    // 是否显示全屏按钮
    showFullScreen: true,
    // 是否显示通知
    showNotice: false,
    // 是否显示面包屑
    showBreadCrumb: false,
    // 是否显示多国语言
    showMultLang: false,
    // 是否显示设置
    showSettingButton: false
  },

  // 侧边栏设置
  siderSetting: {
    // 是否显示
    show: true,
    // 菜单类型
    menuType: MenuTypeEnum.SIDE,
    // 菜单折叠
    collapsed: false,
    // 侧边栏折叠后的宽度
    siderCollapsedWidth: 48,
    // 侧边栏宽度
    siderWidth: 300
  },

  // tabs
  tabsSetting: {
    // 是否缓存数据
    cache: true,
    // 是否显示
    show: true,
    // 是否可以拖动
    canDrag: true,
    // tabs高度
    tabsHeight: 40
  },

  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  openKeepAlive: true,

  // Use error-handler-plugin
  useErrorHandle: false,

  // Whether to open back to top
  useOpenBackTop: true,

  //  Is it possible to embed iframe pages
  canEmbedIFramePage: true,

  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // If it is enabled, I want to overwrite a single interface. Can be set in a separate interface
  removeAllHttpPending: false
}

export default setting
