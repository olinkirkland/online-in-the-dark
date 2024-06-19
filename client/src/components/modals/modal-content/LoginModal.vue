<template>
  <ModalFrame :class="{ disabled: busyLoggingIn }">
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Login</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="login">
        <p>Enter your <em>username</em> and <em>password</em>.</p>
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
              @keyup.enter="onClickLogin"
              placeholder="Create a password"
              v-model="password"
            />
            <span class="reminder shake-once" v-if="passwordError">
              {{ passwordError }}
            </span>
          </div>
        </div>
        <div class="alert" v-if="loginError">
          <i class="fas fa-exclamation-circle"></i>
          <span>{{ loginError }}</span>
          <button class="btn btn--icon close" @click="loginError = ''">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="row center">
          <button class="btn mobile-full-width" @click="onClickLogin">
            <i v-if="busyLoggingIn" class="fas fa-circle-notch fa-spin"></i>
            <span>Login</span>
          </button>
        </div>
        <div class="row center">
          <p>Don't have an account?</p>
          <button class="btn btn--text" @click="onClickRegister">
            Register
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import { login } from '@/api/account';
import ModalController from '@/controllers/modal-controller';
import { computed, ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import CreateAccountModal from './CreateAccountModal.vue';

const loginError = ref('');
const busyLoggingIn = ref(false);

const username = ref('');
const usernameTouched = ref(false);
const usernameError = computed(() => {
  if (!usernameTouched.value) return null;
  if (username.value.length === 0) return 'Your username, please';
  return null;
});

const password = ref('');
const passwordWasTouched = ref(false);
const passwordError = computed(() => {
  if (!passwordWasTouched.value) return null;
  if (password.value.length === 0) return 'Did you forget something?';
  return null;
});

const canLogin = computed(() => {
  return username.value.length > 0 && password.value.length > 0;
});

async function onClickLogin() {
  if (!canLogin.value) {
    if (
      !usernameTouched.value ||
      !passwordWasTouched ||
      usernameError.value ||
      passwordError.value
    ) {
      usernameTouched.value = true;
      passwordWasTouched.value = true;

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
  }

  busyLoggingIn.value = true;
  loginError.value = '';
  const response = await login(username.value, password.value);
  busyLoggingIn.value = false;
  if (!response.refreshToken) loginError.value = response;
  else ModalController.close();
}

function onClickRegister() {
  ModalController.open(CreateAccountModal);
}
</script>

<style scoped lang="scss">
.login {
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
