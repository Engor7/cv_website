<script setup>
import StockInfo from '@/components/uiLib/stockInfo.vue';
import AudioPlayer from '@/components/uiLib/audioPlayer.vue';
import WeatherForecast from '@/components/uiLib/weatherForecast.vue';
import GalleryUsers from '@/components/uiLib/galleryUsers.vue';
import ClockRound from '@/components/uiLib/ClockRound.vue';
import MenuUi from '@/components/uiLib/menuUi.vue';
import TooltipUi from '@/components/uiLib/tooltipUi.vue';
import ButtonHover from '@/components/uiLib/buttonHover.vue';
</script>

<template>
  <div class="container-ui">
    <div class="container-ui__item">
      <StockInfo />
    </div>
    <div class="container-ui__item">
      <WeatherForecast />
    </div>
    <div class="container-ui__item">
      <AudioPlayer />
    </div>
    <div class="container-ui__item">
      <GalleryUsers />
    </div>
    <div class="container-ui__item">
      <ClockRound />
    </div>
    <div class="container-ui__item">
      <MenuUi />
    </div>
    <div class="container-ui__item">
      <TooltipUi />
    </div>
    <div class="container-ui__item">
      <ButtonHover to="/" :text="$t('home')" iconName="IconArrowRight" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container-ui {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: $color-border-ui;
  border: 1px solid $color-border-ui;
  gap: 1px;
  margin: 120px 0;
  border-radius: 30px;
  overflow: hidden;

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    background: $background;
  }

  @media screen and (max-width: 1720px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 1360px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 1240px) {
    margin: 60px 0;
  }

  @media screen and (max-width: 870px) {
    grid-template-columns: repeat(1, 1fr);
    border: none;
    background: none;

    &__item {
      padding: 35px 0;
    }
  }
}
</style>
