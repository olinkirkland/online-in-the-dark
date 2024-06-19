<template>
  <ModalFrame :class="{ disabled: busy }">
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Change Username</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="change-username">
        <p>Choose a new <em>username</em> for your account.</p>
        <p class="muted">
          Your current username is
          <em> {{ useUserStore().username }}</em
          >.
        </p>
        <div class="inputs">
          <div class="input-group">
            <label for="username">New Username</label>
            <input
              type="text"
              @input="usernameTouched = true"
              @keydown.enter="onClickChangeUsername"
              placeholder="Enter a new username"
              v-model="username"
            />
            <span class="reminder shake-once" v-if="usernameError">
              {{ usernameError }}
            </span>
          </div>
        </div>
        <div class="alert" v-if="changeUsernameError">
          <i class="fas fa-exclamation-circle"></i>
          <span>{{ changeUsernameError }}</span>
          <button class="btn btn--icon close" @click="changeUsernameError = ''">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="row center">
          <button class="btn mobile-full-width" @click="onClickChangeUsername">
            <i v-if="busy" class="fas fa-circle-notch fa-spin"></i>
            <span>Change Username</span>
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import { changeUsername } from '@/api/account';
import ModalController from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/user-store';
import { computed, ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import InfoModal from './InfoModal.vue';

const changeUsernameError = ref('');
const busy = ref(false);

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

async function onClickChangeUsername() {
  if (!usernameTouched.value || usernameError.value) {
    // Touch each field to show error messages
    usernameTouched.value = true;

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
  changeUsernameError.value = '';
  const response = await changeUsername(username.value);
  busy.value = false;
  if (response) changeUsernameError.value = response;
  else {
    ModalController.open(InfoModal, {
      title: 'Success',
      message: `Username has been changed successfully. Your username is now <em>${username.value}</em>.`
    });
  }
}
</script>

<style scoped lang="scss">
.change-username {
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
