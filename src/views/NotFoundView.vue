<template>
  <div class="not-found">
    <h2>404</h2>
    <h4>{{ $t('notFound') }}</h4>

    <p>{{ $t('notFoundText') }}</p>
    <img src="@/assets/404.webp" alt="" />
    <ButtonHover to="/" :text="$t('home')" iconName="IconArrowRight" />
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;

  h2 {
    font-size: 80px;
    margin-bottom: 30px;
  }

  h4 {
    font-size: 26px;
    margin-bottom: 20px;
    opacity: 0.8;
  }

  img {
    width: 300px;
    margin: 60px 0;
    border-radius: 60px;
  }

  p {
    max-width: 600px;
    font-size: 14px;
    text-align: center;
    opacity: 0.5;
    padding: 0 30px;
  }

  @media screen and (max-width: 900px) {
    padding-top: 20px;

    h2 {
      font-size: 48px;
      margin-bottom: 20px;
    }

    h4 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    p {
      font-size: 12px;
    }

    img {
      margin: 30px 0;
      border-radius: 40px;
    }
  }
}
</style>
<script setup>
import ButtonHover from '@/components/uiLib/buttonHover.vue';
</script>
