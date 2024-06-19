<template>
  <div class="sheet-layout__nested">
    <div
      class="character-layout"
      ref="carouselRef"
      @scroll="updateCurrentIndex($event.target as HTMLElement)"
    >
      <div>
        <section>
          <div
            class="character-type-card"
            :style="{
              backgroundColor: getSheetImage(sheet.image)?.commonColor
            }"
          >
            <img :src="getSheetImage(sheet.image)?.url" />
            <h1 :class="{ 'extra-long': sheet.name.length > 20 }">
              {{ sheet.name }}
            </h1>
            <h2>
              {{ sheet.characterTypeDescription }}
            </h2>
          </div>
          <div class="input-group">
            <label>Crew</label>
            <div class="row wrap">
              <button
                class="btn btn--tab mobile-full-width"
                @click="changeValue(null, 'crewId')"
                :class="{ active: sheet.crewId === null }"
              >
                None
              </button>
              <button
                class="btn btn--tab mobile-full-width"
                v-for="crew in crewSheets"
                :key="crew.id"
                :class="{ active: sheet.crewId === crew.id }"
                @click="changeValue(crew.id, 'crewId')"
              >
                {{ crew.name }}
              </button>
            </div>
          </div>
        </section>
        <Divider />
        <section>
          <code>NAME</code>
          <code>ALIAS</code>
          <code>LOOK</code>
          <code>HERITAGE</code>
          <code>HERITAGE DESCRIPTION</code>
          <code>BACKGROUND</code>
          <code>BACKGROUND DESCRIPTION</code>
        </section>
        <Divider />
        <section>
          <code>VICE</code>
          <code>VICE PURVEYOR</code>
        </section>
        <Divider />
        <section>
          <code>CONTACTS</code>
        </section>
      </div>
      <div>
        <section>
          <code>STRESS + MAX STRESS</code>
          <code>TRAUMAS + MAX TRAUMAS</code>
        </section>
        <Divider />
        <section>
          <code>HARMS</code>
          <code>HEALING</code>
          <code>ARMORS</code>
        </section>
        <Divider />
        <section>
          <code>PLAYBOOK XP</code>
          <code>SPECIAL ABILITIES</code>
        </section>
        <Divider />
        <section>
          <code>INSIGHT XP</code>
          <code>HUNT, STUDY, SURVEY, TINKER</code>
        </section>
        <Divider />
        <section>
          <code>PROWESS XP</code>
          <code>FINESSE, PROWL, SKIRMISH, WRECK</code>
        </section>
        <Divider />
        <section>
          <code>RESOLVE XP</code>
          <code>ATTUNE, COMMAND, CONSORT, SWAY</code>
        </section>
      </div>
      <div>
        <section>
          <code>LOAD</code>
          <code>UNIQUE ITEMS</code>
          <code>STANDARD ITEMS</code>
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
import { Crew } from '@/game-data/sheets/crew-sheet';
import { defineProps, ref, computed } from 'vue';
import { getSheetImage } from '@/game-data/sheets/sheet-util';
import { useGameStore } from '@/stores/game-store';

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

const crewSheets = computed(() => {
  return (
    Object.values(useGameStore().game?.data?.sheets || []) as Sheet[]
  ).filter((sheet) => sheet.sheetType === 'crew') as Crew[];
});

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
/** TEMPORARY */
code {
  color: yellow;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.6rem;
}

/** LAYOUT */
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

/** TITLE CARD */
.character-type-card {
  position: relative;
  box-shadow: var(--shadow);
  overflow: hidden;
  border-radius: 5px;
  height: 24rem;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  .input-group {
    margin-top: 2rem;
    gap: 0;
    label {
      color: var(--primary);
      text-align: center;
    }
  }

  > h1,
  h2,
  p {
    z-index: 1;
    color: var(--light);
  }

  h1 {
    font-size: 4rem;
    line-height: 1;
    overflow: hidden;
    text-align: center;
    margin: 0.8rem;
  }

  h1.extra-long {
    font-size: 3.2rem;
  }

  h2 {
    font-size: 1.2rem;
    letter-spacing: 4px;
    opacity: 0.6;
    text-align: center;
  }

  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    z-index: 0;
    filter: brightness(0.6);
  }
}

/** MOBILE NAVIGATION */
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
