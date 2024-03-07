<script setup lang="ts"></script>

<template>
  <div class="relative back">
    <div class="absolute w-full bottom-8">
      <div class="relative">
        <div class="h-1 bg-white"></div>
        <div
          :style="{ left: '50%' }"
          class="absolute w-2 h-10 -translate-y-1/2 bg-orange-400"
        ></div>
        <div :style="{ left: '20%' }" class="absolute -translate-y-1/2 triangle"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.back {
  // background-color: var(--el-bg-color);
  background-color: black;
  height: 400px;
  width: 400px;
}

.triangle {
  width: 0px;
  height: 0px;
  border: 20px solid transparent;
  border-bottom-color: white;
  position: relative;
}
</style>
