<script setup>
import { ref, watch } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import BaseIcon from '@/components/bases/BaseIcon.vue';
const apiKey = '8b3e8465d2fe838a0fe28984d4f14af4';

const cities = ['Moscow', 'Berlin', 'Rome', 'Dubai', 'London', 'New York City'];

const selectedCity = ref(cities[0]);
const ignoreElRef = ref();
const isOpenSelector = ref(false);
const isLoading = ref(true);

const temperature = ref(0);
const icon = ref('01n');
const humidity = ref(0);
const pressure = ref(0);
const windSpeed = ref(0);
const cloudiness = ref(0);

const onClickOutsideHandler = [
  () => {
    isOpenSelector.value = false;
  },
  { ignore: [ignoreElRef] },
];

const fetchWeather = async city => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    temperature.value = Math.round(data.main.temp);
    icon.value = data.weather[0].icon;
    humidity.value = data.main.humidity;
    pressure.value = data.main.pressure;
    windSpeed.value = data.wind.speed;
    cloudiness.value = data.clouds.all;
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
};

watch(
  selectedCity,
  async newCity => {
    isLoading.value = true;
    isOpenSelector.value = false;

    await fetchWeather(newCity);

    isLoading.value = false;
  },
  { immediate: true },
);
</script>

<template>
  <div class="weather">
    <div class="weather__top">
      <div
        class="weather__selector-wrapper"
        v-on-click-outside="onClickOutsideHandler"
      >
        <div
          class="weather__selected-city"
          @click="isOpenSelector = !isOpenSelector"
          :class="{
            'weather__selected-city_active': isOpenSelector,
          }"
          ref="ignoreElRef"
        >
          {{ selectedCity }}
          <BaseIcon name="IconChevronDown" />
        </div>
        <div v-if="isOpenSelector" class="weather__selector-list">
          <div
            v-for="(city, index) in cities"
            :key="index"
            class="weather__selector-list-item"
            :class="{
              'weather__selector-list-item_active': city === selectedCity,
            }"
            @click="selectedCity = city"
          >
            {{ city }}
          </div>
        </div>
      </div>
      <div class="weather__temperature">
        <span v-if="temperature > 0">+</span>
        {{ temperature }}
      </div>
      <div class="weather__icon">
        <img :src="`/src/assets/weather/${icon}.png`" alt="icon" />
      </div>
    </div>
    <div class="weather__info">
      <div class="weather__info-item">
        <span>{{ $t('humidity') }}</span>
        <b>{{ humidity }}%</b>
      </div>
      <div class="weather__info-item">
        <span>{{ $t('pressure') }}</span>
        <b>{{ pressure }} {{ $t('hPa') }}</b>
      </div>
      <div class="weather__info-item">
        <span>{{ $t('windSpeed') }}</span>
        <b>{{ windSpeed }} {{ $t('ms') }}</b>
      </div>
      <div class="weather__info-item">
        <span>{{ $t('cloudiness') }}</span>
        <b>{{ cloudiness }}%</b>
      </div>
    </div>
    <div v-show="isLoading" class="weather__loading">
      <BaseIcon name="IconLoader" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather {
  position: relative;
  background: $background-weather;
  color: $color-text-weather;
  padding: 15px;
  border-radius: 30px;
  border: 4px solid $border-color-ui;
  user-select: none;

  &__top {
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }

  &__selector-wrapper {
    position: relative;
    width: 170px;
  }

  &__selected-city {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $background-selected-weather;
    cursor: pointer;
    padding: 5px 15px;
    font-size: 16px;
    border-radius: 20px;

    svg {
      stroke: $color-text-weather;
      width: 16px;
      transition: all 0.3s;
    }

    &_active {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  &__temperature {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    width: 50px;
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;

    img {
      width: 120px;
      top: -45px;
      right: -30px;
      position: absolute;
      filter: drop-shadow(-20px 10px 20px rgba(0, 0, 0, 0.4));
    }

    @media screen and (max-width: 460px) {
      img {
        top: -9px;
        right: 10px;
        width: 80px;
      }
    }
  }

  &__selector-list {
    position: absolute;
    width: 100%;
    top: 38px;
    border-radius: 20px;
    background: $background-selector-weather;
    z-index: 3;
    padding: 5px;
    user-select: none;

    @media screen and (max-width: 870px) {
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }
  }

  &__selector-list-item {
    cursor: pointer;
    border-radius: 18px;
    padding: 8px 10px;
    transition: all 0.3s;

    &:hover {
      padding-left: 15px;
    }

    &_active {
      background: $background-selector-active-weather;
      color: $color-text-weather;
    }
  }

  &__info {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    justify-content: space-between;
  }

  &__info-item {
    display: flex;
    flex-direction: column;
    gap: 5px;

    span {
      font-size: 11px;
      opacity: 0.6;
    }

    b {
      font-size: 14px;
    }
  }

  &__loading {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(16px);
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
}
</style>
