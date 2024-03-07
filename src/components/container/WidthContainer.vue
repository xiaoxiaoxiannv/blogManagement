<template>
  <div class="flex flex-col">
    <div class="flex flex-col flex-1 width-container">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.width-container {
  background-color: var(--el-bg-color);
  box-shadow: 0px 0px 4px 0px #ecedff;
  color: @color-primary-light-1;
  padding: 20px 40px;
  border-radius: 20px;
}
</style>
