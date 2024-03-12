<script setup>
import { nextTick, ref, watch } from 'vue';

const menu = ref(['Maps', 'Notice', 'Cloud', 'News']);
const activeItem = ref(menu.value[0]);

let offsetLeftActive = ref();
let widthActive = ref(0);

const moveActive = async () => {
  await nextTick();
  const activeMenuItemElement = document.querySelector('.menu-ui__item_active');

  if (activeMenuItemElement) {
    offsetLeftActive.value = activeMenuItemElement.offsetLeft;
    widthActive.value = activeMenuItemElement.offsetWidth;
  }
};

watch(activeItem, moveActive, { immediate: true });
</script>

<template>
  <div class="menu-ui">
    <nav>
      <ul class="">
        <li
          v-for="item in menu"
          :key="item"
          class="menu-ui__item"
          :class="{ 'menu-ui__item_active': activeItem === item }"
          @click="activeItem = item"
        >
          {{ item }}
        </li>
      </ul>
    </nav>
    <div
      class="menu-ui__active-element"
      :style="{
        width: `${widthActive}px`,
        left: `${offsetLeftActive}px`,
      }"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.menu-ui {
  position: relative;
  background: $background-menu-ui;
  color: $color-text-menu-ui;
  border-radius: 20px;
  border: 2px solid $border-color-ui;

  &__active-element {
    position: absolute;
    top: 3px;
    bottom: 3px;
    border-radius: 20px;
    background: $background-menu-ui-active;
    transition: all 0.3s;
  }

  ul {
    position: relative;
    z-index: 2;
    display: flex;
    margin: 0;
    list-style: none;
    padding: 3px;
  }

  &__item {
    padding: 6px 12px;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 20px;
    font-size: 12px;

    &:hover {
      opacity: 0.7;
    }

    &_active {
      color: $color-text-menu-ui-active;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
