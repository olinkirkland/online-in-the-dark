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
            v-model="person.name"
            placeholder="Enter a memorable name"
            @input="updateIdFromName(person.name)"
            @focus="focus = 'name'"
          />
          <CollapsingShelf :show="focus === 'name'">
            <p>Choose a name.</p>
            <button class="btn btn--icon" @mousedown="randomizeName">
              <i class="fas fa-random"></i>
              <span>Randomize</span>
            </button>
          </CollapsingShelf>
        </div>

        <div class="input-group" :class="{ disabled: !props.onCreateNew }">
          <label for="id"
            >ID
            <label class="muted">(permanent)</label>
          </label>
          <input
            type="text"
            id="id"
            v-model="person.id"
            placeholder="A hyphenated identifier"
          />
        </div>

        <div class="input-group stretch">
          <label for="description"
            >Description
            <label class="muted"
              >({{ person.description.length }} / 400)
            </label>
          </label>
          <textarea
            id="description"
            v-model="person.description"
            placeholder="A brief description"
          ></textarea>
        </div>

        <div class="input-group">
          <label for="attitude">Attitude</label>
          <input
            type="number"
            id="attitude"
            v-model="person.attitude"
            placeholder="-1, 0, 1..."
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
import CollapsingShelf from '@/components/CollapsingShelf.vue';
import ModalController from '@/controllers/modal-controller';
import { Person } from '@/game-data/game-data-types';
import { useGameStore } from '@/stores/game-store';
import { pick } from '@/util/rand-helper';
import { onMounted, onUnmounted, ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';

const props = defineProps<{
  propertyName?: string;
  person?: Person;
  onEdit?: (person: Person) => void;
  onDelete?: (id: string) => void;
  idPrefix?: string;

  // There are two ways to use this modal:
  // Edit an existing person or create a new one.
  // The default is to edit an existing person. To create a new one, pass a function to onCreateNew.
  // All other props will be ignored in this case.
  onCreateNew?: (person: Person) => void;
}>();

onMounted(() => {
  document.addEventListener('blur', onBlur, true);
});

onUnmounted(() => {
  document.removeEventListener('blur', onBlur, true);
});

const codex = useGameStore().game?.codex;

const focus = ref();
function onBlur(event: FocusEvent) {
  focus.value = null;
}

function randomizeName() {
  const firstName = pick(codex?.names?.firstNames);
  const lastName = pick(codex?.names?.lastNames);
  const newName = `${firstName} ${lastName}`;
  person.value.name = newName;
  updateIdFromName(newName);
}

const blankPerson: Person = {
  id: '',
  name: '',
  description: '',
  attitude: 0
};

const person = ref({ ...(props.person || blankPerson) });

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

  person.value.id = newId;
}

function onClickCreate() {
  if (!props.onCreateNew) return;
  props.onCreateNew(person.value);
  ModalController.close();
}

function onClickSave() {
  if (!props.onEdit) return;
  props.onEdit(person.value);
  ModalController.close();
}

function onClickDelete() {
  if (!props.onDelete) return;
  props.onDelete(person.value.id);
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
