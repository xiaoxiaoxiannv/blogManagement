<template>
  <div class="flex items-center cursor-pointer justify-center">
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: true
  }
})

</script>

<style lang="less" scoped>
.logo-size {
  height: @logo-height;
  width: @logo-width;
}
</style>
