<template>
  <div
    ref="claimTile"
    class="claim-tile"
    :class="{ small: claimTileIsSmall, active: props.claim.quantity > 0 }"
    @click="props.change(!props.claim.quantity ? 1 : 0)"
  >
    <div class="header">
      <h2>{{ props.claim.name }}</h2>
    </div>

    <p v-if="props.showDetails" v-html="text(props.claim.description)"></p>

    <ul class="roadmap">
      <li
        v-for="direction in rotatedDirections"
        :class="{
          [direction]: true,
          active:
            props.claim.quantity > 0 &&
            isNeighborActive(rotateDirection(direction, -1))
        }"
      ></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Claim, Direction } from '@/game-data/sheets/crew-sheet';
import { computed, defineProps, onMounted, onUnmounted, ref } from 'vue';
import { text } from '@/util/string';

const props = defineProps<{
  claim: Claim;
  showDetails: boolean;
  idPrefix: string;
  propertyName: string;
  neighborClaims: { [key: string]: Claim }; // where the key is a Direction
  change: (quantity: number) => void;
}>();

const claimTile = ref<HTMLElement | null>(null);
const claimTileIsSmall = ref(false);

onMounted(() => {
  calculateSize();
  window.addEventListener('resize', calculateSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculateSize);
});

function calculateSize() {
  claimTileIsSmall.value =
    (claimTile.value?.clientWidth && claimTile.value.clientWidth < 140) ||
    false;
}

function isNeighborActive(direction: Direction): boolean {
  const neighbor = props.neighborClaims[direction];
  if (!neighbor) return false;
  return neighbor.quantity > 0;
}

const rotatedDirections = computed(() => {
  return props.claim.adjacent.map((direction) => {
    return rotateDirection(direction);
  });
});

function rotateDirection(direction: Direction, clockwise = 1): Direction {
  const cardinalDirections = [
    Direction.NORTH,
    Direction.EAST,
    Direction.SOUTH,
    Direction.WEST
  ];
  const index = cardinalDirections.indexOf(direction);
  if (index === -1) return direction;
  return cardinalDirections[
    (index + clockwise + cardinalDirections.length) % cardinalDirections.length
  ];
}
</script>

<style lang="scss" scoped>
.claim-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 100%;
  min-height: 6rem;
  gap: 0.4rem;
  background-color: var(--translucent-light);
  padding: 1.2rem;
  color: var(--light);
  border: 1px solid transparent;
  transition: border 0.2s;
  cursor: pointer;

  .header {
    display: flex;
    gap: 0.4rem;
    height: 100%;
    text-align: center;
    align-items: center;

    h2 {
      flex: 1;
      font-size: 1.6rem;
      overflow: hidden;
      text-align: center;
      text-transform: capitalize;
      word-break: break-word;
    }
  }
}

p {
  opacity: 0.8;
  text-align: center;
  line-height: 1;

  :deep(span) {
    font-size: 1rem;
  }
}

.claim-tile.active {
  border: 1px solid var(--primary);
  background-color: var(--translucent-primary-light);

  li.north::after {
    background: linear-gradient(
      to bottom,
      var(--translucent-light),
      var(--primary)
    );
  }

  li.east::after {
    background: linear-gradient(
      to left,
      var(--translucent-light),
      var(--primary)
    );
  }

  li.south::after {
    background: linear-gradient(
      to top,
      var(--translucent-light),
      var(--primary)
    );
  }

  li.west::after {
    background: linear-gradient(
      to right,
      var(--translucent-light),
      var(--primary)
    );
  }
}

.claim-tile.small {
  padding: 0.8rem 0.4rem;
  h2 {
    font-size: 1.2rem;
  }
}

.claim-tile .roadmap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  li {
    position: absolute;

    &::after {
      content: '';
      display: block;
      width: 0.8rem;
      height: 0.8rem;
      background-color: var(--translucent-light);
    }

    &.active::after {
      background: unset;
      background-color: var(--primary);
    }

    &.north {
      top: -1px;
      left: 50%;
      transform: translate(-50%, -100%);
      &::after {
        width: 0.8rem;
      }
    }

    &.east {
      top: 50%;
      right: -1px;
      transform: translate(100%, -50%);
      &::after {
        height: 0.8rem;
      }
    }

    &.south {
      bottom: -1px;
      left: 50%;
      transform: translate(-50%, 100%);
      &::after {
        width: 0.8rem;
      }
    }

    &.west {
      top: 50%;
      left: -1px;
      transform: translate(-100%, -50%);
      &::after {
        height: 0.8rem;
      }
    }
  }
}
</style>
