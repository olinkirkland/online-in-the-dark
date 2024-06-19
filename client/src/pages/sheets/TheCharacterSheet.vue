<template>
  <div class="sheet-layout__nested">
    <div
      class="character-layout"
      ref="carouselRef"
      @scroll="updateCurrentIndex($event.target as HTMLElement)"
    >
      <div>
        <section>
          <h1>CHARACTER TYPE CARD (IMAGE)</h1>
          <h1>CHARACTER TYPE</h1>
          <h1>CHARACTER TYPE DESCRIPTION</h1>
          <h1>CREW</h1>
        </section>
        <Divider />
        <section>
          <h1>NAME</h1>
          <h1>ALIAS</h1>
          <h1>LOOK</h1>
          <h1>HERITAGE</h1>
          <h1>HERITAGE DESCRIPTION</h1>
          <h1>BACKGROUND</h1>
          <h1>BACKGROUND DESCRIPTION</h1>
        </section>
        <Divider />
        <section>
          <h1>VICE</h1>
          <h1>VICE PURVEYOR</h1>
        </section>
        <Divider />
        <section>
          <h1>CONTACTS</h1>
        </section>
      </div>
      <div>
        <section>
          <h1>STRESS + MAX STRESS</h1>
          <h1>TRAUMAS + MAX TRAUMAS</h1>
        </section>
        <Divider />
        <section>
          <h1>HARMS</h1>
          <h1>HEALING</h1>
          <h1>ARMORS</h1>
        </section>
        <Divider />
        <section>
          <h1>PLAYBOOK XP</h1>
          <h1>SPECIAL ABILITIES</h1>
        </section>
        <Divider />
        <section>
          <h1>INSIGHT XP</h1>
          <h1>HUNT, STUDY, SURVEY, TINKER</h1>
        </section>
        <Divider />
        <section>
          <h1>PROWESS XP</h1>
          <h1>FINESSE, PROWL, SKIRMISH, WRECK</h1>
        </section>
        <Divider />
        <section>
          <h1>RESOLVE XP</h1>
          <h1>ATTUNE, COMMAND, CONSORT, SWAY</h1>
        </section>
      </div>
      <div>
        <section>
          <h1>LOAD</h1>
          <h1>UNIQUE ITEMS</h1>
          <h1>STANDARD ITEMS</h1>
        </section>
      </div>
    </div>
    <div class="row center mobile-nav">
      <button
        class="btn btn--tab"
        @click="scrollToIndex(0)"
        :class="{ active: currentIndex == 0 }"
      >
        1 <i class="fas fa-file-alt"></i>
      </button>
      <button
        class="btn btn--tab"
        @click="scrollToIndex(1)"
        :class="{ active: currentIndex == 1 }"
      >
        2 <i class="fas fa-file-alt"></i>
      </button>
      <button
        class="btn btn--tab"
        @click="scrollToIndex(2)"
        :class="{ active: currentIndex == 2 }"
      >
        3 <i class="fas fa-file-alt"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { patch } from '@/controllers/game-controller';
import { Character } from '@/game-data/sheets/character-sheet';
import { defineProps, ref } from 'vue';

const props = defineProps<{
  sheet: Character;
}>();

/**
 *
 * Functionality & Sheet API
 *
 */
const focus = ref();
function onBlur(event: FocusEvent) {
  if ((event.relatedTarget as HTMLElement)?.closest('.shelf')) return;
  focus.value = null;
}

function changeValue(value: any, partialPath: string) {
  console.log('onChangeValue', value, partialPath);
  const path = `/data/sheets/${props.sheet.id}/${partialPath}`;
  patch([
    {
      op: 'replace',
      path,
      value
    }
  ]);
}

/**
 *
 *  Mobile Only
 *
 **/

const currentIndex = ref(0);
const carouselRef = ref<HTMLElement | null>(null);
function updateCurrentIndex(carousel: HTMLElement) {
  const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
  currentIndex.value = index;
}

function scrollToIndex(index: number) {
  if (!carouselRef.value) return;
  carouselRef.value.scrollTo({
    top: 0
  });

  carouselRef.value.scrollTo({
    left: carouselRef.value.clientWidth * index,
    behavior: 'smooth'
  });
}
</script>

<style scoped lang="scss">
h1 {
  color: yellow;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.6rem;
}

.sheet-layout__nested {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.character-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-y: auto;

  > div {
    padding: 1rem;
    min-width: 100%;

    // dividing vertical lines between divs
    &:not(:last-child) {
      border-right: 1px solid var(--dark-2);
    }

    section {
      padding: 1rem;
      color: var(--light);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}

.mobile-nav {
  display: none;

  justify-content: center;
  padding: 0.4rem;
  width: 100%;

  background-color: var(--dark);
  box-shadow: var(--shadow);
  z-index: 1;
}

/** TABLET */
@media (max-width: 1079px) {
  .character-layout {
    display: flex;
    overflow-x: hidden;
    > div {
      min-width: 100%;
      height: 100%;
      overflow-y: auto;
    }
  }

  .mobile-nav {
    display: flex;
  }
}

/** MOBILE */
@media (max-width: 767px) {
}
</style>
