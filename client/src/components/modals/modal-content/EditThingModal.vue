<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Edit {{ propertyName }}</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="edit">
        <div class="input-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="thing.name"
            placeholder="Enter a memorable name"
          />
        </div>

        <div class="input-group disabled">
          <label for="id"
            >ID
            <label class="muted">(permanent)</label>
          </label>
          <input
            type="text"
            id="id"
            v-model="thing.id"
            placeholder="A hyphenated identifier"
          />
        </div>

        <div class="input-group stretch">
          <label for="description"
            >Description
            <label class="muted">({{ thing.description.length }} / 400) </label>
          </label>
          <textarea
            id="description"
            v-model="thing.description"
            placeholder="A brief description"
          ></textarea>
        </div>

        <div class="row">
          <button class="btn mobile-full-width" @click="onClickSave">
            <span>Save</span>
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { Thing } from '@/game-data/game-data-types';
import { ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';

const props = defineProps<{
  propertyName?: string;
  thing: Thing;
  onEdit?: (thing: Thing) => void;
  idPrefix?: string;
}>();

const thing = ref({ ...props.thing });

function onClickSave() {
  if (!props.onEdit) return;
  props.onEdit(thing.value);
  ModalController.close();
}
</script>

<style scoped lang="scss">
.modal {
  width: 48rem;

  .edit {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    min-height: 100%;
    width: 100%;

    textarea {
      resize: vertical;
      max-height: unset;
      flex: 1;
    }
  }
}

:deep(.modal__header) {
  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
