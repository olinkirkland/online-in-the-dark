<template>
  <div class="shelf" :class="{ show: props.show }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{
  show: boolean;
}>();
</script>

<style lang="scss" scoped>
.shelf {
  width: 100%;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::after {
    content: '';
    height: 0.4rem;
  }
}

.shelf.show {
  max-height: 100rem;
  transition: max-height 1s ease-in-out;
}

:deep(p) {
  font-style: italic;
  color: var(--light);
  opacity: 0.6;
}
</style>
