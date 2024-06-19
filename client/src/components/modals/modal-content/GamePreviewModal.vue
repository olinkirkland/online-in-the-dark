<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Game Preview</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="game-preview">
        <div
          class="title-block"
          :style="{ backgroundColor: coverImage?.commonColor }"
        >
          <img class="game-preview__cover" :src="coverImage?.url" />
          <div class="overlay">
            <h1>{{ game.name }}</h1>
          </div>
        </div>
        <div class="row center game-join-bar">
          <span class="tag">{{ userPlayer.role }}</span>
          <div class="row users">
            <i class="fas fa-users"></i>
            <span>{{ Object.keys(game.players).length }}</span>
          </div>
          <button class="btn mobile-full-width" @click="onClickJoinGame">
            <span>Play</span>
          </button>
        </div>
        <Divider />
        <h3>Players</h3>
        <div class="players-container">
          <div
            class="row center waiting-players"
            :class="{ collapsed: Object.keys(game.players).length > 0 }"
          >
            <i class="fas fa-circle-notch fa-spin"></i>
          </div>
          <ul
            class="players"
            :class="{ collapsed: Object.keys(game.players).length === 0 }"
          >
            <li v-for="(player, id) in game.players" class="row" :key="id">
              <Portrait :portraitId="player.portrait" />
              <span>{{ player.username }}</span>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import coverImages from '@/assets/data/cover-images.json';
import Divider from '@/components/Divider.vue';
import Portrait from '@/components/Portrait.vue';
import ModalController from '@/controllers/modal-controller';
import { router } from '@/router';
import { useUserStore } from '@/stores/user-store';
import { Game } from '@/types/game';
import { computed } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';

const props = defineProps<{
  game: Game;
}>();

const userPlayer = computed(() => props.game.players[useUserStore().id]);

const coverImage = computed(() => {
  return coverImages.find((image) => image.id === props.game.coverImage);
});

function onClickJoinGame() {
  router.push({ name: 'game', params: { id: props.game._id } });
  ModalController.close();
}
</script>

<style scoped lang="scss">
.modal {
  min-width: 64rem;
  max-width: 64rem;
}
:deep(.modal__header) {
  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.game-preview {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;

  .title-block {
    position: relative;
    border: 1px solid var(--dark-2);
    line-height: 0;

    img.game-preview__cover {
      width: 100%;
      height: 16rem;
      object-fit: cover;
      object-position: 50% 50%;
    }

    > .overlay {
      position: absolute;
      line-height: normal;
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
      padding: 1.6rem;
      justify-content: center;
      align-items: center;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.35);
      h1 {
        text-align: center;
        width: 100%;
        color: var(--light);
        font-size: 2.8rem;
        text-shadow: 2px 2px 2px var(--dark);
      }
    }
  }

  .game-join-bar {
    > button {
      margin-left: 4rem;
    }
  }

  .players-container {
    position: relative;
    width: 100%;
    min-height: 4rem;

    ul.players {
      display: grid;
      overflow-y: auto;
      scrollbar-width: none;
      grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
      background-color: var(--translucent-light);
      padding: 0.4rem 1rem;
      max-height: 100rem;
      opacity: 1;
      transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);

      > li {
        padding: 1.2rem 0.8rem;
        gap: 1.6rem;
        display: flex;
        align-items: center;

        i {
          font-size: 1.2rem;
          opacity: 0.5;
        }

        > span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      &.collapsed {
        max-height: 0;
        opacity: 0;
        transition: max-height 1s ease-in-out;
      }
    }

    .waiting-players {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: opacity 1s;

      &.collapsed {
        opacity: 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .game-preview {
    ul.players > li:not(:last-child) {
      border-bottom: 1px solid var(--dark-2);
    }
  }
}
</style>
