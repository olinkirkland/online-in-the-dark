<template>
  <div class="panel">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.panel {
  background-color: var(--translucent-light);
  border: 1px solid var(--primary);
  padding: 2rem;
  color: var(--light);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
