<template>
  <ElSubMenu
    class="collapsed-submenu"
    popper-class="collapsed-menu-popover"
    v-if="menu?.children && menu?.children.length !== 0"
    :index="menu.path"
  >
    <template #title>
      <ElIcon :size="30"><SvgIcon v-if="parent" :name="(menu?.icon as string)"></SvgIcon></ElIcon>
      <span v-if="!parent" class="ml-2"> {{ getI18nName }}</span>
    </template>
    <template v-for="item in menu.children" :key="item.path">
      <CollapsedMenuItem :parent="false" :menu="item"></CollapsedMenuItem>
    </template>
  </ElSubMenu>
  <ElMenuItem class="collapsed-menuItem" v-else :index="menu.path">
    <ElIcon :size="30"><SvgIcon v-if="parent" :name="(menu?.icon  as string)"></SvgIcon></ElIcon>
    <template #title>
      <span class="ml-2"> {{ getI18nName }}</span>
    </template>
  </ElMenuItem>
</template>

<script lang="ts">
import { Menu } from '#/list'
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import { computed, defineComponent, PropType } from 'vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'

export default defineComponent({
  name: 'CollapsedMenuItem',
  components: { ElSubMenu, ElMenuItem, SvgIcon, ElIcon },
  props: {
    menu: {
      type: Object as PropType<Menu>,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    },
    parent: Boolean
  },
  setup(props) {
    const getI18nName = computed(() => {
      return props.menu.name
    })
    return { getI18nName }
  }
})
</script>

<style lang="less">
.collapsed-menu-popover.el-popper {
  border: 0;
  .el-menu {
    padding: 0;

    .collapsed-menuItem,
    .el-sub-menu__title {
      height: 48px;
      line-height: 48px;
      color: var(--sider-text-color);
      background-color: var(--sider-bg-color);

      &:hover {
        color: var(--sider-text-hover-color);
      }
      &.is-active {
        color: #ffffff;
        background-color: var(--el-color-primary);
      }
    }

    .el-sub-menu.is-active > .el-sub-menu__title {
      color: var(--sider-text-hover-color);
    }
  }
}
</style>
