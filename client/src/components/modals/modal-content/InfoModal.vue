<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader>
        <h2>{{ props.title }}</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="info">
        <p v-html="props.message"></p>
        <button class="btn mobile-full-width" @click="ModalController.close()">
          <span>Okay</span>
        </button>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';

const props = defineProps<{
  title: string;
  message: string;
}>();
</script>

<style scoped lang="scss">
.modal {
  .info {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
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
