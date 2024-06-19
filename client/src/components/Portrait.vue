<template>
  <div class="portrait" :style="{ backgroundColor: portrait.commonColor }">
    <img :src="portrait.url" alt="Portrait" />
  </div>
</template>

<script setup lang="ts">
import { getPortrait } from '@/util/portrait';
import { computed } from 'vue';

const props = defineProps<{
  portraitId?: string;
}>();

const portrait = computed(() => {
  return getPortrait(props.portraitId);
});
</script>

<style lang="scss" scoped>
.portrait {
  max-height: 3.2rem;
  height: 100%;
  aspect-ratio: 1;
  line-height: 0;
  border-radius: 5px;

  img {
    width: 100%;
    height: 100%;
    padding: 0.4rem; // Icons8 version
    object-fit: cover;
  }
}
</style>
