<template>
  <div class="tooltip" :class="{ 'tooltip--top': top }" ref="tooltip">
    <span v-html="text"></span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  text: string;
  top?: boolean;
}>();

const tooltip = ref<HTMLElement | null>(null);
</script>

<style scoped lang="scss">
*:not(:hover) + .tooltip {
  opacity: 0;
}

.tooltip {
  position: absolute;
  opacity: 1;
  transition: all 0.4s;
  pointer-events: none;
  text-transform: unset;

  &--top {
    top: unset;
    bottom: calc(100% + 0.4rem);
    &::before {
      border-bottom: 0;
      border-top: 0.8rem solid var(--translucent-heavy);
      transform: translateX(-50%) translateY(2.2rem);
    }
  }
}
</style>
