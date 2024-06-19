<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>{{ props.onCreateNew ? 'Create a new' : 'Edit' }} {{ propertyName }}</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="edit">
        <div class="input-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="effectable.name"
            placeholder="Enter a memorable name"
            @input="updateIdFromName(effectable.name)"
          />
        </div>

        <div class="input-group" :class="{ disabled: !props.onCreateNew }">
          <label for="id"
            >ID
            <label class="muted">(permanent)</label>
          </label>
          <input
            type="text"
            id="id"
            v-model="effectable.id"
            placeholder="A hyphenated identifier"
          />
        </div>

        <div class="input-group stretch">
          <label for="description"
            >Description
            <label class="muted"
              >({{ effectable.description.length }} / 400)
            </label>
          </label>
          <textarea
            id="description"
            v-model="effectable.description"
            placeholder="A brief description"
          ></textarea>
        </div>

        <div class="input-group">
          <label for="maxQuantity">Max Quantity</label>
          <input
            type="number"
            id="maxQuantity"
            v-model="effectable.maxQuantity"
            placeholder="1, 2, 3..."
          />
        </div>

        <div class="row" v-if="props.onCreateNew">
          <button
            class="btn btn--alt mobile-full-width"
            @click="ModalController.close()"
          >
            <span>Cancel</span>
          </button>
          <button class="btn mobile-full-width" @click="onClickCreate">
            <span>New</span>
          </button>
        </div>
        <div class="row" v-else>
          <button class="btn btn--alt mobile-full-width" @click="onClickDelete">
            <i class="fas fa-trash"></i>
            <span>Delete</span>
          </button>
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
import { Effectable } from '@/game-data/game-data-types';
import { ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';

const props = defineProps<{
  propertyName?: string;
  effectable?: Effectable;
  onEdit?: (eff: Effectable) => void;
  onDelete?: (id: string) => void;
  idPrefix?: string;

  // There are two ways to use this modal:
  // Edit an existing effectable or create a new one.
  // The default is to edit an existing effectable. To create a new one, pass a function to onCreateNew.
  // All other props will be ignored in this case.
  onCreateNew?: (effectable: Effectable) => void;
}>();

const blankEffectable: Effectable = {
  id: '',
  name: '',
  description: '',
  quantity: 0,
  maxQuantity: 1
};

const effectable = ref({ ...(props.effectable || blankEffectable) });

function updateIdFromName(name: string) {
  if (!props.onCreateNew) return;

  // Create a hyphenated ID from the name
  // Start with the id prefix, if it exists
  let newId = (props.idPrefix || '') + '-' + name;

  // Replace only spaces with hyphens, everything else that's not a letter or number, delete
  newId = newId
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');

  effectable.value.id = newId;
}

function onClickCreate() {
  if (!props.onCreateNew) return;
  props.onCreateNew(effectable.value);
  ModalController.close();
}

function onClickSave() {
  if (!props.onEdit) return;
  props.onEdit(effectable.value);
  ModalController.close();
}

function onClickDelete() {
  if (!props.onDelete) return;
  props.onDelete(effectable.value.id);
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
