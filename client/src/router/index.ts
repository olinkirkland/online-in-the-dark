import { createGuestAccount, fetchMyAccount } from '@/api/account';
import { fetchAccessToken } from '@/api/connection';
import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
import { disconnectFromGame } from '@/controllers/game-controller';
import ModalController from '@/controllers/modal-controller';
import TheHomePage from '@/pages/TheHomePage.vue';
import TheInvitePage from '@/pages/TheInvitePage.vue';
import TheLostPage from '@/pages/TheLostPage.vue';
import { useTokenStore } from '@/stores/token-store';
import { useUserStore } from '@/stores/user-store';
import { ref } from 'vue';
import { RouterOptions, createRouter, createWebHistory } from 'vue-router';
import TheGamePage from '../pages/TheGamePage.vue';

export const currentPageName = ref();
export enum PageName {
  HOME = 'home',
  GAMES = 'games',
  GAME = 'game',
  INVITE = 'invite',
  SETTINGS = 'settings',
  LOST = 'lost'
}

const routes = [
  {
    path: '/',
    components: {
      page: TheHomePage
    },
    name: PageName.HOME
  },
  {
    path: '/game/:id',
    components: {
      page: TheGamePage
    },
    name: PageName.GAME
  },
  {
    path: '/invite/:code',
    components: {
      page: TheInvitePage
    },
    name: PageName.INVITE
  },
  {
    path: '/:pathMatch(.*)*',
    components: {
      page: TheLostPage // 404 page
    },
    name: PageName.LOST
  }
];

const routerOptions = {
  history: createWebHistory(),
  routes
};

export const router = createRouter(routerOptions as RouterOptions);

router.afterEach(async (to, from) => {});

router.beforeEach(async (to, from, next) => {
  disconnectFromGame();

  ModalController.open(LoadingModal, { backgroundClass: 'opaque' });

  if (useTokenStore().refreshToken && !useTokenStore().accessToken)
    await fetchAccessToken();

  if (!useUserStore().id) {
    console.log('@index.ts: fetchMyAccount() because no user id');
    await fetchMyAccount();
  }

  if (!useTokenStore().refreshToken || !useUserStore().id)
    await createGuestAccount(); // Create a guest account

  ModalController.close();

  // if (useUserStore().isGuest && !from.name)
  //   ModalController.open(GuestReminderModal);

  currentPageName.value = to.name;

  next();
});
