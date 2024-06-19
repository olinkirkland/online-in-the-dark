<template>
  <div
    class="effectable-tile"
    :class="{ active: props.effectable.quantity > 0 }"
  >
    <div class="header">
      <h2>{{ props.effectable.name }}</h2>

      <button
        v-if="props.onEdit"
        class="btn btn--icon"
        @click="
          ModalController.open(EditEffectableModal, {
            propertyName,
            effectable: props.effectable,
            idPrefix: props.idPrefix,
            onDelete: onDeleteEffectable,
            onEdit: onEditEffectable
          })
        "
        :class="{
          removed: lockLevel < 2
        }"
      >
        <i class="fas fa-edit"></i>
      </button>
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
    <p v-html="text(props.effectable.description || '')"></p>
  </div>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { useGameStore } from '@/stores/game-store';
import { text } from '@/util/string';
import { computed, defineProps, ref, watch } from 'vue';
import { Effectable } from '../game-data/game-data-types';
import Checkbox from './Checkbox.vue';
import EditEffectableModal from './modals/modal-content/EditEffectableModal.vue';

const props = defineProps<{
  effectable: Effectable;
  idPrefix: string;
  propertyName: string;
  change: (quantity: number) => void;
  onEdit?: (effectable: Effectable) => void;
  onDelete?: (id: string) => void;
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

function onEditEffectable(effectable: Effectable) {
  if (!props.onEdit) return;
  props.onEdit(effectable);
}

function onDeleteEffectable(id: string) {
  if (!props.onDelete) return;
  props.onDelete(id);
}
</script>

<style lang="scss" scoped>
.effectable-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background-color: var(--translucent-light);
  padding: 1.6rem;
  padding-top: 2.2rem;
  color: var(--light);
  border: 1px solid transparent;
  transition: border 0.2s;
  margin-top: 1.2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
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
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 0;

    width: fit-content;
    border-radius: 99px;
    border: 1px solid transparent;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--darker);
      border-radius: 99px;
    }

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

.effectable-tile.active {
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
      background: var(--primary);
      border-radius: 0 0 99px 99px;
    }
  }
}
</style>
