import { Game } from '@/types/game';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import portraitsJson from '@/assets/data/portrait-images.json';

export const useUserStore = defineStore('user', () => {
  const id = ref();
  const username = ref();
  const isGuest = ref(true);
  const portrait = ref();
  const games = ref<Game[]>([]);
  const portraits = ref([...portraitsJson]);

  const clear = () => {
    id.value = null;
    username.value = null;
    portrait.value = null;
    isGuest.value = true;
    games.value = [];
  };

  return {
    id,
    username,
    portrait,
    isGuest,
    games,
    clear,
    portraits
  };
});
