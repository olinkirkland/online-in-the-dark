<template>
  <div class="item-tile" :class="{ active: props.item.quantity > 0 }">
    <div class="header">
      <h2>{{ props.item.name }}</h2>

      <div class="selection-bar">
        <button class="btn btn--icon btn--toggle" @click="onClickToggle">
          <h2>{{ item.load }}</h2>
        </button>
      </div>

      <button
        class="btn btn--icon"
        @click="
          ModalController.open(EditItemModal, {
            propertyName,
            item: props.item,
            idPrefix: props.idPrefix,
            onDelete: onDeleteItem,
            onEdit: onEditItem
          })
        "
      >
        <i class="fas fa-edit"></i>
      </button>
    </div>
    <CollapsingShelf :show="props.item.quantity > 0">
      <p v-html="text(props.item.description || '')"></p>
    </CollapsingShelf>
  </div>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { text } from '@/util/string';
import { defineProps } from 'vue';
import { Item } from '../game-data/game-data-types';
import CollapsingShelf from './CollapsingShelf.vue';
import EditItemModal from './modals/modal-content/EditItemModal.vue';

const props = defineProps<{
  item: Item;
  idPrefix: string;
  propertyName: string;
  change: (quantity: number) => void;
  onEdit?: (item: Item) => void;
  onDelete?: (id: string) => void;
}>();

function onEditItem(item: Item) {
  if (!props.onEdit) return;
  props.onEdit(item);
}

function onDeleteItem(id: string) {
  if (!props.onDelete) return;
  props.onDelete(id);
}

function onClickToggle() {
  props.change(props.item.quantity > 0 ? 0 : 1);
}
</script>

<style lang="scss" scoped>
.item-tile {
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

    .btn--toggle {
      h2 {
        font-size: 2rem;
        width: 2rem;
      }
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

.item-tile.active {
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
