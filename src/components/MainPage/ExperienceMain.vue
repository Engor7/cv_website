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
          <h4>{{ $t('expOsHeader') }}</h4>
          <p>{{ $t('expOsContent') }}</p>
        </div>
        <div class="exp-main__block">
          <h4>{{ $t('expFreeHeader') }}</h4>
          <p>{{ $t('expFreeContent') }}</p>
        </div>
        <div class="exp-main__block">
          <p>{{ $t('expAdd') }}</p>
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
    grid-gap: 35px;
  }

  &__block {
    &:first-child {
      grid-row: 1/4;
    }

    &:last-child {
      grid-column: span 2;
    }

    p {
      opacity: 0.8;
      font-size: 14px;
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
    &__blocks {
      gap: 30px;
    }

    &__block {
      padding: 0;

      &:nth-child(3),
      &:nth-child(2) {
        grid-column: span 2;
      }
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
