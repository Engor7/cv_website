<script setup>
import { useInterfaceStateStore } from '@/stores/interfaceStateStore.js';
import BaseIcon from '@/components/bases/BaseIcon.vue';
const interfaceStateStore = useInterfaceStateStore();

const setTe = () => {
  interfaceStateStore.toggleTheme();
};
</script>

<template>
  <div
    class="theme-toggle"
    :class="{
      'theme-toggle_dark': interfaceStateStore.$state.theme === 'dark',
      'theme-toggle_fixed': interfaceStateStore.$state.isPageHeaderFixed,
    }"
    :data-theme="
      interfaceStateStore.$state.theme === 'dark' ? $t('dark') : $t('light')
    "
    @click="setTe"
  >
    <div class="theme-toggle__item"><BaseIcon name="IconSun" /></div>
    <div class="theme-toggle__item"><BaseIcon name="IconMoon" /></div>
  </div>
</template>

<style scoped lang="scss">
.theme-toggle {
  display: flex;
  position: relative;
  padding: 3px;
  background: #e4e4e7;
  border-radius: 20px;
  cursor: pointer;

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    width: 22px;
    height: 22px;

    @include media-mobile {
      width: 20px;
      height: 20px;
    }
  }

  svg {
    fill: #3b3b3b;
    width: 14px;
    height: auto;
  }

  &:after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    background: #fff;
    border-radius: 50px;
    transition: all 0.3s;
  }

  &:before {
    content: attr(data-theme);
    display: block;
    position: absolute;
    top: -10px;
    font-size: 11px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: all 0.3s;
    text-transform: capitalize;
  }

  &:hover {
    &:before {
      top: -20px;
      opacity: 1;
    }
  }

  @include media-mobile {
    padding: 2px;

    &:before {
      display: none;
    }

    &:after {
      top: 2px;
      left: 2px;
      bottom: 3px;
      width: 20px;
      height: 20px;
    }

    &_fixed {
      transform: translateY(-10px);
      opacity: 0;
      animation: animate-slide-top 0.2s 0.6s ease-in-out forwards;
    }
  }

  &_dark {
    background: $accent;

    svg {
      fill: #fff;
    }

    &:after {
      left: 25px;
    }

    @include media-mobile {
      &:after {
        left: 22px;
      }
    }
  }

  &_fixed {
    background: $color-header-page-fixed-one;

    &:before {
      display: none;
    }

    svg {
      fill: $color-header-page-fixed-two;
    }

    &:after {
      background: $color-header-page-fixed-two;
    }
  }
}
</style>
