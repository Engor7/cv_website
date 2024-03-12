<script setup>
import PageHeader from '@/components/header/PageHeader.vue';
import { useInterfaceStateStore } from '@/stores/interfaceStateStore.js';

const interfaceStateStore = useInterfaceStateStore();
</script>

<template>
  <div
    class="main-container"
    :class="{
      'main-container_fixed-page-header':
        interfaceStateStore.$state.isPageHeaderFixed,
    }"
  >
    <PageHeader />
    <router-view />
  </div>
</template>

<style lang="scss">
.main-container {
  padding: 30px;

  &_fixed-page-header {
    margin: 56px 0;
  }

  @include media-mobile {
    padding: 15px;

    &_fixed-page-header {
      margin: 45px 0;
    }
  }
}
</style>
