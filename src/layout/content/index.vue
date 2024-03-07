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
          </Transition>
        </template>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useOtherSetting} from '@/hooks/setting/useOtherSetting'

const {getPageLoading} = useOtherSetting()
</script>

<style lang="less" scoped>
.layout-content-cotainer {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 15px 30px 0px 30px;

  .h-full {
    display: flex;
    flex-direction: column;
  }
}
</style>
