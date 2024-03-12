<script setup>
import { ref, watchEffect, nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { vOnClickOutside } from '@vueuse/components';
import { getCleanRoute } from '@/common/utils.js';
import { getRandomNumber, scrollToBlock } from '@/common/utils.js';
import { useInterfaceStateStore } from '@/stores/interfaceStateStore.js';
import { i18n } from '@/common/i8n/index.js';

const route = useRoute();
const interfaceStateStore = useInterfaceStateStore();

const menuItems = ref([
  {
    title: 'home',
    link: '',
    typeLink: 'hash',
    isActive: true,
  },
  {
    title: 'skills',
    link: '#skills',
    typeLink: 'hash',
    isActive: false,
  },
  {
    title: 'experience',
    link: '#experience',
    typeLink: 'hash',
    isActive: false,
  },
  {
    title: 'portfolio',
    link: '#portfolio',
    typeLink: 'hash',
    isActive: false,
  },
  {
    title: 'uilib',
    link: 'uilib',
    typeLink: 'page',
    isActive: false,
  },
  // {
  //   title: 'articles',
  //   link: 'articles',
  //   typeLink: 'page',
  //   isActive: false,
  // },
]);
const ignoreElRef = ref();
let openNav = ref(false);

let offsetLeftGalaxyEffect = ref();
let widthGalaxyEffect = ref(0);

const onClickOutsideHandler = [
  () => {
    openNav.value = false;
  },
  { ignore: [ignoreElRef] },
];

const assignActiveMenuItem = link => {
  link = getCleanRoute(link);

  menuItems.value.forEach(
    item => (item.isActive = link === getCleanRoute(item.link)),
  );
};

const moveGalaxyEffect = async () => {
  await nextTick();
  const activeMenuItemElement = document.querySelector('.menu__item_active');

  if (activeMenuItemElement) {
    offsetLeftGalaxyEffect.value = activeMenuItemElement.offsetLeft;
    widthGalaxyEffect.value = activeMenuItemElement.offsetWidth;
  }
};

const goToPage = hash => {
  interfaceStateStore.startScroll();

  scrollToBlock(hash);
  openNav.value = false;

  setTimeout(() => {
    interfaceStateStore.stopScroll();
  }, 900);
};

const circleStyle = () => {
  const size = `${getRandomNumber(1, 3)}px`;

  return {
    width: size,
    height: size,
  };
};

onMounted(() => {
  setTimeout(() => {
    moveGalaxyEffect();
  }, 100);
});

watchEffect(() => {
  assignActiveMenuItem(route.hash || route.path);
  moveGalaxyEffect(i18n.global.locale);
});
</script>

<template>
  <nav
    class="menu"
    :class="{
      menu_disabled: interfaceStateStore.$state.isScrolling,
      menu_fixed: interfaceStateStore.$state.isPageHeaderFixed,
      menu_open: openNav,
    }"
    v-on-click-outside="onClickOutsideHandler"
  >
    <ul>
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{ menu__item_active: item.isActive }"
        @click="goToPage(item.typeLink === 'hash' ? item.link : false)"
      >
        <router-link v-if="item.typeLink === 'hash'" :to="`/${item.link}`">
          {{ $t(item.title) }}
        </router-link>
        <router-link v-else :to="`/${item.link}`"
          >{{ $t(item.title) }}
        </router-link>
      </li>
    </ul>
    <div
      class="menu__galaxy-effect"
      :style="{
        width: `${widthGalaxyEffect}px`,
        left: `${offsetLeftGalaxyEffect}px`,
      }"
    >
      <div
        class="menu__galaxy-effect-item"
        v-for="n in 20"
        :key="n"
        :style="{
          'padding-top': `${getRandomNumber(0, 20)}px`,
          'padding-left': `${getRandomNumber(0, 20)}px`,
          'animation-delay': `${getRandomNumber(0, 5)}s`,
          'animation-duration': `${getRandomNumber(5, 10)}s`,
        }"
      >
        <div
          class="menu__galaxy-effect-item-circle"
          :style="circleStyle()"
        ></div>
      </div>
    </div>
  </nav>
  <div
    class="menu-burger"
    :class="{
      'menu-burger_fixed': interfaceStateStore.$state.isPageHeaderFixed,
      'menu-burger_open': openNav,
    }"
    @click="openNav = !openNav"
    ref="ignoreElRef"
  >
    <span></span><span></span><span></span>
  </div>
</template>

<style scoped lang="scss">
.menu {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  ul {
    position: relative;
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 3;

    li {
      position: relative;

      a {
        display: inline-block;
        padding: 13px 15px;
        text-decoration: none;
        color: $color-text;
        font-weight: 500;
        border-radius: 50px;
        transition: background-color 0.2s;

        &:hover {
          background-color: $galaxy-hover-item;
        }
      }

      &.menu__item_active {
        a {
          animation: animate-active-item-menu 0.4s 0.1s linear forwards;
        }

        @keyframes animate-active-item-menu {
          100% {
            color: $galaxy-active-text;
          }
        }
      }
    }
  }

  &__galaxy-effect {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    z-index: 1;
    border-radius: 50px;
    transition: left 0.3s ease-in-out;

    &:after {
      content: '';
      display: block;
      position: absolute;
      border-radius: 50px;
      width: 100%;
      height: 100%;
      background: $galaxy-background;
      z-index: 2;
    }

    @include media-mobile {
      display: none;
    }
  }

  &__galaxy-effect-item {
    position: absolute;
    width: 100%;
    height: 100%;
    animation: animate-galaxy linear infinite;
    opacity: 0;
    z-index: 1;
    transition: all 0.3s;
  }

  @keyframes animate-galaxy {
    0% {
      opacity: 0;
    }
    35% {
      opacity: 1;
    }
    65% {
      opacity: 0.7;
    }
    100% {
      opacity: 0;
      transform: rotate(360deg);
    }
  }

  &__galaxy-effect-item-circle {
    background: $galaxy-background;
    border-radius: 20px;
  }

  &:after {
    content: '';
    display: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
  }

  &_disabled {
    &:after {
      display: block;
    }

    .menu__galaxy-effect-item {
      width: 0;
      height: 0;
    }
  }

  &_fixed {
    ul {
      li {
        a {
          color: $color-text-page-header-fixed;
          padding: 11px 15px;

          &:hover {
            background-color: $galaxy-hover-item-fixed;
          }
        }
      }
    }

    .menu__galaxy-effect {
      &:after {
        background: $background;
      }
    }

    .menu__item_active {
      a {
        animation: animate-active-item-menu-fixed 0.1s 0.1s linear forwards !important;
      }

      @keyframes animate-active-item-menu-fixed {
        100% {
          color: $galaxy-active-text-fixed;
        }
      }
    }

    .menu__galaxy-effect-item-circle {
      background: $background;
    }
  }

  @include media-mobile {
    display: none;
    background: $background-menu;
    top: -4px;
    left: auto;
    right: -14px;
    border-radius: 26px;
    transform: none;
    z-index: 5;
    padding-top: 16px;
    padding-bottom: 16px;
    overflow: hidden;

    &_open {
      display: block;

      ul {
        li {
          transform: translateY(-10px) translateX(10px);
          opacity: 0;
          animation: animate-slide-top-right 0.2s 0.2s ease-in-out forwards;

          &:nth-child(2) {
            animation-delay: 0.3s;
          }

          &:nth-child(3) {
            animation-delay: 0.4s;
          }

          &:nth-child(4) {
            animation-delay: 0.5s;
          }

          &:nth-child(5) {
            animation-delay: 0.6s;
          }

          &:nth-child(6) {
            animation-delay: 0.7s;
          }
        }
      }
    }

    ul {
      flex-direction: column;

      li {
        position: relative;

        &:before {
          content: '';
          position: absolute;
          display: block;
          background: transparent;
          width: 8px;
          height: 8px;
          border-radius: 20px;
          top: 50%;
          margin-top: -4px;
          left: 19px;
        }

        a {
          font-size: 18px;
          width: 100%;
          padding: 13px 65px 13px 40px;
          color: $color-menu;
          border-radius: 0;
          transition: all 0.3s;

          &:hover {
            background: none;
            transform: translateX(10px);
          }
        }

        &.menu__item_active {
          &:before {
            background: $color-menu;
          }

          a {
            animation: none !important;
          }
        }
      }
    }

    &_fixed {
      top: 0;
      right: 0;

      ul {
        li {
          &.menu__item_active {
            border-color: $color-menu;
          }
        }
      }
    }
  }
}

.menu-burger {
  display: none;
  position: relative;
  width: 23px;
  height: 18px;
  order: 3;
  cursor: pointer;

  span {
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 2px;
    background: $color-burger;
    z-index: 6;
    transition: all 0.2s;
    border-radius: 5px;

    &:first-child {
      top: 0;
    }

    &:nth-child(2) {
      top: 50%;
      margin-top: -1px;
    }

    &:last-child {
      bottom: 0;
    }
  }

  &:after {
    content: '';
    display: none;
    position: absolute;
    background: $background-burger;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50px;
    z-index: 5;
  }

  &_open {
    &:after {
      display: block;
    }

    span {
      background: $color-burger-open !important;
    }

    span:nth-child(1) {
      top: 50%;
      margin-top: -1px;
      transform: rotate(45deg);
    }

    span:nth-child(2) {
      transform: translateX(10px);
      opacity: 0;
    }

    span:nth-child(3) {
      top: 50%;
      margin-top: -1px;
      transform: rotate(-45deg);
    }
  }

  &_fixed {
    margin-right: 11px;

    span {
      background: $color-burger-fixed;
    }
  }

  @include media-mobile {
    display: block;

    &_fixed {
      z-index: 7;
      transform: translateY(-10px);
      opacity: 0;
      animation: animate-slide-top 0.2s 0.7s ease-in-out forwards;
    }
  }
}
</style>
