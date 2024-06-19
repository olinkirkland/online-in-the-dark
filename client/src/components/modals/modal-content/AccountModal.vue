<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>{{ useUserStore().username }}'s Account</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="account">
        <!-- Portrait Selection -->
        <section>
          <p>Choose a portrait from the list below.</p>
          <ul class="portrait-select">
            <li
              v-for="portrait in useUserStore().portraits"
              :key="portrait.id"
              @click="onClickPortrait(portrait.id)"
              :class="{ selected: portrait.id === useUserStore().portrait }"
            >
              <Portrait :portraitId="portrait.id" />
              <div
                class="overlay"
                v-if="portrait.id === useUserStore().portrait"
              ></div>
              <i
                v-if="portrait.id === useUserStore().portrait"
                class="fas fa-check-circle"
              ></i>
            </li>
          </ul>
        </section>

        <Divider />

        <!-- Account Management -->
        <section v-if="useUserStore().isGuest">
          <p>You are currently logged in as a guest.</p>

          <div class="row" v-if="useUserStore().isGuest">
            <button class="btn" @click="onClickRegister">
              <span>Register Account</span>
            </button>
            <button class="btn btn--alt" @click="onClickLogin">
              <i class="fas fa-sign-out-alt"></i>
              <span>Login</span>
            </button>
          </div>
        </section>

        <section class="account-management" v-else>
          <div class="input-group">
            <p>
              Change your username. This will also change your display name in
              all games.
            </p>
            <button
              class="btn mobile-full-width"
              @click="onClickChangeUsername"
            >
              <i class="fas fa-user-edit"></i>
              <span>Change Username</span>
            </button>
          </div>
          <div class="input-group">
            <p>Change your password.</p>
            <button
              class="btn mobile-full-width"
              @click="onClickChangePassword"
            >
              <i class="fas fa-key"></i>
              <span>Change Password</span>
            </button>
          </div>
        </section>

        <Divider />

        <section class="attribution">
          <p>
            <span class="muted"
              >© {{ currentYear }} Olin Kirkland | All rights reserved</span
            >
          </p>
          <p>
            This work is based on
            <a
              class="anchor-link"
              href="http://www.bladesinthedark.com/"
              target="_blank"
            >
              Blades in the Dark
            </a>
            , product of One Seven Design, developed and authored by John
            Harper, and licensed for our use under the
            <a
              class="anchor-link"
              href="http://creativecommons.org/licenses/by/3.0/"
              target="_blank"
            >
              Creative Commons Attribution 3.0 Unported license
            </a>
          </p>
          <button
            class="btn btn--alt mobile-full-width"
            @click="() => ModalController.open(AttributionModal)"
          >
            <span>View Full Attribution</span>
          </button>
        </section>

        <Divider />

        <!-- Footer -->
        <section class="center">
          <button
            class="btn btn--text"
            @click="onClickLogout"
            v-if="!useUserStore().isGuest"
          >
            <span>Sign Out</span>
          </button>

          <button
            class="btn btn--text"
            @click="onClickDeleteAccount"
            v-if="!useUserStore().isGuest"
          >
            <span>Delete Account</span>
          </button>

          <div class="row center id-block">
            <p class="muted text-center">ID: {{ useUserStore().id }}</p>
            <button class="btn btn--icon muted" @click="onClickCopyId">
              <i class="fas fa-copy"></i>
            </button>
          </div>
          <p class="muted text-center">{{ version }}</p>
        </section>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import packageJson from '@/../package.json';
import { changePortrait, logout } from '@/api/account';
import Portrait from '@/components/Portrait.vue';
import AccountModal from '@/components/modals/modal-content/AccountModal.vue';
import ConfirmModal from '@/components/modals/modal-content/ConfirmModal.vue';
import ModalController from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/user-store';
import { getServerVersion } from '@/util/version';
import { onMounted, ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import AttributionModal from './AttributionModal.vue';
import ChangePasswordModal from './ChangePasswordModal.vue';
import ChangeUsernameModal from './ChangeUsernameModal.vue';
import ConfirmDeleteAccountModal from './ConfirmDeleteAccountModal.vue';
import CreateAccountModal from './CreateAccountModal.vue';
import LoginModal from './LoginModal.vue';

const version = ref('');
onMounted(() => {
  getServerVersion().then(
    (v) => (version.value = `${packageJson.version} • ${v}`)
  );
});

const currentYear = new Date().getFullYear();

function onClickLogout() {
  ModalController.open(ConfirmModal, {
    title: 'Sign Out',
    message: 'Are you sure you want to sign out?',
    onConfirm: () => logout(),
    onCancel: () => ModalController.open(AccountModal),
    onConfirmText: 'Yes, I want to sign out',
    onCancelText: 'No, keep me signed in'
  });
}

function onClickDeleteAccount() {
  ModalController.open(ConfirmDeleteAccountModal);
}

function onClickLogin() {
  ModalController.open(LoginModal);
}

function onClickCopyId() {
  navigator.clipboard.writeText(useUserStore().id);
}

function onClickRegister() {
  ModalController.open(CreateAccountModal);
}

function onClickPortrait(portraitId: string) {
  changePortrait(portraitId);
}

function onClickChangeUsername() {
  ModalController.open(ChangeUsernameModal);
}

function onClickChangePassword() {
  ModalController.open(ChangePasswordModal);
}
</script>

<style scoped lang="scss">
.modal {
  width: 64rem;
}

.account {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.id-block > button {
  color: var(--light);
}

.portrait-select {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5.2rem, 1fr));
  gap: 1.6rem;
  background-color: var(--translucent-light);
  padding: 2.4rem;

  > li {
    aspect-ratio: 1;
    // filter: brightness(0.8);
    transition: all 0.2s;
    cursor: pointer;
    overflow: hidden;
    border-radius: 5px;
    position: relative;

    &:not(.selected):hover {
      filter: brightness(1.1);
    }

    > .portrait {
      padding: 0.4rem; // Icons8 version
      max-height: unset;
    }

    > i {
      color: var(--light);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
    }

    .overlay {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: var(--translucent-heavy);
      opacity: 0.5;
    }
  }
}

@media (max-width: 768px) {
  .id-block {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
