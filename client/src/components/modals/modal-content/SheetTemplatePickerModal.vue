<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Choose a {{ sheetType }} template</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="template-picker">
        <p>
          {{ props.description }}
        </p>
        <ul
          class="scroll-container"
          ref="carouselRef"
          @scroll="updateCurrentIndex($event.target as HTMLElement)"
        >
          <li v-for="(template, key, index) in templates">
            <div
              class="template-card prevent-click-on-mobile"
              @click="onClickChooseTemplate(template)"
              :key="template.id"
              :class="{
                active: currentIndex == index,
                'left-of-active': currentIndex > index,
                'right-of-active': currentIndex < index
              }"
              :style="{
                'background-color': getSheetImage(template.image)?.commonColor
              }"
            >
              <img :src="getSheetImage(template.image)?.url" />
              <h3>
                {{ template[templateTypeKey as keyof typeof template] }}
              </h3>
              <p>
                {{
                  template[
                    (templateTypeKey + 'Description') as keyof typeof template
                  ]
                }}
              </p>
            </div>
          </li>
        </ul>
        <div class="row mobile-only">
          <button
            class="btn mobile-full-width"
            @click="
              onClickChooseTemplate(
                Object.values(props.templates as any)[currentIndex]
              )
            "
          >
            <span
              >New
              {{
                capitalize(Object.keys(props.templates || [])[currentIndex])
              }}</span
            >
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script lang="ts" setup>
import ModalController from '@/controllers/modal-controller';
import { getSheetImage } from '@/game-data/sheets/sheet-util';
import { capitalize } from '@/util/string';
import { PropType, defineProps, ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';

const props = defineProps({
  sheetType: String,
  description: String,
  templateTypeKey: String,
  templates: Object, // Object of key/value pairs like { assassins: new Assassins() }
  onConfirm: {
    type: Function as PropType<(sheetType: string, template: any) => void>,
    required: true
  }
});

function onClickChooseTemplate(template: any) {
  console.log('template', template);
  props.onConfirm(props.sheetType as string, template);
  ModalController.close();
}

const currentIndex = ref(0);
function updateCurrentIndex(carousel: HTMLElement) {
  const listItemWidth = carousel.children[0].clientWidth;
  // Get the current index from the scroll position
  // Add half the width of the list item to get the index of the center of the item
  const index = (carousel.scrollLeft + listItemWidth / 2) / listItemWidth;
  currentIndex.value = Math.floor(index);
}
</script>

<style lang="scss" scoped>
.modal {
  min-width: 64rem;
}

.template-picker {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  overflow-y: auto;

  ul.scroll-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
    gap: 1.6rem;

    > li {
      width: 100%;
    }
  }
}

.template-card {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: var(-shadow);
  border-radius: 5px;
  overflow: hidden;

  &:hover {
    filter: brightness(1.2);
  }

  > img {
    position: absolute;
    left: -1rem;
    top: -1rem;
    width: calc(100% + 2rem);
    height: calc(100% + 2rem);
    object-fit: cover;
    filter: brightness(0.8);
  }

  > h3 {
    text-align: center;
    width: 100%;
    color: var(--light);
    margin: 3.2rem 0;
    font-size: 2.8rem;
    font-weight: bold;
    text-shadow: 2px 2px 2px var(--dark);
  }

  > p {
    width: 100%;
    margin-top: auto;
    background-color: var(--translucent-heavy);
    padding: 2rem;
    font-style: italic;
    text-align: center;
    z-index: 1;
  }
}

@media (max-width: 768px) {
  .modal :deep(.modal__content) {
    padding: 0;
  }

  .template-picker {
    gap: 0;
    > :not(ul) {
      padding: 0 2rem;

      &:first-child {
        padding-top: 2rem;
      }

      &:last-child {
        padding-bottom: 2rem;
      }
    }
  }
  .template-picker > ul.scroll-container {
    padding: 2rem 2rem;
    display: flex;
    height: calc(100% - 2rem);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    align-items: center;
    gap: 0;

    > li {
      scroll-snap-align: center;

      min-width: 80%;
      height: 100%;
      display: flex;
      align-items: center;
      .template-card {
        width: 100%;
        height: calc(100% - 4rem);
        transition-property: transform, filter, height;
        transition-duration: 0.3s;
        box-shadow: var(--shadow);
        display: flex;
        align-items: center;

        filter: brightness(0.4);

        > h3 {
          margin-top: 3.2rem;
          font-size: 2.4rem;
        }

        > p,
        h3 {
          opacity: 0;
          transition: opacity 0.5s;
        }

        &.left-of-active {
          transform: rotateZ(-3deg);
        }

        &.right-of-active {
          transform: rotateZ(3deg);
        }

        &.active {
          z-index: 1;
          filter: brightness(1);
          height: 100%;

          > p,
          h3 {
            transition-delay: 0.5s;
            opacity: 1;
            z-index: 1;
          }
        }

        &.prevent-click-on-mobile {
          pointer-events: none;
        }
      }
    }
  }
}
</style>
