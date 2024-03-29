<template>
  <div>
    <ElBreadcrumb>
      <template v-for="route in routes" :key="route.path">
        <ElBreadcrumbItem>{{ route.name }}</ElBreadcrumbItem>
      </template>
    </ElBreadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { getAsyncMenus } from '@/router/menu/index'
import { useRouter } from 'vue-router'
import { getAllParentPath } from '@/router/menu/util'
import { Menu } from '#/list'

export default defineComponent({
  name: 'breadCrumb',
  components: { ElBreadcrumb, ElBreadcrumbItem },
  setup() {
    const routes = ref<Menu[]>([])
    const { currentRoute } = useRouter()

    watchEffect(async () => {
      if (currentRoute.value.name === 'Redirect') return
      const menus = await getAsyncMenus()

      const path = currentRoute.value.path

      const parentPaths = getAllParentPath(menus, path)
      const filterMenu = menus.filter((item) => item.path === parentPaths[0])
      routes.value = flatItems(filterMenu, parentPaths)
    })

    function flatItems(menus: Menu[], parentPaths: string[]) {
      const flatMenu: Menu[] = []
      menus.forEach((item) => {
        if (parentPaths.includes(item.path)) {
          flatMenu.push({
            ...item
          })
        }
        if (item.children && item.children.length > 0) {
          flatMenu.push(...flatItems(item.children, parentPaths))
        }
      })
      return flatMenu
    }

    return {
      routes
    }
  }
})
</script>
