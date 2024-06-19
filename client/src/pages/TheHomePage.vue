<template>
  <div class="page">
    <Ribbon
      id="welcome-ribbon"
      message="<em>Online in the Dark</em> is an unofficial tool designed for playing <em>Blades in the Dark</em> online. Click to view the full attribution."
      :onActivate="
        () => {
          ModalController.open(AttributionModal);
        }
      "
    />
    <ul class="game-list">
      <li v-for="game in games" :key="game._id">
        <GameCard :game="game" @click="onClickGame(game)" />
      </li>
      <li>
        <div class="new-game-card" @click="onClickNewGame">
          <i class="fas fa-folder-plus"></i>
          <span>New Game</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { fetchMyAccount } from '@/api/account';
import GameCard from '@/components/GameCard.vue';
import Ribbon from '@/components/Ribbon.vue';
import AttributionModal from '@/components/modals/modal-content/AttributionModal.vue';
import CreateGameModal from '@/components/modals/modal-content/CreateGameModal.vue';
import GamePreviewModal from '@/components/modals/modal-content/GamePreviewModal.vue';
import ModalController from '@/controllers/modal-controller';
import { router } from '@/router';
import { useUserStore } from '@/stores/user-store';
import { Game } from '@/types/game';
import { computed, onMounted } from 'vue';

async function onClickNewGame() {
  ModalController.open(CreateGameModal);
}

const games = computed(() => useUserStore().games);

function onClickGame(game: Game) {
  router.push({ name: 'game', params: { id: game._id } });
}

onMounted(() => {
  fetchMyAccount();
});
</script>

<style lang="scss" scoped>
.page {
  gap: 0;
}

ul.game-list {
  padding: 1rem;
  margin: 0;
  display: grid;
  width: 100%;
  height: 100%;
  align-content: start;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  overflow-y: auto;

  > li {
    cursor: pointer;

    &:hover {
      filter: brightness(1.1);
    }
  }
}

.new-game-card {
  border: 1px solid var(--primary);
  color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
  gap: 1rem;
  border-radius: 5px;
  background-color: var(--translucent-light);
  box-shadow: var(--shadow);
  transition: background-color 0.3s;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  > span {
    font-size: 1rem;
  }
}
</style>
