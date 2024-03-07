<template>
  <div v-if="getIsMobile" class="mobile-side-drawer">
    <ElDrawer
      v-model="drawerVisible"
      direction="ltr"
      :show-close="false"
      @close="handleCloseDrawer"
      :style="getsiderWidth"
    >
      <div class="side-style" :style="getsiderWidth">
        <AppLogo class="side-logo" :style="getLogoHeight" :show="!getCollapsed"></AppLogo>
        <Menu class="side-height-auto"></Menu>
      </div>
    </ElDrawer>
  </div>
  <div v-else>
    <div class="side-fill" :style="getsiderWidth"></div>
    <div class="side-style side-fixed" :style="getsiderWidth">
      <AppLogo class="side-logo" :style="getLogoHeight" :show="!getCollapsed"></AppLogo>
      <Menu class="side-height-auto"></Menu>
    </div>
  </div>
</template>

<script lang="ts">
import AppLogo from '@/components/application/AppLogo.vue'
import { ElDrawer } from 'element-plus'
import { computed, CSSProperties, defineComponent, ref, unref, watch } from 'vue'
import Menu from '@/layout/menu/LayoutMenu.vue'

import { useSiderSetting } from '@/hooks/setting/useSiderSetting'
import { useAppInject } from '@/hooks/web/useAppInject'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useTabsSetting } from '@/hooks/setting/useTabsSetting'

export default defineComponent({
  name: 'AppSide',
  components: { Menu, AppLogo, ElDrawer },
  setup() {
    const { getRealWidth, getCollapsed, setSiderSetting } = useSiderSetting()
    const { getShowHeader, getHeaderHeight } = useHeaderSetting()
    const { getShowTabs, getTabsHeight } = useTabsSetting()
    const { getIsMobile } = useAppInject()

    const getsiderWidth = computed((): CSSProperties => {
      const width = `${unref(getRealWidth) / 16}rem`
      return {
        width: width,
        maxWidth: width,
        minWidth: width
      }
    })

    const getLogoHeight = computed((): CSSProperties => {
      const headerHeight = unref(getShowHeader) ? unref(getHeaderHeight) : 0
      const tabsHeight = unref(getShowTabs) ? unref(getTabsHeight) : 0
      return {
        height: `calc(${headerHeight / 16}rem + ${tabsHeight / 16}rem)`
      }
    })

    const drawerVisible = ref(false)

    watch(
      () => getCollapsed.value,
      (newVal) => {
        drawerVisible.value = !newVal
      },
      { immediate: true }
    )

    function handleCloseDrawer() {
      setSiderSetting({ collapsed: true })
    }
    return {
      getsiderWidth,
      getLogoHeight,
      getCollapsed,
      getIsMobile,
      drawerVisible,
      handleCloseDrawer
    }
  }
})
</script>

<style lang="less" scoped>
.side-style {
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  background-color: var(--sider-bg-color);
  height: 100%;
  overflow: hidden;
  z-index: 100;

  .side-logo {
    padding: 20px 0px 18px 0px;
    color: var(--sider-text-hover-color);
  }

  .side-height-auto {
    flex: 1;
  }
}

.side-fill {
  height: 100%;
  transition: all 0.2s;
}

.side-fixed {
  position: fixed;
  top: 0;
  left: 0;
}

// 修改原有elDrawer样式
.mobile-side-drawer {
  :deep(.el-drawer) {
    background-color: var(--sider-bg-color);

    .el-drawer__header {
      height: 0;
      padding: 0;
      margin: 0;
    }

    .el-drawer__body {
      padding: 0;
    }
  }
}
</style>
