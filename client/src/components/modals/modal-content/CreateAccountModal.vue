<template>
  <ModalFrame :class="{ disabled: busyRegistering }">
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Register your Account</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="create-account">
        <p>
          Choose a <em>username</em> and <em>password</em> to register your
          account.
        </p>
        <div class="inputs">
          <div class="input-group">
            <label for="username">Username</label>
            <input
              type="text"
              @input="usernameTouched = true"
              placeholder="Enter a username"
              v-model="username"
            />
            <span class="reminder shake-once" v-if="usernameError">
              {{ usernameError }}
            </span>
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              @input="passwordWasTouched = true"
              placeholder="Create a password"
              v-model="password"
            />
            <span class="reminder shake-once" v-if="passwordError">
              {{ passwordError }}
            </span>
          </div>
          <div class="input-group">
            <label for="confirm-password">Confirm Password</label>
            <input
              type="password"
              @input="passwordConfirmationWasTouched = true"
              @keyup.enter="onClickRegister"
              placeholder="Confirm your password"
              v-model="passwordConfirmation"
            />
            <span class="reminder shake-once" v-if="passwordConfirmationError">
              {{ passwordConfirmationError }}
            </span>
          </div>
        </div>
        <div class="alert" v-if="registerError">
          <i class="fas fa-exclamation-circle"></i>
          <span>{{ registerError }}</span>
          <button class="btn btn--icon close" @click="registerError = ''">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="row center">
          <button class="btn mobile-full-width" @click="onClickRegister">
            <i v-if="busyRegistering" class="fas fa-circle-notch fa-spin"></i>
            <span>Register Account</span>
          </button>
        </div>

        <div class="row center">
          <p>Already have an account?</p>
          <button class="btn btn--text" @click="onClickLogin">Log in</button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import { registerAccount } from '@/api/account';
import ModalController from '@/controllers/modal-controller';
import { computed, ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import LoginModal from './LoginModal.vue';

const registerError = ref('');
const busyRegistering = ref(false);

const username = ref('');
const usernameTouched = ref(false);
const usernameError = computed(() => {
  if (!usernameTouched.value) return null;
  if (username.value.length === 0) return 'What should we call you?';
  if (username.value.length < 3) return 'Must be at least 3 characters';
  if (username.value.length > 24) return 'Must have no more than 16 characters';
  if (!/^[a-zA-Z0-9]+$/.test(username.value)) return 'Letters and numbers only';
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
  if (passwordConfirmation.value.length === 0) return 'Your password again';
  if (password.value !== passwordConfirmation.value)
    return `Passwords don't match`;
  return null;
});

async function onClickRegister() {
  if (
    !usernameTouched.value ||
    !passwordWasTouched.value ||
    !passwordConfirmationWasTouched.value ||
    usernameError.value ||
    passwordError.value ||
    passwordConfirmationError.value
  ) {
    // Touch each field to show error messages
    usernameTouched.value = true;
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

  busyRegistering.value = true;
  registerError.value = '';
  const response = await registerAccount(username.value, password.value);
  busyRegistering.value = false;
  if (response) registerError.value = response;
  else ModalController.close();
}

function onClickLogin() {
  ModalController.open(LoginModal);
}
</script>

<style scoped lang="scss">
.create-account {
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
