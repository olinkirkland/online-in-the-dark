<template>
  <div class="cohort-tile" :class="{ harmed: harm }">
    <div class="header">
      <div v-if="props.cohort.cohortType === 'gang'">
        <h3>
          <span>{{ scaleText }}</span>
        </h3>
        <h1>
          {{ gangTypes?.map((gt) => gt.name).join(' & ') }}
        </h1>
        <h2>
          {{
            props.cohort.gangType?.filter((gt) => gt.quantity > 0)[0]
              .description
          }}
        </h2>
      </div>

      <div v-else-if="props.cohort.cohortType === 'expert'">
        <h3>
          <span class="harm" v-if="harm">{{ harm }}!</span>
          Expert
        </h3>
        <h1>{{ props.cohort.name }}</h1>
        <h2>{{ expertises.join(' & ') }}</h2>
      </div>

      <div v-else-if="props.cohort.cohortType === 'vehicle'">
        <h3>
          <span class="harm" v-if="harm">{{ harm }}!</span>
          Vehicle
        </h3>
        <h1>{{ props.cohort.name }}</h1>
      </div>

      <button
        v-if="props.onEdit"
        class="btn btn--icon"
        @click="
          ModalController.open(EditCohortModal, {
            propertyName: props.cohort.cohortType,
            cohort: props.cohort,
            idPrefix: props.idPrefix,
            onDelete: onDeleteCohort,
            onEdit: onEditCohort
          })
        "
      >
        <i class="fas fa-edit"></i>
      </button>
    </div>
    <span class="harm" v-if="harm">{{ harm }}!</span>

    <div class="edges-and-flaws">
      <ul>
        <li v-for="edge in edges" :key="edge">
          <i class="fas fa-angle-up"></i>
          <span>{{ edge }}</span>
        </li>
      </ul>
      <ul>
        <li v-for="flaw in flaws" :key="flaw">
          <i class="fas fa-angle-down"></i>
          <span>{{ flaw }}</span>
        </li>
      </ul>
    </div>

    <p>{{ props.cohort.description }}</p>
  </div>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { Cohort } from '@/game-data/sheets/crew-sheet';
import { useGameStore } from '@/stores/game-store';
import { computed, defineProps } from 'vue';
import EditCohortModal from './modals/modal-content/EditCohortModal.vue';
const codex = useGameStore().game?.codex;

const props = defineProps<{
  cohort: Cohort;
  idPrefix: string;
  onEdit?: (cohort: Cohort) => void;
  onDelete?: (id: string) => void;
}>();

const gangTypes = computed(() =>
  props.cohort.gangType?.filter((gt) => gt.quantity > 0)
);

const scaleText = computed(() => {
  const scaleTexts = [...codex.lexicon.gangs];
  try {
    return scaleTexts[props.cohort.scale];
  } catch {
    return '0-2 people';
  }
});

const expertises = computed(() =>
  [props.cohort.expertise1].concat(
    props.cohort.expertise2 ? [props.cohort.expertise2] : []
  )
);

const harm = computed(() => {
  return props.cohort.harm.filter((h) => h.quantity > 0)[0]?.name || '';
});

const edges = computed(
  () =>
    props.cohort.edges
      ?.filter((eff) => eff.quantity > 0)
      .map((edge) => edge.name) || []
);
const flaws = computed(
  () =>
    props.cohort.flaws
      ?.filter((eff) => eff.quantity > 0)
      .map((flaw) => flaw.name) || []
);

function onEditCohort(cohort: Cohort) {
  if (!props.onEdit) return;
  props.onEdit(cohort);
}

function onDeleteCohort(id: string) {
  if (!props.onDelete) return;
  props.onDelete(id);
}
</script>

<style lang="scss" scoped>
.cohort-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background-color: var(--translucent-light);
  padding: 1.6rem;
  color: var(--light);
  border: 1px solid transparent;
  transition: border 0.2s;

  &.harmed {
    border: 1px solid var(--red);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    h1 {
      font-size: 2.4rem;
      font-weight: bold;
      margin: 0;
    }

    h2 {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h3 {
      display: inline-block;
      font-size: 1rem;
      margin: 0;
      color: var(--primary);
      text-align: left;
      opacity: 0.8;
      letter-spacing: 2px;

      span {
        font-size: inherit;
      }
    }

    button {
      height: auto;
      padding: 0.4rem;

      &.checked {
        color: var(--primary);
      }
    }
  }

  > p {
    opacity: 0.8;
    font-size: 1.2rem;
  }

  > span.harm {
    display: inline-flex;
    background-color: var(--red);
    color: var(--dark);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0.6rem;
    width: fit-content;
    font-weight: bold;
    margin-right: 0.8rem;
  }

  .edges-and-flaws {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    overflow: hidden;

    > ul {
      padding: 1rem;
      > li {
        display: flex;
        align-items: center;
        gap: 1rem;
        opacity: 0.8;
      }
    }
  }
}
</style>
