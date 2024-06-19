<template>
  <div class="logo" :class="{ big: props.big }">
    <span class="online">online</span>
    <span class="in-the-dark">in the Dark</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  big?: boolean;
}>();
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;

  color: var(--primary);

  > span {
    display: block;
    width: 100%;
    text-transform: uppercase;
    text-align: center;

    &.online {
      font-size: 2rem;
      font-family: var(--body-font);
      display: inline-block;
      font-weight: normal;
    }

    &.in-the-dark {
      font-size: 1rem;
      letter-spacing: 1px;
    }
  }
}

.logo.big {
  > span.online {
    font-size: 4rem;
  }

  > span.in-the-dark {
    font-size: 2rem;
  }
}
</style>
