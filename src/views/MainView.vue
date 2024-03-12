<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref } from 'vue';
import { scrollToBlock } from '@/common/utils.js';
import { useInterfaceStateStore } from '@/stores/interfaceStateStore.js';
import StartMain from '@/components/MainPage/StartMain.vue';
import SkillsMain from '@/components/MainPage/SkillsMain.vue';
import ExperienceMain from '@/components/MainPage/ExperienceMain.vue';
import PortfolioMain from '@/components/MainPage/PortfolioMain.vue';

const route = useRoute();
const router = useRouter();
const interfaceStateStore = useInterfaceStateStore();

const blocks = ref([]);

const addBlock = block => {
  if (block) blocks.value.push(block);
};

const updateHash = () => {
  if (interfaceStateStore.$state.isScrolling) return;

  const scrollPosition = window.scrollY + window.innerHeight / 2;
  let newHash;

  const blockElements = Array.from(blocks.value);

  for (let blockElement of blockElements) {
    const { top, bottom } = blockElement.getBoundingClientRect();
    const elementTop = top + window.scrollY;
    const elementBottom = bottom + window.scrollY;

    if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
      newHash = `#${blockElement.id}`;
      break;
    }
  }

  if (newHash !== window.location.hash) {
    router
      .replace(newHash ? { hash: newHash } : { hash: '' })
      .catch(console.log);
  }
};

onMounted(() => {
  scrollToBlock(route.hash);
  window.addEventListener('scroll', updateHash);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateHash);
});
</script>

<template>
  <div class="container">
    <div class="block-start" :ref="addBlock">
      <StartMain />
    </div>
    <div id="skills" :ref="addBlock">
      <SkillsMain />
    </div>
    <div id="experience" :ref="addBlock">
      <ExperienceMain />
    </div>
    <div id="portfolio" :ref="addBlock">
      <PortfolioMain />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
