<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Game Options</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="options">
        <section class="game-name">
          <div class="input-group">
            <label for="name">Game Name</label>
            <input
              type="text"
              :class="{
                disabled: useGameStore().userPlayer?.role !== PlayerRole.GM
              }"
              @change="onChangeGameName"
              placeholder="Enter a descriptive name"
              v-model="gameName"
            />
            <span class="reminder shake-once" v-if="nameError">
              {{ nameError }}
            </span>
          </div>
        </section>
        <section class="invite">
          <label>Invite a Player</label>
          <div class="row invite-block">
            <div class="row">
              <p class="muted text-center">{{ inviteLink }}</p>
              <button
                class="btn btn--icon muted"
                @click="onClickCopyInviteLink"
              >
                <i class="fas fa-copy"></i>
              </button>
            </div>
            <button
              class="btn btn--icon muted"
              @click="onClickRegenerateInviteLink"
              v-if="useGameStore().userPlayer?.role === PlayerRole.GM"
            >
              <i class="fas fa-sync"></i>
            </button>
          </div>
        </section>
        <Divider />
        <section class="codex">
          <label for="manage-codex">Manage Codex</label>

          <InfoBox ignoreOptions>
            <p class="muted">
              The Codex contains descriptions and definitions that are made
              available on the platform.
            </p>
          </InfoBox>

          <p>
            {{
              codexHash === onlineCodexHash
                ? 'The Codex matches the latest version.'
                : 'A newer version of the Codex is available.'
            }}
          </p>

          <button
            class="btn mobile-full-width"
            :class="{ disabled: codexHash === onlineCodexHash }"
            @click="onClickResetCodex"
          >
            <i class="fas fa-sync"></i>
            <span>Reset Codex</span>
          </button>
        </section>
        <Divider />
        <section>
          <div class="input-group">
            <label>Sheets Options</label>
            <Checkbox
              v-model="useOptionsStore().options.showHints"
              icon="fa-check"
              :emptyWhenUnchecked="true"
              label="Show rules hints on the Sheets"
            />
          </div>
        </section>
        <Divider />
        <!-- <div v-if="isGM">
          <section>
            <div class="input-group">
              <label>Game Master Options</label>
              <div class="row lock-box">
                <button
                  v-for="i in [0, 1, 2]"
                  :key="i"
                  class="btn btn--tab btn--tab--big mobile-full-width"
                  :class="{ active: lockLevel === i }"
                  @click="
                    patch([{ op: 'replace', path: '/lockLevel', value: i }])
                  "
                >
                  <i
                    class="fas"
                    :class="{
                      'fa-lock': i === 0,
                      'fa-unlock': i === 1,
                      'fa-lock-open': i === 2
                    }"
                  ></i>
                  <span v-if="i === 0" class="mobile-hidden"
                    >Locked for Players</span
                  >
                  <span v-if="i === 1" class="mobile-hidden"
                    >Players can select
                  </span>
                  <span v-if="i === 2" class="mobile-hidden"
                    >Players can edit</span
                  >
                </button>
              </div>
            </div>
          </section>
          <Divider />
        </div> -->
        <section>
          <div class="row">
            <button
              class="btn btn--alt mobile-full-width"
              @click="onClickAbandonGame"
            >
              <span>Abandon Game</span>
            </button>
          </div>
        </section>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import { leaveGame } from '@/api/games';
import Checkbox from '@/components/Checkbox.vue';
import Divider from '@/components/Divider.vue';
import InfoBox from '@/components/InfoBox.vue';
import { patch } from '@/controllers/game-controller';
import ModalController from '@/controllers/modal-controller';
import { router } from '@/router';
import { useGameStore } from '@/stores/game-store';
import { useOptionsStore } from '@/stores/options-store';
import { PlayerRole } from '@/types/game';
import { makeGameInviteCode } from '@/util/names';
import stringHash from 'string-hash';
import { computed, ref } from 'vue';
import OnlineCodex from '../../../assets/data/codex.json';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import ConfirmModal from './ConfirmModal.vue';
import LoadingModal from './LoadingModal.vue';

const nameError = ref<string | null>(null);
const gameName = ref(useGameStore().game?.name);
const isGM = computed(() => useGameStore().userPlayer?.role === PlayerRole.GM);

const inviteLink = computed(() => {
  return `${window.location.origin}/invite/${useGameStore().game?.inviteCode}`;
});

const codexHash = computed(() => {
  // Use string-hash library to hash the codex
  return stringHash(JSON.stringify(useGameStore().game?.codex) ?? '');
});

const onlineCodexHash = computed(() => {
  // Use string-hash library to hash the online codex
  return stringHash(JSON.stringify(OnlineCodex));
});

function onChangeGameName() {
  if (!gameName.value) {
    nameError.value = 'Name cannot be empty';
    return;
  }

  nameError.value = null;

  patch([
    {
      op: 'replace',
      path: '/name',
      value: gameName.value
    }
  ]);
}

function onClickCopyInviteLink() {
  navigator.clipboard.writeText(inviteLink.value);
}

function onClickRegenerateInviteLink() {
  patch([
    {
      op: 'replace',
      path: '/inviteCode',
      value: makeGameInviteCode()
    }
  ]);
}

function onClickAbandonGame() {
  ModalController.open(ConfirmModal, {
    title: 'Leave Game',
    message: 'Are you sure you want to leave the game?',
    confirmText: 'Leave Game',
    onConfirm: async () => {
      ModalController.open(LoadingModal);
      await leaveGame();
      router.push('/');
      ModalController.close();
    }
  });
}

function onClickResetCodex() {
  patch([
    {
      op: 'replace',
      path: '/codex',
      value: OnlineCodex
    }
  ]);
}
</script>

<style scoped lang="scss">
.modal {
  width: 64rem;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  min-height: 100%;

  > section {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
}

.invite label {
  margin-bottom: 0.4rem;
}

.lock-box {
  display: flex;
  padding: 1.2rem;
  background-color: var(--translucent-very-light);
  border-radius: 5px;
}

.row.invite-block {
  max-width: 100%;

  > .row {
    flex: 1;
    overflow-x: auto;
    background-color: var(--translucent-light);
    height: 4rem;
    padding-left: 1rem;
    border-radius: 5px;

    p {
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  * {
    color: var(--light);
  }
}

section.codex {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
