<template>
  <div class="thing-tile">
    <!-- <i class="fas fa-theater-masks"></i> -->
    <div class="thing-tile__content">
      <div class="header">
        <h2>{{ props.thing.name }}</h2>

        <button
          class="btn btn--icon"
          @click="
            ModalController.open(EditThingModal, {
              propertyName,
              thing: props.thing,
              idPrefix: props.idPrefix,
              onEdit: onEditThing
            })
          "
        >
          <i class="fas fa-edit"></i>
        </button>
      </div>

      <p>{{ props.thing.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Thing } from '../game-data/game-data-types';
import EditThingModal from './modals/modal-content/EditThingModal.vue';
import ModalController from '@/controllers/modal-controller';

const props = defineProps<{
  thing: Thing;
  propertyName: string;
  idPrefix: string;
  onEdit: (thing: Thing) => void;
  onDelete: (id: string) => void;
}>();

function onEditThing(thing: Thing) {
  props.onEdit(thing);
}

function onDeleteThing(id: string) {
  props.onDelete(id);
}
</script>

<style lang="scss" scoped>
.thing-tile {
  position: relative;
  display: flex;
  gap: 1rem;
  background-color: var(--translucent-light);
  padding: 1.6rem;
  color: var(--light);
  border: 1px solid transparent;
  transition: border 0.2s;
  width: 100%;

  > i {
    // fit the font size to the height of the parent
    font-size: 4rem;
    color: var(--translucent-primary-heavy);
  }

  > .thing-tile__content {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
    width: 100%;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;

    h2 {
      flex: 1;
      max-width: 100%;
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
    font-style: italic;
    opacity: 0.8;
    font-size: 1.2rem;
  }
}
</style>
