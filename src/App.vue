<script setup>
import { onMounted, watchEffect } from 'vue';
import { useInterfaceStateStore } from '@/stores/interfaceStateStore.js';
const interfaceStateStore = useInterfaceStateStore();

const initAndWatchColorScheme = () => {
  onMounted(() => {
    interfaceStateStore.initTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', event => {
      interfaceStateStore.setTheme(event.matches ? 'dark' : 'light');
    });
  });

  watchEffect(() => {
    document.body.setAttribute('data-theme', interfaceStateStore.theme);
  });
};

initAndWatchColorScheme();
</script>

<template>
  <router-view />
</template>
