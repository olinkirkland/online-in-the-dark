<template>
  <div class="ribbon" :class="{ 'ribbon--hidden': !showRibbon }">
    <div class="ribbon__content">
      <p v-html="message" @click="onActivate"></p>
      <button class="btn btn--icon" @click="onClickClose">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
const props = defineProps<{
  id: string;
  message: string;
  onActivate: () => void;
}>();

function onClickClose() {
  localStorage.setItem('ribbon.' + props.id, 'true');
  showRibbon.value = false;
}

const showRibbon = ref(!localStorage.getItem('ribbon.' + props.id));
</script>

<style scoped lang="scss">
.ribbon {
  z-index: 1;
  width: 100%;
  max-height: 24rem;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);

  &--hidden {
    overflow: hidden;
    max-height: 0;
  }

  > .ribbon__content {
    display: flex;
    padding: 0.6rem 0.8rem;
    justify-content: space-between;
    background-color: var(--primary);
    color: var(--translucent-heavy);
    box-shadow: var(--shadow);
    gap: 1rem;
    position: relative;

    display: flex;
    justify-content: center;

    > p {
      font-size: 1.2rem;
      font-style: italic;
      cursor: pointer;
      max-width: 96rem;
      margin-right: 2.4rem;

      :deep(em) {
        font-size: inherit;
        font-style: inherit;
        color: inherit;
        font-weight: bold;
      }
    }

    > button {
      position: absolute;
      right: 0.6rem;
      height: min-content;
      width: auto;
      padding: 0.4rem;
      color: var(--translucent-heavy);
    }
  }
}
</style>
