import { getEloffset } from '@/hooks/dom/useElOffset'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { tryOnMounted, useDebounceFn } from '@vueuse/core'
import { Ref, nextTick, ref, unref } from 'vue'

export function useAutoHeight(
  elementRef: Ref<HTMLElement | null> | Ref<HTMLElement> | Ref<HTMLElement | undefined>,
  toBottom = 90
) {
  const autoHeight = ref('100%')

  const debounceRedoHeight = useDebounceFn(redoHeight, 100)

  function redoHeight() {
    nextTick(() => {
      calcTableHeight()
    })
  }

  async function calcTableHeight() {
    const element = unref(elementRef)
    if (!element) return

    await nextTick()

    // 头部距离可视页面底部和顶部距离
    const { top, bottomToVisibleWindow } = getEloffset(element)
    // 如果距离顶部为零则页面已缓存隐藏
    if (!top) {
      setTimeout(() => {
        calcTableHeight()
      }, 200)
      return
    }

    // 自定义table到页面底部的距离
    const fontSize = Number(
      getComputedStyle(document.documentElement).getPropertyValue('font-size').replace('px', '')
    )
    const tableToPageBottomHeight = (toBottom / 16) * fontSize

    const height = bottomToVisibleWindow - tableToPageBottomHeight
    // table主体高度
    autoHeight.value = `${height}px`
  }

  useWindowSizeFn(calcTableHeight, 200)
  tryOnMounted(() => {
    debounceRedoHeight()
  })
  return { redoHeight, autoHeight }
}
