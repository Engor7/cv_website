<script setup>
import { ref } from 'vue';
import BaseIcon from '@/components/bases/BaseIcon.vue';

const isShowAll = ref(false);
const expMain = ref(null);

const toggleShowAll = () => {
  const y = expMain.value.getBoundingClientRect().top + window.scrollY - 25;

  window.scroll({
    top: y,
    behavior: 'smooth',
  });

  isShowAll.value = !isShowAll.value;
};
</script>

<template>
  <div
    class="exp-main container-block-main"
    :class="{ 'exp-main_show-all': isShowAll }"
    ref="expMain"
  >
    <h3>{{ $t('experience') }}</h3>
    <div class="exp-main__wrapper">
      <div class="exp-main__blocks">
        <div class="exp-main__block">
          <p>
            {{ $t('expContent') }}
          </p>
        </div>
        <div class="exp-main__block">
          <h4>ECOS Bitcoin Mining Ecosystem</h4>
          <div class="exp-main__info">
            <b>Frontend-разработчик</b>
            <span>Июнь 2024 — сейчас (1 год и 6 месяцев)</span>
          </div>
          <div class="exp-main__exp" v-html="$t('expEcosContent')" />
        </div>
        <div class="exp-main__block">
          <h4>CityAds Media</h4>
          <div class="exp-main__info">
            <b>Frontend-разработчик</b>
            <span>Март 2024 — Сентябрь 2024 (7 месяцев)</span>
          </div>
          <div class="exp-main__exp" v-html="$t('expAdsCity')" />
        </div>
        <div class="exp-main__block">
          <h4>{{ $t('expOsHeader') }}</h4>
          <div class="exp-main__info">
            <b>Frontend-разработчик, Дизайнер</b>
            <span>Февраль 2023 — Январь 2024 (1 год)</span>
          </div>
          <div class="exp-main__exp" v-html="$t('expOsContent')" />
        </div>
        <div class="exp-main__block">
          <h4>{{ $t('expFreeHeader') }}</h4>
          <div class="exp-main__info">
            <b>Frontend-разработчик, иногда Fullstack</b>
            <span>Март 2017 — Декабрь 2022 (5 лет и 10 месяцев)</span>
          </div>
          <div class="exp-main__exp" v-html="$t('expFreeContent')" />
        </div>
        <div class="exp-main__block">
          <div class="exp-main__exp">{{ $t('expAdd') }}</div>
        </div>
      </div>
    </div>
    <div class="exp-main__show-more" @click="toggleShowAll">
      <BaseIcon name="IconChevronDown" />
      <span v-if="isShowAll">{{ $t('hide') }}</span>
      <span v-else>{{ $t('showMore') }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.exp-main {
  padding-left: 30px;

  &__blocks {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 48px;
  }

  &__block {
    &:first-child {
      grid-row: 1/4;
    }

    &:last-child {
      grid-column: span 2;
    }

    h4 {
      margin-bottom: 0;
    }

    p {
      opacity: 0.8;
      font-size: 14px;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 14px;
    margin: 16px 0 24px 0;
    opacity: 0.6;

    b {
      font-weight: 500;
    }
  }

  &__exp {
    font-size: 14px;
    line-height: 160%;

    :deep(p),
    :deep(ul) {
      font-size: 14px;
      line-height: 160%;
      margin-bottom: 12px;

      &.mb-4 {
        margin-bottom: 4px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(ul) {
      padding-left: 15px;
    }
  }

  &__show-more {
    display: none;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: $background-frame;
    border: 1px solid $border-all-view;
    padding: 12px;
    border-radius: 30px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;

    svg {
      stroke: $color-text;
      width: 15px;
    }
  }

  @media screen and (max-width: 1240px) {
    padding-left: 0;

    &__wrapper {
      perspective: 500px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 80%;
        background: linear-gradient(transparent, var(--background));
        z-index: 3;
        transition: all 0.3s;
      }
    }

    &__blocks {
      position: relative;
      grid-template-columns: 1fr;
      gap: 25px;
      height: 160px;
      overflow: hidden;
      transform: rotateX(-13deg);
      transform-origin: top;
      padding-bottom: 30px;
      transition: all 0.3s;
    }

    &__block {
      padding: 0;
      grid-column: span 2;
    }

    &__show-more {
      display: flex;
    }

    &_show-all {
      .exp-main__wrapper {
        &:before {
          display: none;
        }
      }

      .exp-main__blocks {
        height: auto;
        transform: rotateX(0deg);
      }

      .exp-main__show-more svg {
        transform: rotateX(180deg);
      }
    }
  }
}
</style>
