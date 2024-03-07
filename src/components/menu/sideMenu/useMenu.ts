import { computed, ComponentInternalInstance } from 'vue'
import type { CSSProperties } from 'vue'

export function useMenuItem(instance: ComponentInternalInstance | null) {
  const getItemStyle = computed((): CSSProperties => {
    let parent = instance?.parent
    if (!parent) {
      return {}
    }
    let parentNum = 0
    while (parent && parent.type.name !== 'Menu') {
      if (parent.type.name === 'SubMenuItem') {
        parentNum += 1
      }
      parent = parent.parent
    }
    const padding = !parentNum ? 1.25 : 3.75 + parentNum * 1.875
    return { paddingLeft: padding + 'rem' }
  })

  function getParentList() {
    let parent = instance?.parent
    if (!parent) {
      return {
        uidList: [],
        list: []
      }
    }
    const int: ComponentInternalInstance[] = []
    while (parent && parent.type.name !== 'Menu') {
      if (parent.type.name === 'SubMenuItem') {
        int.push(parent)
      }
      parent = parent?.parent
    }
    return {
      uidList: int.map((item) => item.uid),
      list: int
    }
  }
  return {
    getItemStyle,
    getParentList
  }
}
