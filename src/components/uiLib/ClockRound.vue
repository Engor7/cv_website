<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const rotateHour = ref(0);
const rotateMinute = ref(0);
const rotateSecond = ref(0);
let clockInterval;

const clock = () => {
  const date = new Date();

  const hours = ((date.getHours() + 11) % 12) + 1;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  rotateHour.value = hours * 30;
  rotateMinute.value = minutes * 6;
  rotateSecond.value = seconds * 6;
};

onMounted(() => {
  clock();

  clockInterval = setInterval(() => {
    clock();
  }, 1000);
});

onUnmounted(() => {
  clearTimeout(clockInterval);
});
</script>

<template>
  <div class="clock">
    <div class="clock__round">
      <div
        class="clock__hour"
        :style="{ transform: `rotate(${rotateHour}deg)` }"
      ></div>
      <div
        class="clock__minute"
        :style="{ transform: `rotate(${rotateMinute}deg)` }"
      ></div>
      <div
        class="clock__second"
        :style="{ transform: `rotate(${rotateSecond}deg)` }"
      ></div>
      <div class="clock__indicator-wrapper">
        <div
          v-for="i in 60"
          :key="i"
          class="clock__indicator"
          :style="{ transform: `rotateZ(${6 * i}deg)` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.clock {
  display: flex;
  align-items: center;
  justify-content: center;
  background: $background-clock;
  border-radius: 30px;
  padding: 8px;
  width: 160px;
  height: 160px;
  border: 4px solid $border-color-ui;

  &__round {
    position: relative;
    background: $background-round-clock;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    &:before,
    &:after {
      display: block;
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      border-radius: 20px;
    }

    &:before {
      width: 10px;
      height: 10px;
      background: $color-clock;
    }

    &:after {
      width: 3px;
      height: 3px;
      background: $background-round-clock;
      border: 2px solid $accent-clock;
      z-index: 4;
    }
  }

  &__hour,
  &__minute,
  &__second,
  &__indicator {
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: bottom center;
  }

  &__indicator-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &__indicator {
    position: absolute;
    width: 2px;
    height: 65px;
    margin-top: -65px;
    margin-left: -1px;

    &:before {
      content: '';
      display: block;
      width: 2px;
      height: 5px;
      background: #5c5c5c;
      border-radius: 10px;
    }

    &:nth-child(5n) {
      &:before {
        background: #fff;
        height: 8px;
      }
    }
  }

  &__hour,
  &__minute {
    display: grid;
    grid-template-rows: 1fr 8px;
    justify-items: center;

    &:before,
    &:after {
      content: '';
      position: relative;
      background: $color-clock;
    }

    &:before {
      width: 5px;
      z-index: 2;
      border-radius: 5px;
      box-shadow: 0 0 5px rgb(0 0 0 / 30%);
    }

    &:after {
      width: 2.5px;
      height: 10px;
      z-index: 3;
      top: -2px;
    }
  }

  &__hour {
    width: 5px;
    height: 43px;
    margin-left: -2.5px;
    margin-top: -43px;
    transform: rotate(10deg);
  }

  &__minute {
    width: 5px;
    height: 65px;
    margin-left: -2.5px;
    margin-top: -65px;
    transform: rotate(60deg);
    z-index: 2;
  }

  &__second {
    width: 1px;
    height: 65px;
    margin-left: -0.5px;
    margin-top: -65px;
    transform: rotate(280deg);
    background: $accent-clock;
    z-index: 3;
    border-radius: 5px;
    box-shadow: 0 0 5px rgb(0 0 0 / 50%);

    &:before {
      content: '';
      position: absolute;
      width: 1px;
      height: 13px;
      bottom: -13px;
      background: $accent-clock;
      border-radius: 5px;
    }
  }
}
</style>
