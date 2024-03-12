<script setup>
import { ref } from 'vue';
import BaseIcon from '@/components/bases/BaseIcon.vue';
import { vOnClickOutside } from '@vueuse/components';

const portfolioDev = [
  {
    id: 1,
    url: '/market/index.html',
    title: 'm1',
    img: 'V_1.webp',
    text: 'Frontend',
  },
  {
    id: 2,
    url: '/eaglesmma/index.html',
    title: 'm2',
    img: 'V_2.webp',
    text: 'Frontend',
  },
  {
    id: 6,
    url: 'https://24muvir.ru/',
    title: 'm6',
    img: 'V_6.webp',
    text: 'Backend and Frontend',
  },
  {
    id: 3,
    url: '/zoo/index.html',
    title: 'm3',
    img: 'V_3.webp',
    text: 'Frontend',
  },
  {
    id: 4,
    url: 'https://24sette.ru/',
    title: 'm4',
    img: 'V_4.webp',
    text: 'Backend and Frontend',
  },
  {
    id: 5,
    url: '/lum/index.html',
    title: 'm5',
    img: 'V_5.webp',
    text: 'Frontend',
  },
];

const portfolioDesign = [
  { id: 1, img: 'd_1.webp', imgBig: 'd_1b.webp' },
  { id: 2, img: 'd_2.webp', imgBig: 'd_2b.webp' },
  { id: 3, img: 'd_3.webp', imgBig: 'd_3b.webp' },
  { id: 4, img: 'd_4.webp', imgBig: 'd_4b.webp' },
  { id: 5, img: 'd_5.webp', imgBig: 'd_5b.webp' },
  { id: 6, img: 'd_6.webp', imgBig: 'd_6b.webp' },
];

const selectedItemId = ref(false);
const selectedDesignImage = ref(false);
const imageLoaded = ref(false);

const zoomed = ref(false);
const zoomStyle = ref('');

const onClickOutsideHandler = [
  () => {
    selectedDesignImage.value = false;
    imageLoaded.value = false;
    zoomStyle.value = '';
  },
];

const handleImageClick = event => {
  const img = event.target;

  if (event.target.tagName !== 'IMG') {
    zoomStyle.value = '';
    return;
  }

  const { left, top, width, height } = img.getBoundingClientRect();
  const clickX = event.clientX - left;
  const clickY = event.clientY - top;

  const translateX = (width / 2 - clickX) * 0.6;
  const translateY = (height / 2 - clickY) * 0.6;

  zoomed.value = !zoomed.value;

  zoomStyle.value = zoomed.value
    ? `transform: scale(1.6) translate(${translateX}px, ${translateY}px);`
    : '';
};
</script>

<template>
  <div class="portfolio-main container-block-main">
    <h3>{{ $t('portfolio') }}</h3>
    <div class="portfolio-main__wrapper">
      <div class="portfolio-main__block">
        <div class="portfolio-main__header">
          {{ $t('frontAndBack') }}
        </div>
        <div class="portfolio-main__items">
          <div
            v-for="item in portfolioDev"
            :key="item.id"
            class="portfolio-main__item"
            @mouseenter="selecteItemId = item.id"
            @mouseleave="selecteItemId = false"
            :class="{
              'portfolio-main__item_transparent':
                selectedItemId !== false && selectedItemId !== item.id,
            }"
          >
            <div class="portfolio-main__item-img">
              <a :href="item.url" target="_blank"
                ><img
                  :src="`src/assets/portfolio_img/${item.img}`"
                  :alt="item.text"
              /></a>
            </div>
            <div class="portfolio-main__item-title">
              <a :href="item.url" target="_blank">{{ $t(item.title) }}</a>
            </div>
            <div class="portfolio-main__item-icon">
              <BaseIcon name="IconArrowUpRight" />
            </div>
          </div>
        </div>
      </div>
      <div class="portfolio-main__block">
        <div class="portfolio-main__header">{{ $t('design') }}</div>
        <div class="portfolio-main__items">
          <div
            v-for="item in portfolioDesign"
            :key="item.id"
            class="portfolio-main__item"
          >
            <img
              :src="`src/assets/portfolio_img/${item.img}`"
              alt="design"
              @click="selectedDesignImage = item.imgBig"
            />
            <div class="portfolio-main__item-icon">
              <BaseIcon name="IconZoom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="selectedDesignImage"
    class="modal-img"
    @click="handleImageClick"
    :class="{ 'modal-img_zoom': zoomStyle }"
  >
    <div v-if="!imageLoaded" class="modal-img__loading">
      {{ $t('loading') }}
    </div>
    <img
      :src="`src/assets/portfolio_img/${selectedDesignImage}`"
      alt=""
      v-show="imageLoaded"
      @load="imageLoaded = true"
      v-on-click-outside="onClickOutsideHandler"
      :style="zoomStyle"
    />
    <div class="modal-img__close">
      <BaseIcon name="IconClose" />
    </div>
  </div>
  <footer>
    <div class="footer">
      <h3>{{ $t('contacts') }}</h3>
      <div class="footer__wrapper">
        <div class="footer__connection">
          <a href="https://t.me/egor_erygin">Telegram</a>
          <a href="mailto:contact@egorjs.ru">contact@egorjs.ru</a>
        </div>
        <div class="footer__copy">
          <span>egorjs.ru</span>
          <span>©</span>
          <span>2024</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.portfolio-main {
  padding-left: 30px;
  padding-right: 30px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 60px;
    margin-top: 60px;
  }

  &__header {
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 18px;
    opacity: 0.8;
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 40px;

    @media screen and (max-width: 1660px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (max-width: 1240px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 900px) {
      gap: 30px;
    }

    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      row-gap: 20px;
    }
  }

  &__item-icon {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    background: #000;
    opacity: 0;
    transition: all 0.3s;
    transform: scale(0.5);

    svg {
      stroke: #fff;
      fill: #000;
      width: 19px;
      height: 19px;
      transition: all 0.3s;
      transition-delay: 0.15s;
      transform: translate(-10px, 10px);
      opacity: 0;
    }
  }

  &__item {
    transition: all 0.9s;
    position: relative;

    &:hover {
      img {
        box-shadow: 0 50px 100px 0 $color-shadow-portfolio;
        transform: scale(1.12) translateY(-8px);
      }

      .portfolio-main__item-title {
        transform: scale(1.12) translateY(3px);
      }

      .portfolio-main__item-icon {
        opacity: 1;
        top: 0;
        right: 0;
        transform: scale(1);

        svg {
          opacity: 1;
          transform: translate(0, 0);
        }
      }
    }

    img {
      width: 100%;
      border-radius: 5px;
      transition: all 0.4s;
      cursor: pointer;
    }

    a {
      display: inline-block;
      color: $color-text;
      text-decoration: none;
    }

    &_transparent {
      opacity: 0.2;
    }

    @media screen and (max-width: 800px) {
      &:hover {
        img {
          transform: scale(1.05) translateY(-8px);
        }
        .portfolio-main__item-title {
          transform: scale(1.05) translateY(-3px);
        }
      }
    }
  }

  &__item-title {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;
    line-height: 140%;
    text-align: center;
    padding: 0 10px;
    transition: all 0.8s;
  }

  @media screen and (max-width: 1240px) {
    padding-left: 0;
    padding-right: 0;

    &__wrapper {
      gap: 30px;
      margin-top: 30px;
    }

    &__header {
      margin-bottom: 15px;
      font-size: 16px;
    }
  }

  @media screen and (max-width: 900px) {
    &__item-title {
      padding: 0;
      font-size: 12px;
      font-weight: 400;
      text-align: left;
      margin-top: 5px;
    }
  }
}

.modal-img {
  display: flex;
  justify-content: center;
  align-items: start;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 20;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 40px;

  &__loading {
    color: #fff;
  }

  img {
    max-width: 70%;
    height: auto;
    border-radius: 15px;
    transition: transform 0.3s ease;
    cursor: zoom-in;
  }

  &_zoom {
    img {
      cursor: zoom-out;
    }
  }

  &__close {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 60px;
    height: 60px;
    top: 40px;
    right: 40px;
    background: #fff;
    border-radius: 20px;
    transition: all 0.3s;
    cursor: pointer;

    svg {
      fill: #000;
      width: 40px;
      height: 40px;
    }

    &:hover {
      transform: scale(1.1) rotate(180deg);
    }
  }

  @media screen and (max-width: 1450px) {
    img {
      max-width: 65%;
    }
  }

  @media screen and (max-width: 990px) {
    padding: 60px 15px;

    img {
      max-width: 100%;
    }

    &__close {
      top: 15px;
      right: 15px;
      width: 30px;
      height: 30px;
      border-radius: 10px;

      svg {
        width: 15px;
        height: 15px;
      }
    }
  }
}

.footer {
  padding: 120px 30px 60px 30px;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-top: 30px;
  }

  &__connection {
    display: flex;
    flex-direction: column;
    gap: 13px;

    a {
      font-size: 23px;
      color: $color-text;
      transition: all 0.3s;

      &:hover {
        color: $accent;
      }
    }
  }

  &__copy {
    display: flex;
    gap: 7px;
    align-items: center;
    opacity: 0.48;
  }

  @media screen and (max-width: 1660px) {
    padding-top: 60px;
  }

  @media screen and (max-width: 1240px) {
    padding-left: 0;
    padding-right: 0;
  }

  @media screen and (max-width: 1100px) {
    padding-bottom: 0;
  }

  @media screen and (max-width: 800px) {
    &__wrapper {
      margin-top: 15px;
    }

    &__connection {
      a {
        font-size: 16px;
      }
    }
  }
}
</style>
