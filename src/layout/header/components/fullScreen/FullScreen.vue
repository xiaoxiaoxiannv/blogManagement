<template>
  <div class="flex justify-center" @click="toggle">
    <ElTooltip :content="tooltipContent" :disabled="true">
      <ElIcon>
        <FullScreen></FullScreen>
      </ElIcon>
    </ElTooltip>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, unref, watchEffect } from 'vue'
import { ElIcon, ElTooltip } from 'element-plus'
import { useFullscreen } from '@vueuse/core'
import { FullScreen } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'FullScreenVue',
  components: { ElTooltip, ElIcon, FullScreen },
  setup() {
    const { isFullscreen, toggle } = useFullscreen()

    const tooltipContent = computed(() => {
      return !unref(isFullscreen) ? '全屏模式' : '退出全屏'
    })

    watchEffect(() => {
      // 重新检查全屏状态
      isFullscreen.value = !!document.fullscreenElement
    })

    return {
      isFullscreen,
      tooltipContent,
      toggle
    }
  }
})
</script>
