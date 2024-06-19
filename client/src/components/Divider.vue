<template>
  <div class="divider">
    <div class="line"></div>
    <div class="middle-symbol">❖</div>
    <div class="line"></div>
  </div>
</template>

<style scoped lang="scss">
.divider {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 2rem 4rem;
  color: var(--translucent-light);

  > * {
    display: inline-block;
    color: currentColor;
    line-height: 0;
  }

  .line {
    flex: 1;
    height: 0.1rem;
    background-color: currentColor;
    margin: 0 0.4rem;
  }
}
</style>
