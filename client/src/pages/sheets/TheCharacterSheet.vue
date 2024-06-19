<template>
  <div class="sheet-layout__nested">
    <div
      class="character-layout"
      ref="carouselRef"
      @scroll="updateCurrentIndex($event.target as HTMLElement)"
    >
      <div>
        <section>
          <!-- Title card -->
          <div
            class="character-type-card"
            :style="{
              backgroundColor: getSheetImage(sheet.image)?.commonColor
            }"
          >
            <img :src="getSheetImage(sheet.image)?.url" />
            <h1
              :class="{
                'extra-long': sheet.name
                  .split(' ')
                  .some((str) => str.length > 8)
              }"
            >
              {{ sheet.name }}
            </h1>
            <h2>
              {{ sheet.characterTypeDescription }}
            </h2>
          </div>

          <!-- Name -->
          <div class="input-group name">
            <label for="character-name">Name</label>
            <div class="row flat">
              <input
                id="character-name"
                type="text"
                :value="props.sheet.name"
                @focus="focus = 'name'"
                :placeholder="'Unnamed ' + sheet.characterType"
                @change="
                  changeValue(
                    ($event.target as HTMLInputElement)?.value,
                    'name'
                  )
                "
              />
              <button class="btn btn--icon" @click="randomizeName">
                <i class="fas fa-random"></i>
              </button>
            </div>
            <CollapsingShelf :show="focus == 'name'">
              <p>What's your name?</p>
            </CollapsingShelf>
          </div>

          <!-- Alias -->
          <div class="input-group">
            <label for="character-alias"
              >Alias
              <label class="muted">(Optional)</label>
            </label>
            <div class="row flat">
              <input
                id="character-alias"
                type="text"
                :value="props.sheet.alias"
                @focus="focus = 'alias'"
                :placeholder="'Alias'"
                @change="
                  changeValue(
                    ($event.target as HTMLInputElement)?.value,
                    'alias'
                  )
                "
              />
              <button class="btn btn--icon" @click="randomizeAlias">
                <i class="fas fa-random"></i>
              </button>
            </div>

            <CollapsingShelf :show="focus == 'alias'">
              <p>What alias or nickname are you known by in the underworld?</p>
            </CollapsingShelf>
          </div>

          <!-- Heritage -->
          <div class="input-group">
            <label for="character-heritage">Heritage</label>
            <input
              id="character-heritage"
              type="text"
              :value="props.sheet.heritage"
              @focus="focus = 'heritage'"
              :placeholder="'Heritage'"
              @change="
                changeValue(
                  ($event.target as HTMLInputElement)?.value,
                  'heritage'
                )
              "
            />
            <CollapsingShelf :show="focus == 'heritage'">
              <p>You can trace your family line back to this place.</p>
              <div class="text-list">
                <button
                  class="btn btn--text"
                  v-for="location in codex.lexicon.locations"
                  :key="location.name"
                  @mousedown="
                    changeValue(location.name, 'heritage');
                    changeValue(location.blurb, 'heritageDescription');
                  "
                >
                  {{ location.name }}
                </button>
              </div>
            </CollapsingShelf>
            <textarea
              spellcheck="false"
              :value="props.sheet.heritageDescription"
              @focus="focus = 'heritageDescription'"
              @change="
                changeValue(
                  ($event.target as HTMLTextAreaElement)?.value,
                  'heritageDescription'
                )
              "
              placeholder="A detail about your family life or upbringing."
            ></textarea>
            <CollapsingShelf :show="focus == 'heritageDescription'">
              <p>
                Add a detail about your family life or upbringing.
              </p>
            </CollapsingShelf>
          </div>
          <code>HERITAGE</code>
          <code>HERITAGE DESCRIPTION</code>
          <!-- Look -->
          <code>LOOK</code>
          <code>BACKGROUND</code>
          <code>BACKGROUND DESCRIPTION</code>
          <!-- Crew -->
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
import { pick } from '@/util/rand-helper';
import { patch } from '@/controllers/game-controller';
import { Character } from '@/game-data/sheets/character-sheet';
import { Crew } from '@/game-data/sheets/crew-sheet';
import { defineProps, ref, computed, onMounted, onUnmounted } from 'vue';
import { getSheetImage } from '@/game-data/sheets/sheet-util';
import { useGameStore } from '@/stores/game-store';
import CollapsingShelf from '@/components/CollapsingShelf.vue';

const props = defineProps<{
  sheet: Character;
}>();

/**
 *
 * Functionality & Sheet API
 *
 */

const codex = useGameStore().game?.codex;
onMounted(() => {
  document.addEventListener('blur', onBlur, true);
});
onUnmounted(() => {
  document.removeEventListener('blur', onBlur, true);
});
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

// Crew
const crewSheets = computed(() => {
  return (
    Object.values(useGameStore().game?.data?.sheets || []) as Sheet[]
  ).filter((sheet) => sheet.sheetType === 'crew') as Crew[];
});

// Name
function randomizeName() {
  const firstNames = codex?.names?.firstNames || [];
  const lastNames = codex?.names?.lastNames || [];
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  changeValue(`${firstName} ${lastName}`, 'name');
}

// Alias
function randomizeAlias() {
  const aliases = codex?.names?.aliases || [];
  const alias = pick(aliases);
  changeValue(alias, 'alias');
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
