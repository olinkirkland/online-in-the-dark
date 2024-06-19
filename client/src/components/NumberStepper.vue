<template>
  <div class="stepper">
    <button
      @click="decrease"
      class="btn btn--icon"
      :class="{
        disabled: props.min !== undefined && internalValue <= props.min,
        locked: lockLevel < 1
      }"
    >
      <i class="fas fa-minus-circle"></i>
    </button>
    <div class="content">
      <h1>{{ value }}</h1>
      <h2 v-if="props.label">{{ props.label }}</h2>
    </div>
    <button
      @click="increase"
      class="btn btn--icon"
      :class="{
        disabled: props.max !== undefined && internalValue >= props.max,
        locked: lockLevel < 1
      }"
    >
      <i class="fas fa-plus-circle"></i>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useGameStore } from '@/stores/game-store';
import { computed, defineEmits, defineProps, ref, watch } from 'vue';

const props = defineProps<{
  value: number;
  min?: number;
  max?: number;
  label?: string;
}>();

const lockLevel = 99;

const emit = defineEmits<{
  (e: 'change', value: number): void;
}>();

const internalValue = ref(props.value);

watch(
  () => props.value,
  (newValue) => {
    internalValue.value = newValue;
  }
);

const increase = () => {
  if (props.max !== undefined && internalValue.value >= props.max) return;
  internalValue.value++;
  emit('change', internalValue.value);
};

const decrease = () => {
  if (props.min !== undefined && internalValue.value <= props.min) return;
  internalValue.value--;
  emit('change', internalValue.value);
};
</script>

<style scoped lang="scss">
.stepper {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.8rem;
  background-color: var(--translucent-light);

  > .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 2.4rem;
      min-width: 2rem;
      text-align: center;
    }

    h2 {
      font-size: 1rem;
      color: var(--primary);
    }
  }

  > button {
    height: 3.2rem;
    width: auto;
    margin: 0 0.4rem;
    padding: 0.4rem;
  }
}
</style>
