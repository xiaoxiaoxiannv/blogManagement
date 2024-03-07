<template>
  <div class="flex items-center justify-center h-full">
    <div class="flex flex-col items-center justify-center w-1/2 h-1/2">
      <SvgIcon style="font-size: 25rem; line-height: 25rem" name="403"></SvgIcon>
      <ElButton size="large" class="w-32" type="primary" @click="handleClick">{{
        '返回首页'
      }}</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/icons/SvgIcon.vue'
import { useGo } from '@/hooks/web/usePage'

const go = useGo()

function handleClick() {
  go('/', true)
}
</script>
