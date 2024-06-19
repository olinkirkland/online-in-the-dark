<template>
  <ModalFrame :disabled="busyDeleting">
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Delete Account</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="confirm">
        <p>
          This action is <em>irreversible</em>. All data related to your account
          will be <em>lost</em>. Are you sure you want to continue and delete
          your account?
        </p>

        <div class="input-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            v-model="password"
          />
        </div>

        <div class="alert" v-if="passwordError">
          <i class="fas fa-exclamation-circle"></i>
          <span>{{ passwordError }}</span>
          <button class="btn btn--icon close" @click="passwordError = ''">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <Divider />

        <div class="column center">
          <button class="btn" @click="ModalController.close()">
            <span>No, I want to keep my account</span>
          </button>
          <span class="muted">or</span>
          <button
            class="btn btn--text"
            @click="tryDeleteAccount"
            :class="{ disabled: !password }"
          >
            <span>Yes, I want to delete my account</span>
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import { deleteAccount, logout } from '@/api/account';
import Divider from '@/components/Divider.vue';
import ModalController from '@/controllers/modal-controller';
import { ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';

const password = ref('');
const passwordError = ref('');
const busyDeleting = ref(false);

async function tryDeleteAccount() {
  busyDeleting.value = true;
  passwordError.value = '';
  passwordError.value = await deleteAccount(password.value);
  if (!passwordError.value) {
    ModalController.close();
    logout(); // This will also clear the user store and redirect
  }

  busyDeleting.value = false;
}
</script>

<style scoped lang="scss">
.confirm {
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
</style>
