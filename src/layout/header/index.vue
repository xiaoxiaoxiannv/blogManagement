<template>
  <div class="header-fill" :style="getDomHeight"></div>
  <div class="header-fixed" :style="{ ...getDomWidth, ...getDomHeight }">
    <LayoutHeader v-if="getShowHeader"></LayoutHeader>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, unref } from 'vue'
import LayoutHeader from './LayoutHeader.vue'
import { useSiderSetting } from '@/hooks/setting/useSiderSetting'
import { useTabsSetting } from '@/hooks/setting/useTabsSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useAppInject } from '@/hooks/web/useAppInject'
export default defineComponent({
  name: 'Header',
  components: { LayoutHeader},
  setup() {
    const { getIsMobile } = useAppInject()
    const { getRealWidth, getShowSideMenu } = useSiderSetting()
    const { getShowHeader, getHeaderHeight } = useHeaderSetting()
    const { getShowTabs, getTabsHeight } = useTabsSetting()
    const getDomWidth = computed((): CSSProperties => {
      const subtractedWidth = unref(getIsMobile) ? 0 : unref(getRealWidth)
      return {
        width: unref(getShowSideMenu) ? `calc(100% - ${subtractedWidth / 16}rem)` : '100%'
      }
    })

    const getDomHeight = computed((): CSSProperties => {
      const headerHeight = unref(getShowHeader) ? unref(getHeaderHeight) : 0
      const tabsHeight = unref(getShowTabs) ? unref(getTabsHeight) : 0
      return {
        height: `calc(${headerHeight / 16}rem + ${tabsHeight / 16}rem)`
      }
    })
    return {
      getShowHeader,
      getShowTabs,
      getDomWidth,
      getDomHeight
    }
  }
})
</script>

<style lang="less" scoped>
.header-fill {
  flex-shrink: 0;
}

.header-fixed {
  transition: all 0.2s;
  position: fixed;
  top: 0;
  z-index: 505;
}
</style>
