<template>
  <ModalFrame :class="{ disabled: busy }">
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Change Password</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="change-password">
        <p>Choose a new <em>password</em> for your account.</p>
        <p class="muted">
          Your new password should be at least 8 characters long.
        </p>
        <div class="inputs">
          <div class="input-group">
            <label for="password">Current Password</label>
            <input
              type="password"
              @input="currentPasswordWasTouched = true"
              placeholder="Your current password"
              v-model="currentPassword"
            />
            <span class="reminder shake-once" v-if="currentPasswordError">
              {{ currentPasswordError }}
            </span>
          </div>
          <div class="input-group">
            <label for="password">New Password</label>
            <input
              type="password"
              @input="passwordWasTouched = true"
              placeholder="Create a new password"
              v-model="password"
            />
            <span class="reminder shake-once" v-if="passwordError">
              {{ passwordError }}
            </span>
          </div>
          <div class="input-group">
            <label for="confirm-password">Confirm New Password</label>
            <input
              type="password"
              @input="passwordConfirmationWasTouched = true"
              @keyup.enter="onClickChangePassword"
              placeholder="Confirm your new password"
              v-model="passwordConfirmation"
            />
            <span class="reminder shake-once" v-if="passwordConfirmationError">
              {{ passwordConfirmationError }}
            </span>
          </div>
        </div>
        <div class="alert" v-if="changePasswordError">
          <i class="fas fa-exclamation-circle"></i>
          <span>{{ changePasswordError }}</span>
          <button class="btn btn--icon close" @click="changePasswordError = ''">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="row center">
          <button class="btn mobile-full-width" @click="onClickChangePassword">
            <i v-if="busy" class="fas fa-circle-notch fa-spin"></i>
            <span>Change Password</span>
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import { changePassword } from '@/api/account';
import ModalController from '@/controllers/modal-controller';
import { computed, ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import InfoModal from './InfoModal.vue';

const changePasswordError = ref('');
const busy = ref(false);

const currentPassword = ref('');
const currentPasswordWasTouched = ref(false);
const currentPasswordError = computed(() => {
  if (!passwordWasTouched.value) return null;
  if (password.value.length === 0) return 'Enter your current password';
  return null;
});

const password = ref('');
const passwordWasTouched = ref(false);
const passwordError = computed(() => {
  if (!passwordWasTouched.value) return null;
  if (password.value.length === 0) return 'Come up with something clever';
  if (password.value.length < 8) return 'Must be at least 8 characters';
  if (password.value.length > 64) return `Can't be more than 64 characters`;
  return null;
});

const passwordConfirmation = ref('');
const passwordConfirmationWasTouched = ref(false);
const passwordConfirmationError = computed(() => {
  if (!passwordConfirmationWasTouched.value) return null;
  if (passwordConfirmation.value.length === 0) return 'Your new password again';
  if (password.value !== passwordConfirmation.value)
    return `Passwords don't match`;
  return null;
});

async function onClickChangePassword() {
  if (
    !currentPasswordWasTouched.value ||
    !passwordWasTouched.value ||
    !passwordConfirmationWasTouched.value ||
    currentPasswordError.value ||
    passwordError.value ||
    passwordConfirmationError.value
  ) {
    // Touch each field to show error messages
    currentPasswordWasTouched.value = true;
    passwordWasTouched.value = true;
    passwordConfirmationWasTouched.value = true;

    // Force restart each animation
    const reminders = document.querySelectorAll('.reminder');
    reminders.forEach((reminder) => {
      reminder.classList.remove('shake-once');
      // @ts-ignore
      reminder.offsetWidth; // => This is a hack to force a reflow
      reminder.classList.add('shake-once');
    });

    return;
  }

  busy.value = true;
  changePasswordError.value = '';
  const response = await changePassword(currentPassword.value, password.value);
  busy.value = false;
  if (response) changePasswordError.value = response;
  else {
    ModalController.open(InfoModal, {
      title: 'Success',
      message: `Your password has been changed successfully.`
    });
  }
}
</script>

<style scoped lang="scss">
.change-password {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    background-color: var(--translucent-light);
    padding: 2rem;
  }
}
</style>
