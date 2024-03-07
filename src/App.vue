<template>
  <AppProvider>
    <ElConfigProvider :locale="zhCn">
      <router-view />
    </ElConfigProvider>
  </AppProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import { useHtmlTitle } from './hooks/web/useHtmlTitle'
import AppProvider from './components/application/AppProvider.vue'
import { useDebounceFn } from '@vueuse/core'

// 跟踪修改浏览器标题
useHtmlTitle()

// 解决ERROR ResizeObserver loop completed with undelivered notifications.

const _ResizeObserver = window.ResizeObserver

window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback: Fn) {
    callback = useDebounceFn(callback, 16)

    super(callback)
  }
}
</script>
