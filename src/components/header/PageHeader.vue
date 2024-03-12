<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useInterfaceStateStore } from '@/stores/interfaceStateStore.js';
import PageHeaderArtist from '@/components/header/PageHeaderArtist.vue';
import PageHeaderNav from '@/components/header/PageHeaderNav.vue';
import ThemeToggle from '@/components/ui/ThemeToggle.vue';
import LanguageToggle from '@/components/ui/LanguageToggle.vue';

const interfaceStateStore = useInterfaceStateStore();
const pageHeader = ref(null);

const handlerScroll = () => {
  const scrollPosition = window.scrollY;

  interfaceStateStore.isPageHeaderFixed = scrollPosition >= 100;
};

onMounted(() => {
  window.addEventListener('scroll', handlerScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handlerScroll);
});
</script>

<template>
  <div
    class="page-header"
    :class="{
      'page-header_fixed': interfaceStateStore.$state.isPageHeaderFixed,
    }"
    ref="pageHeader"
  >
    <PageHeaderArtist />
    <PageHeaderNav />
    <div class="page-header__tools">
      <LanguageToggle />
      <ThemeToggle />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &_fixed {
    position: fixed;
    bottom: 15px;
    left: 30px;
    right: 30px;
    opacity: 1;
    z-index: 5;
    background: $background-page-header-fixed;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 50px;
    padding: 5px 15px 5px 5px;
    overflow: hidden;
  }

  &__tools {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  @include media-mobile {
    &_fixed {
      bottom: auto;
      top: 8px;
      left: 10px;
      right: 10px;
      padding: 3px;
      overflow: visible;
    }

    &__tools {
      margin-left: auto;
      margin-right: 40px;
      gap: 20px;
    }
  }

  @media screen and (max-width: 420px) {
    &__tools {
      margin-right: 20px;
      gap: 15px;
    }
  }
}
</style>
