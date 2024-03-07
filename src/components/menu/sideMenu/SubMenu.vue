<template>
  <SubMenuItem
    v-if="hasChildrenMenu(item)"
    :class="getLevelClass"
    :name="item.path"
    :topParent="parent"
  >
    <template #title>
      <SvgIcon v-if="getCeil" class="menu-list-submenu-title-iconfont" :name="(item?.icon as string)"></SvgIcon>
      <span  class="menu-list-submenu-title-name"> {{ getI18nName }}</span>
    </template>
    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <SubMenu :item="childrenItem" :parent="false"></SubMenu>
    </template>
  </SubMenuItem>
  <MenuItem
    v-else
    :class="getLevelClass"
    :name="item.path"
    :topParent="parent"
  >
    <SvgIcon v-if="getCeil" class="menu-list-item-iconfont" :name="(item?.icon as string)"></SvgIcon>
    <template #title>
      <span class="menu-list-item-name">{{ getI18nName }}</span>
    </template>
  </MenuItem>
</template>

<script lang="ts">
import { Menu } from '#/list'
import { computed, defineComponent, PropType } from 'vue'
import SubMenuItem from './SubMenuItem.vue'
import MenuItem from './MenuItem.vue'
import SvgIcon from '@/components/icons/SvgIcon.vue'

export default defineComponent({
  name: 'SubMenu',
  components: { MenuItem, SvgIcon, SubMenuItem },
  props: {
    item: {
      type: Object as PropType<Menu>,
      default: () => ({})
    },
    parent: Boolean
  },
  setup(props) {
    // 多国语言
    const getI18nName = computed(() => {
      return props.item.name
    })

    // 是否为顶层
    const getCeil = computed(() => {
      return !!props.parent
    })

    // 菜单层次样式
    const getLevelClass = computed(() => {
      return [
        {
          'menu-list-parent': props.parent,
          'menu-list-children': !props.parent
        }
      ]
    })

    function hasChildrenMenu(item: Menu): boolean {
      if (item.children && item.children.length > 0) {
        return true
      } else {
        return false
      }
    }
    return {
      hasChildrenMenu,
      getLevelClass,
      getCeil,
      getI18nName
    }
  }
})
</script>
