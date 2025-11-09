<script setup>
import StockInfo from '@/components/uiLib/stockInfo.vue';
import AudioPlayer from '@/components/uiLib/audioPlayer.vue';
import WeatherForecast from '@/components/uiLib/weatherForecast.vue';
import MenuUi from '@/components/uiLib/menuUi.vue';
import ClockRound from '@/components/uiLib/ClockRound.vue';
import GalleryUsers from '@/components/uiLib/galleryUsers.vue';
import ButtonHover from '@/components/uiLib/buttonHover.vue';
import IconMail from '@/components/icons/IconMail.vue';
import IconTelegram from '@/components/icons/IconTelegram.vue';
import IconCodepen from '@/components/icons/IconCodepen.vue';
import IconGitHub from '@/components/icons/IconGitHub.vue';
</script>

<template>
  <div class="start-block">
    <div class="start-block__hello">
      <h2>{{ $t('hello') }}</h2>
      <p>
        {{ $t('desc') }}
      </p>
    </div>
    <div class="start-block__ui-lib">
      <div class="start-block__ui-lib-left">
        <WeatherForecast />
        <MenuUi />
        <div class="start-block__ui-lib-left-bottom">
          <ClockRound />
          <GalleryUsers />
        </div>
      </div>
      <div class="start-block__ui-lib-right">
        <StockInfo />
        <AudioPlayer />
      </div>
    </div>
    <div class="start-block__ui-lib-link">
      <ButtonHover to="/uilib" text="Ui Library" iconName="IconArrowRight" />
    </div>
    <div class="start-block__info">
      <div class="start-block__info-contacts">
        <a href="https://github.com/Engor7" target="_blank">
          <IconGitHub size="18" />
          <span>GitHub</span>
        </a>
        <a href="https://codepen.io/egor_erygin" target="_blank">
          <IconCodepen size="18" />
          <span>Codepen</span>
        </a>
        <a href="https://t.me/egor_erygin" target="_blank">
          <IconTelegram size="18" />
          <span>Telegram</span>
        </a>
        <a href="mailto:contact@egorjs.ru" target="_blank">
          <IconMail size="18" />
          <span>contact@egorjs.ru</span>
        </a>
      </div>
      <div class="start-block__info-sub">
        <span>{{ $t('portfolio') }}</span>
        <i class="text-line"></i>
        <span>© {{ new Date().getFullYear() }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.start-block {
  display: flex;
  justify-content: space-between;
  padding-top: 200px;
  flex-wrap: wrap;

  &__hello {
    p {
      max-width: 470px;
      opacity: 0.7;

      @media screen and (max-width: 1230px) {
        max-width: 370px;
      }
    }
  }

  &__ui-lib {
    display: flex;
    justify-content: space-between;
    gap: 40px;

    @media screen and (max-width: 1330px) {
      display: none;
    }
  }

  &__ui-lib-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
  }

  &__ui-lib-right {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 60px;
  }

  &__ui-lib-left-bottom {
    display: flex;
    gap: 60px;
    align-items: end;
  }

  &__ui-lib-link {
    flex-basis: 100%;
    display: flex;
    justify-content: end;
    margin-top: 60px;

    @media screen and (max-width: 1330px) {
      display: flex;
      justify-content: start;
      margin-top: 40px;
    }
  }

  &__info {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 200px;

    a {
      color: $color-text;
    }

    @media screen and (max-width: 1330px) {
      padding-top: 120px;
    }
  }

  &__info-contacts {
    display: flex;
    flex-direction: column;
    gap: 10px;

    a {
      display: flex;
      align-items: center;
      gap: 4px;

      span {
      }
    }
  }

  &__info-sub {
    display: flex;
    align-items: center;
    gap: 10px;

    @media screen and (max-width: 600px) {
      gap: 5px;
    }
  }

  @media screen and (max-width: 1330px) {
    padding-top: 120px;
  }
}

.text-line {
  display: inline-block;
  width: 42px;
  height: 1px;
  background: $color-text;

  @media screen and (max-width: 600px) {
    width: 30px;
  }

  @media screen and (max-width: 500px) {
    width: 20px;
  }
}
</style>
