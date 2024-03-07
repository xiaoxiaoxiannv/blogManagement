<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { MicroApp } from 'qiankun'
import { loadMicro } from '@/microApp'

// 启动子应用
let microApp: MicroApp | null = null

const htmlFont = ref('16px')

function setHtmlRem(fontSize: string) {
  const html = document.documentElement
  if (!html) {
    return
  }
  const htmlDom = document.getElementsByTagName('html')[0]
  htmlFont.value = htmlDom.style.fontSize
  htmlDom.style.fontSize = fontSize
}

onMounted(async () => {
  setHtmlRem(htmlFont.value)
  microApp = loadMicro()

  await microApp.mountPromise
})

onBeforeUnmount(async () => {
  setHtmlRem(htmlFont.value)
  if (microApp) {
    await microApp.mountPromise
    await microApp.unmount()
  }
})
</script>

<template>
  <div id="sub-react"> </div>
</template>
