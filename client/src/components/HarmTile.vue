<template>
  <div class="harm-tile" :class="{ active: props.harm.description.length > 0 }">
    <input
      type="text"
      :value="props.harm.description"
      @change="
        props.changeHarm(
          (($event.target as HTMLInputElement) || null)?.value || ''
        )
      "
    />
    <h3>Level {{ props.harm.level }}</h3>
  </div>
</template>

<script lang="ts" setup>
import { Harm } from '@/game-data/sheets/character-sheet';
import { text } from '@/util/string';

const props = defineProps<{
  harm: Harm;
  changeHarm: (newDescription: string) => void;
}>();
</script>

<style scoped lang="scss">
.harm-tile {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1rem;
  background-color: var(--translucent-light);

  &.active {
    input {
      background-color: var(--red);
      color: var(--dark);
      &:focus {
        border-color: var(--red);
      }
    }
  }
}

h3 {
  font-size: 0.8rem;
  font-weight: bold;
}

p {
  font-size: 0.8rem;
  text-align: center;
}
</style>
