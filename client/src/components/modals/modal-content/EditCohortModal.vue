<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>
          {{ props.onCreateNew ? 'Create a new' : 'Edit' }}
          {{ props.propertyName }}
        </h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="edit">
        <!-- Gang Type (Gang) -->
        <div class="input-group" v-if="props.propertyName === 'gang'">
          <label for="gangType"
            >Gang Type
            <label class="muted"
              >(Choose one. A second Gang Type costs 2 upgrades)</label
            >
          </label>
          <div class="tile-list tile-list--mini">
            <EffectableTile
              v-for="gangType in cohort.gangType"
              :effectable="gangType"
              :key="gangType.id"
              :idPrefix="props.idPrefix + '-gangType'"
              :propertyName="gangType.name"
              :change="
                (quantity) => {
                  gangType.quantity = quantity;
                }
              "
            />
          </div>
        </div>

        <!-- Name (Expert) -->
        <div class="input-group" v-if="props.propertyName === 'expert'">
          <label for="name">Name</label>
          <input
            class="ignore-initial-focus"
            type="text"
            id="name"
            v-model="cohort.name"
            placeholder="A name for your Expert"
            @focus="focus = 'name'"
            @blur="updateIdFromName(cohort.name)"
          />
          <CollapsingShelf :show="focus === 'name'">
            <p>Choose a name for your Expert.</p>
            <button class="btn btn--icon" @mousedown="randomizeName">
              <i class="fas fa-random"></i>
              <span>Randomize</span>
            </button>
          </CollapsingShelf>
        </div>

        <!-- Expertise (Expert) -->
        <div class="input-group" v-if="props.propertyName === 'expert'">
          <label for="expertise1">Expertise</label>
          <input
            class="ignore-initial-focus"
            type="text"
            id="expertise1"
            v-model="cohort.expertise1"
            placeholder="An area of expertise"
            @focus="focus = 'expertise1'"
          />
          <CollapsingShelf :show="focus === 'expertise1'">
            <p>Choose your Expert's area of expertise.</p>
            <div class="text-list">
              <button
                class="btn btn--text"
                v-for="expertise in codex?.sheets?.crew?.cohorts?.expertise"
                @mousedown="cohort.expertise1 = expertise"
              >
                {{ expertise }}
              </button>
            </div>
          </CollapsingShelf>
        </div>

        <!-- Expertise 2 (Expert) -->
        <div class="input-group" v-if="props.propertyName === 'expert'">
          <label for="expertise2"
            >Additional Expertise
            <label class="muted">(Costs 2 upgrades)</label>
          </label>
          <input
            class="ignore-initial-focus"
            type="text"
            id="expertise2"
            v-model="cohort.expertise2"
            placeholder="An additional area of expertise"
            @focus="focus = 'expertise2'"
          />
          <CollapsingShelf :show="focus === 'expertise2'">
            <p>Choose an additional area of expertise for your Expert.</p>
            <div class="text-list">
              <button
                class="btn btn--text"
                v-for="expertise in codex?.sheets?.crew?.cohorts?.expertise"
                @mousedown="cohort.expertise2 = expertise"
              >
                {{ expertise }}
              </button>
            </div>
          </CollapsingShelf>
        </div>

        <!-- Name (Vehicle) -->
        <div class="input-group" v-if="props.propertyName === 'vehicle'">
          <label for="name">Name</label>
          <input
            class="ignore-initial-focus"
            type="text"
            id="name"
            v-model="cohort.name"
            placeholder="A name for your Vehicle"
            @focus="focus = 'name'"
            @blur="updateIdFromName(cohort.name)"
          />
        </div>

        <Divider />
        <label
          >Effectiveness
          <label class="muted"
            >Quality {{ cohort.quality }}, {{ scaleText }}</label
          >
        </label>
        <div class="input-block">
          <div class="input-group">
            <NumberStepper
              id="cohort-quality"
              label="Quality"
              class="mobile-full-width center"
              :value="cohort.quality"
              :min="0"
              :max="10"
              @change="cohort.quality = $event"
            />

            <InfoBox v-if="props.propertyName === 'expert'">
              <p
                v-html="
                  text(
                    `An Expert's quality is equal to your current *Tier* +1 and increases with your *Tier*.`
                  )
                "
              ></p>
            </InfoBox>
            <InfoBox v-if="props.propertyName === 'gang'">
              <p
                v-html="
                  text(
                    `A Gang's quality is equal to your current *Tier* and increases with your *Tier*.`
                  )
                "
              ></p>
            </InfoBox>
            <InfoBox v-if="props.propertyName === 'vehicle'">
              <p
                v-html="
                  text(
                    `A Vehicle's quality is equal to your current *Tier* +1 and increases with your *Tier*.`
                  )
                "
              ></p>
            </InfoBox>
          </div>

          <div class="input-group" v-if="props.propertyName === 'gang'">
            <div class="row flat">
              <NumberStepper
                id="cohort-scale"
                class="mobile-full-width center"
                :value="cohort.scale"
                :min="0"
                :max="10"
                @change="cohort.scale = $event"
                label="Scale"
              />
            </div>
            <InfoBox>
              <p
                v-html="
                  text(
                    `A Gang's *Scale* is equal to your current *Tier* and increases with your *Tier*.`
                  )
                "
              ></p>
            </InfoBox>
          </div>
        </div>

        <Divider />

        <div class="input-group">
          <label for="edges"
            >Edges
            <label class="muted">(Choose at least one)</label>
          </label>
          <div class="tile-list tile-list--mini">
            <EffectableTile
              v-for="edge in cohort.edges"
              :effectable="edge"
              :key="edge.id"
              :idPrefix="props.idPrefix + '-edge'"
              :propertyName="edge.name"
              :change="
                (quantity) => {
                  edge.quantity = quantity;
                }
              "
            />
          </div>
        </div>

        <div class="input-group">
          <label for="flaws"
            >Flaws
            <label class="muted"
              >(Choose at least
              {{
                numberWord(
                  Math.max(cohort.edges.filter((e) => e.quantity > 0).length, 1)
                )
              }})
            </label></label
          >
          <div class="tile-list tile-list--mini">
            <EffectableTile
              v-for="flaw in cohort.flaws"
              :effectable="flaw"
              :key="flaw.id"
              :idPrefix="props.idPrefix + '-flaw'"
              :propertyName="flaw.name"
              :change="
                (quantity) => {
                  flaw.quantity = quantity;
                }
              "
            />
          </div>
        </div>

        <div class="input-group">
          <label for="harm">Harm</label>
          <div class="tile-list tile-list--mini">
            <EffectableTile
              v-for="harm in cohort.harm"
              :effectable="harm"
              :key="harm.id"
              :idPrefix="props.idPrefix + '-harm'"
              :propertyName="harm.name"
              :change="
                (quantity) => {
                  // Change the quantity of all other harms to zero
                  cohort.harm.forEach((h) => {
                    h.quantity = 0;
                  });

                  harm.quantity = quantity;
                }
              "
            />
          </div>
        </div>

        <div class="input-group stretch">
          <label for="description"
            >Description
            <label class="muted"
              >({{ cohort.description.length }} / 400)
            </label>
          </label>
          <textarea
            id="description"
            v-model="cohort.description"
            placeholder="A brief description"
          ></textarea>
        </div>

        <div class="alert" v-if="errorMessage">
          <i class="fas fa-exclamation-circle"></i>
          <span>{{ errorMessage }}</span>
          <button class="btn btn--icon close" @click="errorMessage = ''">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <section class="row" v-if="props.onCreateNew">
          <button
            class="btn btn--alt mobile-full-width"
            @click="ModalController.close()"
          >
            <span>Cancel</span>
          </button>
          <button class="btn mobile-full-width" @click="onClickCreate">
            <span>New</span>
          </button>
        </section>
        <section class="row" v-else>
          <button class="btn btn--alt mobile-full-width" @click="onClickDelete">
            <i class="fas fa-trash"></i>
            <span>Delete</span>
          </button>
          <button class="btn mobile-full-width" @click="onClickSave">
            <span>Save</span>
          </button>
        </section>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import CollapsingShelf from '@/components/CollapsingShelf.vue';
import EffectableTile from '@/components/EffectableTile.vue';
import InfoBox from '@/components/InfoBox.vue';
import NumberStepper from '@/components/NumberStepper.vue';
import ModalController from '@/controllers/modal-controller';
import { Cohort } from '@/game-data/sheets/crew-sheet';
import { useGameStore } from '@/stores/game-store';
import { pick } from '@/util/rand-helper';
import { numberWord, text } from '@/util/string';
import { v4 as uuidv4 } from 'uuid';
import { computed, defineProps, onMounted, onUnmounted, ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';

const codex = useGameStore().game?.codex;
const props = defineProps<{
  propertyName?: string;
  cohort?: Cohort;
  onEdit?: (cohort: Cohort) => void;
  onDelete?: (id: string) => void;
  idPrefix?: string;

  // There are two ways to use this modal:
  // Edit an existing cohort or create a new one.
  // The default is to edit an existing cohort. To create a new one, pass a function to onCreateNew.
  // All other props will be ignored in this case.
  onCreateNew?: (cohort: Cohort) => void;
}>();

onMounted(() => {
  document.addEventListener('blur', onBlur, true);
});

onUnmounted(() => {
  document.removeEventListener('blur', onBlur, true);
});

const focus = ref();
function onBlur(event: FocusEvent) {
  focus.value = null;
}

function randomizeName() {
  const firstName = pick(codex?.names?.firstNames);
  const lastName = pick(codex?.names?.lastNames);
  cohort.value.name = `${firstName} ${lastName}`;
  console.log(cohort.value.name);
}

const scaleText = computed(() => {
  const scaleTexts = [...codex.lexicon.gangs];
  try {
    return scaleTexts[cohort.value.scale];
  } catch {
    return '0-2 people';
  }
});

const gangCohort: Cohort = {
  id: uuidv4(),
  name: '',
  description: '',
  cohortType: 'gang',
  edges:
    codex?.sheets?.crew?.cohorts?.edges.map(
      (edge: { name: string; description: string }) => ({
        ...edge,
        id: 'edge-' + edge.name,
        quantity: 0,
        maxQuantity: 1
      })
    ) || [],
  flaws:
    codex?.sheets?.crew?.cohorts?.flaws.map(
      (flaw: { name: string; description: string }) => ({
        ...flaw,
        id: 'flaw-' + flaw.name,
        quantity: 0,
        maxQuantity: 1
      })
    ) || [],
  gangType: [
    {
      id: 'gangType-adepts',
      name: 'Adepts',
      description: 'Scholars, tinkerers, occultists, and chemists',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'gangType-rooks',
      name: 'Rooks',
      description: 'Con artists, spies, and socialites',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'gangType-rovers',
      name: 'Rovers',
      description: 'Sailors, carriage drivers, and scavengers',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'gangType-skulks',
      name: 'Skulks',
      description: 'Scouts, infiltrators, and thieves',
      quantity: 0,
      maxQuantity: 1
    },
    {
      id: 'gangType-thugs',
      name: 'Thugs',
      description: 'Killers, brawlers, and roustabouts',
      quantity: 0,
      maxQuantity: 1
    }
  ],
  harm:
    useGameStore().game?.codex?.sheets?.crew?.cohorts?.harm.map(
      (harm: { name: string; description: string }) => ({
        ...harm,
        id: 'harm-' + harm.name,
        quantity: 0,
        maxQuantity: 1
      })
    ) || [],
  quality: 0,
  scale: 0
};
const expertCohort: Cohort = {
  id: uuidv4(),
  name: '',
  description: '',
  cohortType: 'expert',
  edges:
    codex?.sheets?.crew?.cohorts?.edges.map(
      (edge: { name: string; description: string }) => ({
        ...edge,
        id: 'edge-' + edge.name,
        quantity: 0,
        maxQuantity: 1
      })
    ) || [],
  flaws:
    codex?.sheets?.crew?.cohorts?.flaws.map(
      (flaw: { name: string; description: string }) => ({
        ...flaw,
        id: 'flaw-' + flaw.name,
        quantity: 0,
        maxQuantity: 1
      })
    ) || [],
  expertise1: '',
  expertise2: '',
  harm:
    useGameStore().game?.codex?.sheets?.crew?.cohorts?.harm.map(
      (harm: { name: string; description: string }) => ({
        ...harm,
        id: 'harm-' + harm.name,
        quantity: 0,
        maxQuantity: 1
      })
    ) || [],
  quality: 0,
  scale: 0
};
const vehicleCohort: Cohort = {
  id: uuidv4(),
  name: '',
  description: '',
  cohortType: 'vehicle',
  edges:
    codex?.sheets?.crew?.cohorts?.vehicleEdges.map(
      (edge: { name: string; description: string }) => ({
        ...edge,
        id: 'edge-' + edge.name,
        quantity: 0,
        maxQuantity: 1
      })
    ) || [],
  flaws:
    codex?.sheets?.crew?.cohorts?.vehicleFlaws.map(
      (flaw: { name: string; description: string }) => ({
        ...flaw,
        id: 'flaw-' + flaw.name,
        quantity: 0,
        maxQuantity: 1
      })
    ) || [],
  harm:
    useGameStore().game?.codex?.sheets?.crew?.cohorts?.harm.map(
      (harm: { name: string; description: string }) => ({
        ...harm,
        id: 'harm-' + harm.name,
        quantity: 0,
        maxQuantity: 1
      })
    ) || [],
  quality: 0,
  scale: 0
};
const blankCohorts = {
  gang: gangCohort,
  expert: expertCohort,
  vehicle: vehicleCohort
};

const cohort = ref({
  ...(props.cohort ||
    blankCohorts[props.propertyName as 'gang' | 'expert' | 'vehicle'])
});

function updateIdFromName(name: string) {
  if (!props.onCreateNew) return;

  // Create a hyphenated ID from the name
  // Start with the id prefix, if it exists
  let newId = (props.idPrefix || '') + '-' + name;

  // Replace only spaces with hyphens, everything else that's not a letter or number, delete
  newId = newId
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');

  cohort.value.id = newId;
}

const errorMessage = ref<string | null>(null);

function validate() {
  if (cohort.value.cohortType === 'gang') {
    // Must have a gang type
    if (
      cohort.value.gangType?.reduce(
        (total, type) => total + (type.quantity || 0),
        0
      ) === 0
    ) {
      return 'You must choose a Gang Type.';
    }
  }
  if (cohort.value.cohortType === 'expert') {
    // Must have a name
    if (!cohort.value.name) {
      return 'You must give your Expert a name.';
    }

    // Must have an expertise
    if (!cohort.value.expertise1) {
      return 'You must choose an Expertise.';
    }
  }

  // Must have at least one edge
  const edgesCount = cohort.value.edges?.reduce(
    (total, edge) => total + (edge.quantity || 0),
    0
  );

  if (edgesCount === 0) return 'You must choose at least one Edge.';

  // Must have at least the same number of flaws as edges
  const flawsCount = cohort.value.flaws?.reduce(
    (total, flaw) => total + (flaw.quantity || 0),
    0
  );

  console.log(cohort.value.flaws.map((f) => f.quantity));

  if (edgesCount > 0 && flawsCount < edgesCount) {
    return `You must choose at least the same number of Flaws (${flawsCount}) as Edges (${edgesCount}).`;
  }

  return null;
}

function onClickCreate() {
  if (!props.onCreateNew) return;

  errorMessage.value = validate();
  if (errorMessage.value) return;

  props.onCreateNew(cohort.value);
  ModalController.close();
}

function onClickSave() {
  if (!props.onEdit) return;

  errorMessage.value = validate();
  if (errorMessage.value) return;

  props.onEdit(cohort.value);
  ModalController.close();
}

function onClickDelete() {
  if (!props.onDelete) return;
  props.onDelete(cohort.value.id);
  ModalController.close();
}
</script>

<style scoped lang="scss">
.modal {
  min-width: 72rem;

  .edit {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    min-height: 100%;
    width: 100%;

    textarea {
      resize: vertical;
      max-height: unset;
      flex: 1;
    }
  }
}

:deep(.modal__header) {
  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

:deep(.effectable-tile .selection-bar::before) {
  background-color: var(--dark);
}
</style>
