<template>
  <span :class="[spin && 'svg-icon-spin', $attrs.class]" @click="clickSpan">
    <svg class="svg-icon-base" aria-hidden="true" width="1em" height="1em">
      <use :xlink:href="getSvgId"></use>
    </svg>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const getSvgId = computed(() => {
      return `#icon-${props.name}`
    })

    function clickSpan() {
      emit('click')
    }

    return {
      getSvgId,
      clickSpan
    }
  }
})
</script>

<style lang="less" scoped>
.svg-icon-base {
  display: inline;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}

.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}
</style>
