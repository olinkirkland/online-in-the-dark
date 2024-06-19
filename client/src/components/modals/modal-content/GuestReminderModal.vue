<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Welcome!</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="guest-reminder">
        <p>
          It doesn't look like you have an Online in the Dark account yet.
          <br /><span class="muted"
            >A guest account has been generated for you.</span
          >
        </p>

        <div class="column center">
          <button class="btn" @click="ModalController.open(CreateAccountModal)">
            <span>Register an Account</span>
          </button>
          <span class="muted">or</span>
          <button class="btn btn--text" @click="ModalController.close()">
            <span>Continue as {{ useUserStore().username }}</span>
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/user-store';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import CreateAccountModal from './CreateAccountModal.vue';
</script>

<style scoped lang="scss">
.guest-reminder {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
</style>
