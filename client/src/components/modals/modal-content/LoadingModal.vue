<template>
  <div class="loading">
    <Logo big />
    <i class="fas fa-circle-notch fa-spin"></i>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue';
</script>

<style scoped lang="scss">
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 8rem;
  > i {
    font-size: 2.4rem;
    color: var(--primary);
  }
}
</style>
