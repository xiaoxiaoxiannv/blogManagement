<template>
  <div class="layout-content-cotainer" v-loading="getPageLoading">
    <div class="h-full">
      <router-view>
        <template #default="{ Component }">
          <Transition name="fade-slide" mode="out-in" appear>
            <component
              :is="Component"
            ></component
            >
<!--            <KeepAlive v-else :include="getCacheTabs">-->
<!--              <component :is="Component" :key="route.fullPath"></component>-->
<!--            </KeepAlive>-->
          </Transition>
        </template>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOtherSetting } from '@/hooks/setting/useOtherSetting'
import { useTabStore } from '@/store/modules/tabs'
import { computed } from 'vue'
const tabStore = useTabStore()
// loading 在路由守卫修改状态
const { getPageLoading } = useOtherSetting()
// 只需要将tab还存在的alive
// 注意alive的组件名字必须要和getCacheTabs中的参数一样
const getCacheTabs = computed(() => tabStore.getCacheList)
</script>

<style lang="less" scoped>
.layout-content-cotainer {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 15px 30px 0px 30px;
  .h-full{
    display: flex;
    flex-direction: column;
  }
}
</style>
