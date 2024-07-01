<template>
  <div
    class="attribute-tile"
    :class="{ active: props.effectable.quantity > 0 }"
  >
    <div class="header">
      <h2>{{ props.effectable.name }}</h2>
    </div>
    <div class="row selection-bar" :class="{ locked: lockLevel < 1 }">
      <Checkbox
        v-for="i in effectable.maxQuantity"
        :key="effectable.id + i"
        v-model="checkboxValues"
        :value="i.toString()"
        @update:modelValue="updateQuantity(i.toString())"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import { Effectable } from '../game-data/game-data-types';
import Checkbox from './Checkbox.vue';

const props = defineProps<{
  effectable: Effectable;
  change: (quantity: number) => void;
}>();

const lockLevel = 99;

function updateCheckboxes() {
  checkboxValues.value = checkboxValuesFromQuantity(props.effectable.quantity);
}

const checkboxValues = ref<string[]>([]);
updateCheckboxes();

// When the effectable quantity changes, update the checkboxes
watch(() => props.effectable.quantity, updateCheckboxes);

// Watch for changes in the checkboxValues array
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
  props.change(Math.max(largest, 0));
}

function checkboxValuesFromQuantity(quantity: number) {
  return Array.from({ length: quantity }, (_, i) => (i + 1).toString());
}
</script>

<style lang="scss" scoped>
.attribute-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  background-color: var(--translucent-light);
  padding: 0.4rem;
  color: var(--light);
  border: 1px solid transparent;
  transition: border 0.2s;
  margin-top: 1.2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 1.6rem;
      margin-top: 0.4rem;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      font-weight: bold;
    }

    button {
      height: auto;
      padding: 0.4rem;

      &.checked {
        color: var(--primary);
      }
    }
  }

  p {
    opacity: 0.8;
  }

  :deep(p > span) {
    font-size: 1.2rem;
  }

  .selection-bar {
    gap: 0;

    .checkbox-group {
      padding: 0.6rem 0.4rem;
      z-index: 1;

      // First and last, padding left or right 0.8
      &:first-child {
        padding-left: 0.6rem;
      }
      &:last-child {
        padding-right: 0.6rem;
      }
    }

    &.locked {
      pointer-events: none;

      :deep(.checkbox-group:not(.checked) > .icon) {
        background-color: transparent;

        span,
        i {
          color: var(--translucent-light);
        }
      }
    }
  }
}

.attribute-tile.active {
  border: 1px solid var(--primary);
  background-color: var(--translucent-primary-light);

  :deep(.checkbox-group.checked > i) {
    color: var(--primary);
  }

  .selection-bar {
    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      width: calc(100% + 2px); // (1px border on each side
      height: calc(50% + 1px);
      bottom: -1px;
      left: -1px;
      right: 1px;
    }
  }
}
</style>
