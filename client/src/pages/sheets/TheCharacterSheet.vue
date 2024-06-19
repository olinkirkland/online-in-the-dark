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
              <p>Add a detail about your family life or upbringing.</p>
            </CollapsingShelf>
          </div>

          <!-- Look -->
          <div class="input-group">
            <label for="character-look">Look</label>
            <textarea
              id="character-look"
              type="text"
              :value="props.sheet.look"
              @focus="focus = 'look'"
              :placeholder="`A plain-looking ${sheet.characterType}${
                sheet.heritage ? ` from ${sheet.heritage}` : ''
              }`"
              @change="
                changeValue(($event.target as HTMLInputElement)?.value, 'look')
              "
            ></textarea>
            <CollapsingShelf :show="focus == 'look'">
              <p>What do you look like?</p>
              <div class="text-list">
                <label>Descriptions</label>
                <button
                  class="btn btn--text"
                  v-for="look in codex.looks?.adjectives"
                  :key="look"
                  @click="
                    changeValue(
                      sheet.look.length
                        ? sheet.look + ', ' + look.toLowerCase()
                        : look,
                      'look'
                    )
                  "
                >
                  {{ look }}
                </button>
              </div>
              <div class="text-list">
                <label>Clothes</label>
                <button
                  class="btn btn--text"
                  v-for="look in codex.looks?.clothes"
                  :key="look"
                  @click="
                    changeValue(
                      sheet.look.length
                        ? sheet.look + ', ' + look.toLowerCase()
                        : look,
                      'look'
                    )
                  "
                >
                  {{ look }}
                </button>
              </div>
            </CollapsingShelf>
          </div>

          <!-- Background -->
          <div class="input-group">
            <label for="character-background">Background</label>
            <input
              id="character-background"
              type="text"
              :value="props.sheet.background"
              @focus="focus = 'background'"
              :placeholder="'Background'"
              @change="
                changeValue(
                  ($event.target as HTMLInputElement)?.value,
                  'background'
                )
              "
            />
            <CollapsingShelf :show="focus == 'background'">
              <p>What did you do before you joined the crew?</p>
              <div class="text-list">
                <button
                  class="btn btn--text"
                  v-for="background in codex.sheets?.character?.backgrounds"
                  :key="background.name"
                  @mousedown="
                    changeValue(background.name, 'background');
                    changeValue(background.blurb, 'backgroundDescription');
                  "
                >
                  {{ background.name }}
                </button>
              </div>
            </CollapsingShelf>
          </div>
          <div class="input-group">
            <textarea
              spellcheck="false"
              :value="props.sheet.backgroundDescription"
              @focus="focus = 'backgroundDescription'"
              @change="
                changeValue(
                  ($event.target as HTMLTextAreaElement)?.value,
                  'backgroundDescription'
                )
              "
              placeholder="E.g. Sailor, mutineer, former Bluecoat, smuggler, courtier, street urchin, gang member, etc."
            ></textarea>
            <CollapsingShelf :show="focus == 'backgroundDescription'">
              <p>Add a detail about your past life or career.</p>
            </CollapsingShelf>
          </div>

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
          <!-- Vice -->
          <div class="input-group">
            <label for="character-vice">Vice</label>
            <input
              id="character-vice"
              type="text"
              :value="props.sheet.vice"
              @focus="focus = 'vice'"
              :placeholder="'Vice'"
              @change="
                changeValue(($event.target as HTMLInputElement)?.value, 'vice')
              "
            />

            <CollapsingShelf :show="focus == 'vice'">
              <p>What vice do you indulge in to relieve stress?</p>
              <div class="text-list">
                <button
                  class="btn btn--text"
                  v-for="vice in codex.sheets?.character?.vices"
                  :key="vice.name"
                  @click="
                    changeValue(vice.name, 'vice');
                    changeValue(vice.blurb, 'viceDescription');
                  "
                >
                  {{ vice.name }}
                </button>
              </div>
            </CollapsingShelf>
          </div>

          <!-- Vice Description -->
          <div class="input-group">
            <textarea
              spellcheck="false"
              :value="props.sheet.viceDescription"
              @focus="focus = 'viceDescription'"
              @change="
                changeValue(
                  ($event.target as HTMLTextAreaElement)?.value,
                  'viceDescription'
                )
              "
              placeholder="Add a detail about your vice."
            ></textarea>
            <CollapsingShelf :show="focus == 'viceDescription'">
              <p>Add a detail about your Vice.</p>
            </CollapsingShelf>
          </div>

          <!-- Vice Purveyor -->
          <div class="input-group">
            <label for="character-vice-purveyor">Vice Purveyor</label>
            <textarea
              id="character-vice-purveyor"
              type="text"
              :value="props.sheet.vicePurveyor"
              spellcheck="false"
              @focus="focus = 'vicePurveyor'"
              :placeholder="'Vice Purveyor'"
              @change="
                changeValue(
                  ($event.target as HTMLInputElement)?.value,
                  'vicePurveyor'
                )
              "
            ></textarea>
            <CollapsingShelf :show="focus == 'vicePurveyor'">
              <p>Who provides your vice?</p>
              <div class="text-list" v-if="vicePurveyors.length">
                <button
                  class="btn btn--text"
                  v-for="purveyor in vicePurveyors"
                  :key="purveyor"
                  @click="
                    changeValue(
                      `${purveyor.name}. ${purveyor.blurb}`,
                      'vicePurveyor'
                    )
                  "
                >
                  {{ purveyor.name }}
                </button>
              </div>
            </CollapsingShelf>
          </div>
        </section>
        <Divider />
        <section>
          <label for="contacts"> {{ sheet.contactsLabel }} </label>
          <div class="row">
            <button
              class="btn"
              @click="
                ModalController.open(EditPersonModal, {
                  propertyName: 'Person',
                  idPrefix: 'contact',
                  onCreateNew: onCreateContact
                })
              "
            >
              <span>New</span>
            </button>
            <Checkbox
              icon="fa-low-vision"
              v-model="showOnlySelectedContacts"
              label="Show only selected"
            />
          </div>
          <div class="tile-list tile-list--mini" v-if="contacts.length > 0">
            <PersonTile
              v-for="contact in contacts"
              :key="contact.id"
              :idPrefix="props.sheet.characterType + '-contact'"
              :propertyName="sheet.contactsLabel"
              :person="contact"
              :change="onChangeContact"
              :onEdit="onEditContact"
              :onDelete="onDeleteContact"
              :options="[
                { value: -1, icon: 'fas fa-thumbs-down' },
                { value: 1, icon: 'fas fa-thumbs-up' }
              ]"
            />
          </div>
          <p v-if="contacts.length == 0" class="no-tiles">
            <em>❖ No {{ sheet.contactsLabel }}</em>
          </p>
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
import { Person } from '@/game-data/game-data-types';
import Sheet from '@/game-data/sheets/sheet';
import EditPersonModal from '@/components/modals/modal-content/EditPersonModal.vue';
import ModalController from '@/controllers/modal-controller';
import PersonTile from '@/components/PersonTile.vue';
import Checkbox from '@/components/Checkbox.vue';
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

// Vice Purveyors
const vicePurveyors = computed(() => {
  return codex.sheets?.character?.vicePurveyors.filter((purveyor: any) =>
    purveyor.vices.includes(props.sheet.vice.toLowerCase())
  );
});

// Contacts
const showOnlySelectedContacts = ref(
  localStorage.getItem('showOnlySelectedContacts') === 'true'
);
const contacts = computed(() => {
  return showOnlySelectedContacts.value
    ? props.sheet.contacts.filter((a) => a.attitude !== 0)
    : props.sheet.contacts;
});

function onEditContact(contact: Person) {
  const contactIndex = props.sheet.contacts.findIndex(
    (a) => a.id === contact.id
  );
  patch([
    {
      op: 'replace',
      path: `/data/sheets/${props.sheet.id}/contacts/${contactIndex}`,
      value: contact
    }
  ]);
}
function onDeleteContact(id: string) {
  const contactIndex = props.sheet.contacts.findIndex((a) => a.id === id);
  patch([
    {
      op: 'remove',
      path: `/data/sheets/${props.sheet.id}/contacts/${contactIndex}`
    }
  ]);
}
function onChangeContact(contact: Person, attitude: number) {
  const contactIndex = props.sheet.contacts.findIndex(
    (a) => a.id === contact.id
  );
  const path = `/data/sheets/${props.sheet.id}/contacts/${contactIndex}/attitude`;
  patch([
    {
      op: 'replace',
      path,
      value: attitude
    }
  ]);
}
function onCreateContact(contact: Person) {
  patch([
    {
      op: 'add',
      path: `/data/sheets/${props.sheet.id}/contacts/-`,
      value: contact
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
