<script setup>
import { useInterfaceStateStore } from '@/stores/interfaceStateStore.js';
const interfaceStateStore = useInterfaceStateStore();
</script>

<template>
  <div
    class="artist"
    :class="{
      artist_fixed: interfaceStateStore.$state.isPageHeaderFixed,
    }"
  >
    <div class="artist__avatar">
      <img src="@/assets/avatar.jpg" alt="Avatar artist" />
    </div>
    <div class="artist__info">
      <div class="artist__info-name">{{ $t('name') }}</div>
      <div class="artist__info-spec">
        <span>{{ $t('specFront') }}</span>
        <span>{{ $t('specDesign') }}</span>
      </div>
    </div>
    <div class="artist__hello">Hello</div>
  </div>
</template>

<style scoped lang="scss">
.artist {
  position: relative;
  display: flex;
  gap: 10px;
  outline: none;
  cursor: pointer;

  &__avatar {
    display: flex;
    width: 56px;
    height: 56px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;

    img {
      height: 100%;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
  }

  &__info-name {
    font-size: 16px;
    font-weight: 600;
  }

  &__info-spec {
    display: flex;
    height: 15px;
    flex-direction: column;
    font-size: 13px;
    overflow: hidden;
    opacity: 0.5;

    span {
      display: inline-block;

      &:first-child {
        margin-top: 0;
        animation: animate-artist-spec 9s 0.3s ease-in infinite;
      }

      @keyframes animate-artist-spec {
        0% {
          margin-top: 0;
          opacity: 1;
        }

        45% {
          margin-top: 0;
          opacity: 1;
        }

        50% {
          margin-top: -15px;
          opacity: 0;
        }

        95% {
          margin-top: -15px;
          opacity: 0;
        }

        100% {
          margin-top: 0;
          opacity: 1;
        }
      }
    }
  }

  transform-style: preserve-3d;
  perspective: 100px;
  perspective-origin: center center;

  &__hello {
    position: absolute;
    bottom: -40px;
    font-size: 14px;
    background: $accent;
    color: #fff;
    padding: 6px 12px;
    border-radius: 30px;
    transform: scale(0) rotateX(-50deg) translateY(60px);
    transform-origin: center center;
    opacity: 0;
    filter: blur(10px);
    transition: all 0.48s;
  }

  &:hover {
    .artist__hello {
      transform: scale(1) rotateX(0) translateY(0);
      opacity: 1;
      filter: blur(0);
    }
  }

  &_fixed {
    color: $color-text-page-header-fixed;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      inset: -5px;
      right: -30px;
      background: linear-gradient(
        to right,
        $gradient-artist-fixed,
        transparent
      );
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
    }

    @media screen and (max-width: 1100px) {
      &:after {
        inset: -3px;
      }
    }

    .artist__avatar {
      width: 40px;
      height: 40px;
      z-index: 2;
    }

    .artist__info {
      gap: 3px;
      z-index: 2;

      span {
        line-height: 14px;
      }
    }

    .artist__info-name {
      font-size: 14px;
    }

    .artist__info-spec {
      font-size: 11px;
    }

    .artist__hello {
      bottom: 6px;
      right: -75px;
      z-index: 2;
    }

    @include media-mobile {
      .artist__avatar {
        transform: scale(0.8) rotate(15deg);
        opacity: 0;
        animation: animate-rotate 0.2s 0.2s ease-in-out forwards;
      }

      .artist__info-name {
        transform: scale(0.8) translateX(-20px);
        opacity: 0;
        animation: animate-slide-left 0.2s 0.3s ease-in-out forwards;
      }

      .artist__info-spec {
        transform: scale(0.8) translateX(-20px);
        opacity: 0;
        animation: animate-slide-left 0.2s 0.4s ease-in-out forwards;
      }
    }
  }

  @include media-mobile {
    gap: 5px;

    .artist__avatar {
      width: 45px;
      height: 45px;
    }

    .artist__info-name {
      font-size: 13px;
    }

    .artist__info-spec {
      font-size: 11px;
    }

    .artist__info {
      gap: 4px;

      span {
        line-height: 14px;
      }
    }

    .artist__hello {
      bottom: -35px;
      right: auto;
    }
  }
}
</style>
