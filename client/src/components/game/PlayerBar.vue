<template>
  <ul class="player-bar">
    <li
      v-for="(player, playerId) in useGameStore().game?.players"
      :key="playerId"
      :class="{ 'inactive-player': !player.isOnline }"
    >
      <Portrait :portraitId="player.portrait" />
      <Tooltip top :text="player.username" />
      <div
        class="online-indicator"
        :class="{
          'online-indicator--online': player.isOnline
        }"
      ></div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game-store';
import Portrait from '../Portrait.vue';
import Tooltip from '../Tooltip.vue';
</script>

<style lang="scss" scoped>
.player-bar {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  list-style: none;
  width: fit-content;
  animation: slideUp 0.3s;

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;

    &.inactive-player {
      > .portrait {
        opacity: 0.5;
      }
    }
  }
}

.online-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1.6rem;
  height: 1.6rem;
  transform: translate(50%, 50%);
  border: 0.4rem solid var(--dark);
  border-radius: 50%;
  transition: background-color 0.2s;
  background-color: var(--dark-2);

  &--online {
    background-color: var(--green);
  }
}
</style>
