<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Attribution</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="attribution">
        <p>
          This work is based on
          <a
            class="anchor-link"
            href="http://www.bladesinthedark.com/"
            target="_blank"
          >
            Blades in the Dark
          </a>
          , product of One Seven Design, developed and authored by John Harper,
          and licensed for our use under the
          <a
            class="anchor-link"
            href="http://creativecommons.org/licenses/by/3.0/"
            target="_blank"
          >
            Creative Commons Attribution 3.0 Unported license
          </a>
        </p>
        <Divider />
        <p>
          This website is made and maintained by
          <a class="anchor-link" href="https://olinkirk.land" target="_blank"
            >Olin&nbsp;Kirkland</a
          >
        </p>
        <Divider />
        <img src="/images/fitd-logo.webp" />
        <p>
          Blades in the Dark™ is a trademark of One Seven Design. The Forged in
          the Dark Logo is © One Seven Design, and is used with permission
        </p>

        <Divider />
        <p class="images-description">
          Illustrations are by
          <a
            class="anchor-link"
            href="https://www.reddit.com/user/perryphery/submitted/"
            target="_blank"
            >u/perryphery on Reddit</a
          >
        </p>

        <Divider />
        <p class="images-description">
          Cover images are from
          <a class="anchor-link" href="https://unsplash.com/" target="_blank"
            >Unsplash</a
          >
        </p>
        <ul class="images">
          <li v-for="image in coverImages" :key="image.id">
            <a :href="image.source" target="_blank">
              <img :src="image.url" />
              <p>
                {{ image.name }}<br />
                <span class="muted">by {{ shortenAuthor(image.author) }}</span>
              </p>
            </a>
          </li>
        </ul>

        <Divider />
        <p class="images-description">
          Icons are from
          <a class="anchor-link" href="https://fontawesome.com/" target="_blank"
            >Font Awesome</a
          >
          and <a class="anchor-link" href="https://icons8.com/">Icons8</a>
        </p>
        &nbsp;
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import coverImages from '@/assets/data/cover-images.json';
import Divider from '@/components/Divider.vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';

const currentYear = new Date().getFullYear();

const shortenAuthor = (author: string) => {
  const [firstName, lastName] = author.split(' ');
  if (!lastName) return firstName;
  return `${firstName} ${lastName[0]}.`;
};
</script>

<style scoped lang="scss">
.modal {
  min-width: 64rem;
}

.attribution {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;

  > img {
    max-width: 20rem;
    margin: 0 auto;
  }
}

p.images-description {
  text-align: center;
}

ul.images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  gap: 1.6rem;
  background-color: var(--translucent-light);
  padding: 2.4rem;

  > li > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.8rem;
    cursor: pointer;

    > img {
      width: 4rem;
      height: 4rem;
      border-radius: 100%;
    }
  }
}
</style>
