import { Game } from '@/types/game';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from './user-store';

export const useGameStore = defineStore('game', () => {
  const game = ref<Game | null>(null);

  const clear = () => {
    game.value = null;
  };

  const userPlayer = computed(() => game.value?.players[useUserStore().id]);

  return {
    game,
    userPlayer,
    clear
  };
});
