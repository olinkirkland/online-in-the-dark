<template>
  <div
    class="checkbox-bar"
    :class="{ 'coin-mode': props.coinMode, locked: lockLevel < 1 }"
  >
    <ul class="checkbox-list">
      <Checkbox
        v-for="i in props.max"
        :class="{ locked: i > props.max - (props.locked ?? 0) }"
        :key="i"
        v-model="checkboxValues"
        :value="i.toString()"
        @update:modelValue="updateQuantity(i.toString())"
        :icon="getIcon(i)"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref, watch } from 'vue';
import Checkbox from './Checkbox.vue';
import { useGameStore } from '@/stores/game-store';

const props = defineProps<{
  value: number;
  locked?: number;
  max: number;
  coinMode?: boolean;
}>();

const emit = defineEmits<{
  (e: 'change', value: number): void;
}>();

const lockLevel = 99;

const internalValue = ref(props.value);
const checkboxValues = ref<string[]>([]);
updateCheckboxes();

function updateCheckboxes() {
  checkboxValues.value = checkboxValuesFromQuantity(internalValue.value);
}

function checkboxValuesFromQuantity(quantity: number): string[] {
  return Array.from({ length: quantity }, (_, i) => (i + 1).toString());
}

watch(
  () => props.value,
  (newValue) => {
    internalValue.value = newValue;
  }
);

function getIcon(i: number) {
  // Is it locked?
  if (i > props.max - (props.locked ?? 0)) return 'fas fa-lock';

  // Is it checked AND coinMode?
  if (props.coinMode && checkboxValues.value.includes(i.toString()))
    return 'fas fa-crown';

  // Is it checked?
  if (checkboxValues.value.includes(i.toString())) return 'fas fa-check';

  // Otherwise, return a blank icon (has to be some string)
  return 'N/A';
}

function updateQuantity(lastClicked: string) {
  let values = checkboxValues.value;

  // Uncheck all checkboxes larger than the last clicked checkbox
  values = values.filter((v) => parseInt(v) <= parseInt(lastClicked));

  const largest = Math.max(...values.map((v) => parseInt(v)));
  // Check all checkboxes smaller than the largest checkbox
  values = values.map((v) => (parseInt(v) <= largest ? v : lastClicked));

  // Set the checkboxValues array to a new array, equal to a range from 1 to the largest checkbox
  checkboxValues.value = Array.from({ length: largest }, (_, i) =>
    (i + 1).toString()
  );

  // TODO: Not gonna debug this right now, but largest is Negative Infinity
  internalValue.value = Math.max(largest, 0);
  emit('change', internalValue.value);
}
</script>

<style scoped lang="scss">
.checkbox-bar {
  display: flex;
  padding: 0.4rem 0.6rem;
  background-color: var(--translucent-light);
  width: fit-content;

  h1 {
    width: 2rem;
    text-align: center;
    font-size: 3.6rem;
  }

  ul.checkbox-list {
    display: flex;
    gap: 0;

    .checkbox-group {
      padding: 0.2rem;
    }
  }

  .locked {
    opacity: 0.4 !important;
    pointer-events: none;
  }

  &.coin-mode {
    padding-bottom: 1.4rem;
    background: none;
    ul.checkbox-list {
      display: grid;
      grid-template-columns: repeat(8, 1fr);

      .checkbox-group {
        border: 1px solid transparent;

        &:nth-child(2n) {
          transform: translateY(1rem);
        }
      }
    }
  }

  &:not(.coin-mode) {
    :deep(.icon) {
      border-radius: 0;
      margin: 0;
      width: 1.6rem;
      height: 2.4rem;
    }
  }
}

.checkbox-bar.locked .checkbox-group {
  opacity: 0.2;

  &.checked,
  &.locked {
    opacity: unset;
  }
}
</style>
