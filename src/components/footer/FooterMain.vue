<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <footer>
    <div class="footer">
      <h3>{{ $t('contacts') }}</h3>
      <div class="footer__wrapper">
        <div class="footer__connection">
          <a href="https://t.me/egor_erygin">Telegram</a>
          <a href="mailto:contact@egorjs.ru">contact@egorjs.ru</a>
        </div>
        <div class="footer__copy">
          <span>egorjs.ru</span>
          <span>©</span>
          <span>{{ currentYear }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 120px 30px 60px 30px;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-top: 30px;
  }

  &__connection {
    display: flex;
    flex-direction: column;
    gap: 13px;

    a {
      font-size: 23px;
      color: $color-text;
      transition: all 0.3s;

      &:hover {
        color: $accent;
      }
    }
  }

  &__copy {
    display: flex;
    gap: 7px;
    align-items: center;
    opacity: 0.48;
  }

  @media screen and (max-width: 1660px) {
    padding-top: 60px;
  }

  @media screen and (max-width: 1240px) {
    padding-left: 0;
    padding-right: 0;
  }

  @media screen and (max-width: 1100px) {
    padding-bottom: 0;
  }

  @media screen and (max-width: 800px) {
    &__wrapper {
      margin-top: 15px;
    }

    &__connection {
      a {
        font-size: 16px;
      }
    }
  }
}
</style>

