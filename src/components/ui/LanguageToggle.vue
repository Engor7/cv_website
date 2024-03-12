<script setup>
import { i18n } from '@/common/i8n/index.js';
import { useInterfaceStateStore } from '@/stores/interfaceStateStore.js';
const interfaceStateStore = useInterfaceStateStore();

const toggleTheme = () => {
  setLanguage(i18n.global.locale === 'ru' ? 'en' : 'ru');
};

const setLanguage = language => {
  i18n.global.locale = language;
  localStorage.setItem('language', language);
};
</script>

<template>
  <div
    class="language-toggle"
    :class="{
      'language-toggle_en': i18n.global.locale === 'en',
      'language-toggle_fixed': interfaceStateStore.$state.isPageHeaderFixed,
    }"
    @click="toggleTheme"
  >
    <span>RU</span><span>/</span><span>ENG</span>
  </div>
</template>

<style scoped lang="scss">
.language-toggle {
  display: flex;
  gap: 4px;
  cursor: pointer;
  user-select: none;

  span {
    display: inline-block;
    transition: opacity 0.3s;

    &:last-child {
      opacity: 0.36;
    }
  }

  &_en {
    span {
      &:first-child {
        opacity: 0.36;
      }

      &:last-child {
        opacity: 1;
      }
    }
  }

  &_fixed {
    color: $color-text-page-header-fixed;
  }

  @include media-mobile {
    font-size: 12px;

    &_fixed {
      transform: translateY(-10px);
      opacity: 0;
      animation: animate-slide-top 0.2s 0.5s ease-in-out forwards;
    }
  }
}
</style>
