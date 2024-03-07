<template>
  <ElHeader class="header" :style="getDomHeight">
    <div class="header-left">
      <AppLogo v-if="getShowHeaderMenu" :show="!getIsMobile && !getShowHeaderMenu"/>
      <SiderTrigger
        v-if="!getShowHeaderMenu || getIsMobile"
        class="header-left-item sider-trigger"
      ></SiderTrigger>
      <AppTitle></AppTitle>
      <BreadCrumb
        v-if="!getShowHeaderMenu && getShowBreadCrumb && !getIsMobile"
        class="flex items-center px-4"
      ></BreadCrumb>
    </div>
    <div v-if="getShowHeaderMenu && !getIsMobile" class="header-menu">
      <Menu></Menu>
    </div>
    <div class="header-action">
      <AppNotice v-if="getShowNotice" class="header-action-item"></AppNotice>
    </div>
  </ElHeader>
</template>

<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  unref
} from 'vue'
import { ElHeader, ElBadge } from 'element-plus'
import {
  SiderTrigger,
  AppNotice,
  FullScreen,
  BreadCrumb,
  AppTitle
} from './components/index'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'
import AppLogo from '@/components/application/AppLogo.vue'
import Menu from '@/layout/menu/LayoutMenu.vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useAppInject } from '@/hooks/web/useAppInject'
import SvgIcon from '@/components/icons/SvgIcon.vue'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'layoutHeader',
  components: {
    AppLogo,
    Menu,
    ElHeader,
    ElBadge,
    SiderTrigger,
    AppNotice,
    FullScreen,
    BreadCrumb,
    SvgIcon,
    AppTitle
  },
  setup() {
    const {
      getHeaderHeight,
      getShowBreadCrumb,
      getShowFullScreen,
      getShowMultLang,
      getShowNotice,
      getShowSetting,
      getShowHeaderMenu
    } = useHeaderSetting()
    const { getIsMobile } = useAppInject()

    const getDomHeight = computed((): CSSProperties => {
      return {
        height: `${unref(getHeaderHeight) / 16}rem`
      }
    })
    const userStore = useUserStore()
    const router = useRouter()
    const toMessageCenter = () => {
      router.push('/message/audit')
    }

    return {
      getDomHeight,
      getShowHeaderMenu,
      getShowBreadCrumb,
      getShowFullScreen,
      getShowMultLang,
      getShowNotice,
      getShowSetting,
      getIsMobile,
      toMessageCenter
    }
  }
})
</script>

<style lang="less" scoped>
@import './header.less';

.messageBadge {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
