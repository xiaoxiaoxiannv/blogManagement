import { getBoundingClientRect } from '@/hooks/dom/useElOffset'
import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn'
import { tryOnMounted, tryOnUnmounted, useDebounceFn } from '@vueuse/core'
import { Ref, nextTick, ref, unref } from 'vue'

export function useAutoWidth(
  elementRef: Ref<HTMLElement | null> | Ref<HTMLElement> | Ref<HTMLElement | undefined>,
  offset = 0
) {
  const autoWidth = ref('100%')

  const debounceRedoWidth = useDebounceFn(redoWidth, 100)

  function redoWidth() {
    nextTick(() => {
      calcElWidth()
    })
  }

  async function calcElWidth() {
    const element = unref(elementRef)
    if (!element) return

    await nextTick()

    // 计算元素宽度
    const box = getBoundingClientRect(element)
    if (!box) return
    const { width } = box

    // table主体宽度
    autoWidth.value = `${width - offset}px`
  }

  const resizeObserver = new ResizeObserver(() => debounceRedoWidth())

  useWindowSizeFn(calcElWidth, 200)
  tryOnMounted(() => {
    debounceRedoWidth()
    if (elementRef.value) {
      resizeObserver.observe(elementRef.value)
    }
  })
  tryOnUnmounted(() => {
    if (elementRef.value) {
      resizeObserver.unobserve(elementRef.value)
    }
  })
  return { redoWidth, autoWidth }
}
