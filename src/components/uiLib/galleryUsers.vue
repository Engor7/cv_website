<script setup>
import { ref } from 'vue';
import BaseIcon from '@/components/bases/BaseIcon.vue';

const users = ref([
  { id: 1, name: '@neo', img: 'IMG_5010.jpg' },
  { id: 2, name: '@siya', img: 'IMG_4973.jpg' },
  { id: 3, name: '@ialy', img: 'IMG_5021.jpg' },
  { id: 4, name: '@tyoni', img: 'IMG_5020.jpg' },
  { id: 5, name: '@bian', img: 'IMG_4974.jpg' },
  { id: 6, name: '@sayli', img: 'IMG_5022.jpg' },
]);
const activeUserId = ref(1);

const nextUser = () => {
  const currentIndex = users.value.findIndex(
    user => user.id === activeUserId.value,
  );
  const nextIndex = (currentIndex + 1) % users.value.length;
  activeUserId.value = users.value[nextIndex].id;
};

const prevUser = () => {
  const currentIndex = users.value.findIndex(
    user => user.id === activeUserId.value,
  );
  const prevIndex =
    (currentIndex - 1 + users.value.length) % users.value.length;
  activeUserId.value = users.value[prevIndex].id;
};
</script>

<template>
  <div class="gallery-user">
    <div
      v-for="user in users"
      :key="user.id"
      class="gallery-user__user"
      :class="{ 'gallery-user__user_active': user.id === activeUserId }"
    >
      <img :src="`/src/assets/avatars_users/${user.img}`" :alt="user.id" />
      <div class="gallery-user__user-data">
        <span>{{ user.name }}</span>
        <div class="gallery-user__buttons">
          <div
            class="gallery-user__button gallery-user__button-prev"
            @click="prevUser"
          >
            <BaseIcon name="IconArrowLeft" />
          </div>
          <div
            class="gallery-user__button gallery-user__button-next"
            @click="nextUser"
          >
            <BaseIcon name="IconArrowRight" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery-user {
  position: relative;
  width: 180px;
  height: 180px;
  border: 3px solid $border-color-ui;
  border-radius: 30px;
  overflow: hidden;

  &__user {
    display: none;
    position: relative;

    img {
      width: 100%;
    }

    &_active {
      display: block;

      img {
        transform: scale(1.2) rotate(10deg);
        filter: blur(10px);
        animation: animate-gallery 0.2s linear forwards;

        @keyframes animate-gallery {
          0% {
            transform: scale(1.2) rotate(10deg);
            filter: blur(10px);
          }
          100% {
            transform: scale(1) rotate(0deg);
            filter: blur(0);
          }
        }
      }
    }
  }

  &__user-data {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: space-between;
    bottom: 13px;
    left: 10px;
    right: 10px;
    z-index: 2;
    color: #fff;
    background: rgba(0, 0, 0, 0.36);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    padding: 3px;
    border-radius: 20px;
    border: 0.5px solid rgba(255, 255, 255, 0.16);
    user-select: none;

    span {
      margin-left: 8px;
      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 12px;
    }
  }

  &__buttons {
    display: flex;
    gap: 4px;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 23px;
    height: 23px;
    border: 1px solid #eeeeee38;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s;

    svg {
      stroke: #fff;
      width: 10px;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
