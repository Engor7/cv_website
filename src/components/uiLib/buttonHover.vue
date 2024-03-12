<script setup>
import { ref } from 'vue';
import BaseIcon from '@/components/bases/BaseIcon.vue';

const props = defineProps({
  to: String,
  text: String,
  iconName: {
    type: String,
    required: false,
  },
});

const isViewBackgroun = ref(false);
const topBackground = ref(0);
const leftBackground = ref(0);

const mouseEnter = e => {
  isViewBackgroun.value = true;
  topBackground.value = e.layerY;
  leftBackground.value = e.layerX;
};

const mouseLeave = () => {
  isViewBackgroun.value = false;
  topBackground.value = 0;
  leftBackground.value = 0;
};
</script>

<template>
  <RouterLink
    :to="props.to"
    class="button-hover"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <span>{{ props.text }}</span>
    <BaseIcon v-if="props.iconName" :name="props.iconName" />
    <div
      v-show="isViewBackgroun"
      class="button-hover__background"
      :style="{ top: `${topBackground}px`, left: `${leftBackground}px` }"
    ></div>
  </RouterLink>
</template>

<style scoped lang="scss">
.button-hover {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  color: $color-button-hover-second;
  text-decoration: none;
  border: 1px solid $color-button-hover;
  background: $color-button-hover;
  border-radius: 30px;
  padding: 5px 18px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;

  svg,
  span {
    position: relative;
    z-index: 2;
  }

  svg {
    width: 16px;
    stroke: $color-button-hover-second;
    transition: all 0.3s;
  }

  @media screen and (max-width: 1220px) {
    padding: 3px 15px;
    gap: 8px;

    svg {
      width: 13px;
    }
  }

  &:hover {
    color: $color-button-hover;
    transform: scale(1.02);

    svg {
      stroke: $color-button-hover;
      transform: translateX(3px);
    }
  }

  &__background {
    width: 10px;
    height: 10px;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    background: $color-button-hover-second;
    z-index: 1;
    border-radius: 50%;
    transform: scale(0);
    animation: animate-button-bg 0.3s linear forwards;
    transition: all 0.3s;
  }

  @keyframes animate-button-bg {
    0% {
      opacity: 0;
      transform: scale(0);
    }

    100% {
      opacity: 1;
      transform: scale(30);
    }
  }
}
</style>
