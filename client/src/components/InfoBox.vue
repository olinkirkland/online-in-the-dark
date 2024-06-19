<template>
  <div
    class="info-box"
    v-if="useOptionsStore().options.showHints || props.ignoreOptions"
  >
    <i class="fas fa-info"></i>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOptionsStore } from '@/stores/options-store';

const props = defineProps<{
  ignoreOptions?: boolean;
}>();
</script>

<style lang="scss" scoped>
.info-box {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  padding: 1.6rem;
  background-color: var(--dark);
  border-radius: 5px;
  width: fit-content;

  > i {
    padding: 0.4rem 0.8rem;
    font-size: 2rem;
    opacity: 0.4;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  :deep(ul) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;

    li {
      display: flex;
    }
  }

  :deep(*) {
    font-size: 1.2rem;
    line-height: 1.4;
  }
}
</style>
