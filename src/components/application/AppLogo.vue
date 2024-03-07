<template>
  <div class="flex items-center cursor-pointer justify-center" @click="goHome">
    <img v-show="props.show" class="logo-size" src="../../assets/img/logo.png" />
  </div>
</template>

<script setup lang="ts">
import { useGo } from '@/hooks/web/usePage'
import { PageEnum } from '@/enums/pageEnum'

const props = defineProps({
  show: {
    type: Boolean,
    default: true
  }
})


const go = useGo()
function goHome() {
  go(PageEnum.BASE_HOME)
}
</script>

<style lang="less" scoped>
.logo-size {
  height: @logo-height;
  width: @logo-width;
}
</style>
