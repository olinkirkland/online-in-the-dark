<template>
  <div class="page-layout">
    <TheNavigation />
    <div class="page-layout__content">
      <router-view name="page"></router-view>
    </div>
  </div>
  <TheModalContainer />
</template>

<script setup lang="ts">
import TheNavigation from './components/TheNavigation.vue';
import TheModalContainer from './components/modals/TheModalContainer.vue';
</script>

<style lang="scss">
@import './assets/scss/styles.scss';
@import './assets/scss/markdown-styles.scss';

.page-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  min-height: 100vh; // Old browsers
  min-height: 100dvh; // New browsers
  min-height: -webkit-fill-available; // iOS
  max-height: 100vh; // Old browsers
  max-height: 100dvh; // New browsers
  max-height: -webkit-fill-available; // iOS
  > .page-layout__content {
    flex: 1;
    overflow: hidden;
    display: flex;
  }
}
</style>
