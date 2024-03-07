<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col flex-1 basic-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.basic-container {
  background-color: var(--el-bg-color);
  padding: 30px;
  border-radius: 20px;
}
</style>
