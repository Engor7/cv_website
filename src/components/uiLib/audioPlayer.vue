<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { formatTime } from '@/common/utils.js';
import BaseIcon from '@/components/bases/BaseIcon.vue';
import IconMute from '@/components/icons/IconMute.vue';
import IconVolume from '@/components/icons/IconVolume.vue';
import IconLowVolume from '@/components/icons/IconLowVolume.vue';

import sound1 from '@/assets/music/The_Gimp_Royales_Son_of_a_Preacher_Man.mp3';
import sound2 from '@/assets/music/Coyle_Girelli_Isabella_Dances.mp3';
import sound3 from '@/assets/music/David_Rawlings_Cumberland_Gap.mp3';
import sound4 from '@/assets/music/Destromaker_Miracle.mp3';

const tracks = ref([
  {
    name: 'The Gimp Royales Son of a Preacher Man',
    url: sound1,
  },
  {
    name: 'Coyle Girelli Isabella Dances',
    url: sound2,
  },
  {
    name: 'David Rawlings Cumberland Gap',
    url: sound3,
  },
  {
    name: 'Destromaker Miracle',
    url: sound4,
  },
]);

const currentTrackIndex = ref(0);
const audioRef = ref(null);
const progressContainer = ref(null);
const volumeContainer = ref(null);
const isPlaying = ref(false);
const isDragging = ref(false);
const isDraggingVolume = ref(false);

const currentTime = ref(0);
const duration = ref(0);
const progress = ref(0);
const volume = ref(0.5);
const lastVolume = ref(0.5);

const updateProgress = () => {
  if (isDragging.value) return;
  progress.value = (currentTime.value / duration.value) * 100;
};

const togglePlay = () => {
  if (!audioRef.value) return;
  isPlaying.value ? audioRef.value.pause() : audioRef.value.play();
  isPlaying.value = !isPlaying.value;
};

const playAudio = async () => {
  try {
    await audioRef.value.pause();
    audioRef.value.load();
    await audioRef.value.play();
  } catch (err) {
    console.error(err);
  }
};

const playNext = () => {
  currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.value.length;
};

const playPrev = () => {
  if (currentTrackIndex.value === 0) {
    currentTrackIndex.value = tracks.value.length - 1;
  } else {
    currentTrackIndex.value -= 1;
  }
};

const seek = event => {
  const bounds = progressContainer.value.getBoundingClientRect();
  const clickX = event.clientX - bounds.left;
  const width = bounds.width;
  const clickedFraction = clickX / width;
  const newTime = clickedFraction * audioRef.value.duration;
  audioRef.value.currentTime = newTime;
  progress.value = clickedFraction * 100;
};

const startDrag = event => {
  event.preventDefault();
  isDragging.value = true;

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', endDrag);
};

const endDrag = () => {
  if (!isDragging.value) return;
  isDragging.value = false;

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', endDrag);

  const newTime = (progress.value / 100) * audioRef.value.duration;
  audioRef.value.currentTime = newTime;
};

const onDrag = event => {
  if (!isDragging.value || !progressContainer.value) return;

  const bounds = progressContainer.value.getBoundingClientRect();
  const dragX = event.clientX - bounds.left;
  const width = bounds.width;
  let newProgress = (dragX / width) * 100;

  newProgress = Math.max(0, Math.min(newProgress, 100));
  progress.value = newProgress;
};

// sound volume

const updateVolume = newVolume => {
  const clampedVolume = Math.max(0, Math.min(newVolume, 1));
  volume.value = clampedVolume;
  if (audioRef.value) {
    audioRef.value.volume = clampedVolume;
  }
};

const onVolumeBarClick = event => {
  const bounds = event.currentTarget.getBoundingClientRect();
  const clickX = event.clientX - bounds.left;
  const width = bounds.width;
  const newVolume = clickX / width;
  updateVolume(newVolume);
};

const startVolumeDrag = event => {
  event.preventDefault();
  isDraggingVolume.value = true;

  document.addEventListener('mousemove', onVolumeDrag);
  document.addEventListener('mouseup', stopVolumeDrag);
};

const onVolumeDrag = event => {
  if (!isDraggingVolume.value || !volumeContainer.value) return;

  const bounds = volumeContainer.value.getBoundingClientRect();
  const volumePosition = Math.max(
    0,
    Math.min(event.clientX - bounds.left, bounds.width),
  );
  const newVolume = volumePosition / bounds.width;

  volume.value = newVolume;
  audioRef.value.volume = newVolume;
};

const stopVolumeDrag = () => {
  isDraggingVolume.value = false;
  document.removeEventListener('mousemove', onVolumeDrag);
  document.removeEventListener('mouseup', stopVolumeDrag);
};

const toggleVolume = () => {
  if (audioRef.value.volume > 0) {
    lastVolume.value = audioRef.value.volume;
    audioRef.value.volume = 0;
    volume.value = 0;
  } else {
    audioRef.value.volume = lastVolume.value;
    volume.value = lastVolume.value;
  }
};

// end sound volume

watch(currentTime, updateProgress);
watch(duration, updateProgress);

watch(currentTrackIndex, newIndex => {
  if (audioRef.value) {
    audioRef.value.src = tracks.value[newIndex].url;

    if (isPlaying.value) playAudio();
  }
});

const onEnded = () => playNext();

const onTimeUpdate = () => {
  currentTime.value = audioRef.value.currentTime;
};

const onLoadedMetadata = () => {
  duration.value = audioRef.value.duration;
};

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.addEventListener('ended', onEnded);
    audioRef.value.addEventListener('timeupdate', onTimeUpdate);
    audioRef.value.addEventListener('loadedmetadata', onLoadedMetadata);

    audioRef.value.volume = volume.value;
  }
});

onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.removeEventListener('ended', onEnded);
    audioRef.value.removeEventListener('timeupdate', onTimeUpdate);
    audioRef.value.removeEventListener('loadedmetadata', onLoadedMetadata);
  }
});
</script>

<template>
  <div class="audio-player">
    <audio ref="audioRef" :src="tracks[currentTrackIndex].url"></audio>
    <div class="audio-player__title-and-progress">
      <div class="audio-player__title">
        {{ tracks[currentTrackIndex].name }}
      </div>
      <div class="audio-player__progress" @click="seek" ref="progressContainer">
        <div
          class="audio-player__progress-volume"
          :style="{ width: `${progress}%` }"
        ></div>
        <div
          class="audio-player__progress-slider"
          :style="{ left: `${progress}%` }"
          @mousedown="startDrag"
        ></div>
      </div>
    </div>
    <div
      class="audio-player__animate"
      :class="{ 'audio-player__animate_stop': !isPlaying }"
    >
      <span></span><span></span><span></span><span></span>
    </div>
    <div class="audio-player__tools">
      <div class="audio-player__buttons">
        <div @click="playPrev" class="audio-player__button">
          <BaseIcon name="IconPrev" />
        </div>
        <div @click="togglePlay" class="audio-player__button">
          <BaseIcon
            :key="isPlaying"
            :name="isPlaying ? 'IconPause' : 'IconPlay'"
          />
        </div>
        <div @click="playNext" class="audio-player__button">
          <BaseIcon name="IconNext" />
        </div>
      </div>
      <div class="audio-player__time">
        {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
      </div>
      <div class="audio-player__sound-volume-wrapper">
        <div class="audio-player__sound-volume-icon" @click="toggleVolume">
          <IconVolume v-if="volume >= 0.5" :size="20" />
          <IconLowVolume v-else-if="volume > 0" :size="20" />
          <IconMute v-else :size="20" />
        </div>
        <div
          class="audio-player__sound-volume"
          ref="volumeContainer"
          @click="onVolumeBarClick"
        >
          <div
            class="audio-player__sound-volume-progress"
            :style="{ width: `${volume * 100}%` }"
          ></div>
          <div
            class="audio-player__sound-volume-slider"
            :style="{ left: `${volume * 100}%` }"
            @mousedown="startVolumeDrag"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.audio-player {
  display: grid;
  grid-template-columns: 240px 45px;
  grid-template-rows: repeat(2, auto);
  background: $background-audio-player;
  color: $color-text-audio-player;
  padding: 18px 25px;
  border-radius: 30px;
  user-select: none;
  font-size: 13px;
  gap: 5px;
  row-gap: 10px;
  border: 4px solid $border-color-ui;

  &__title-and-progress {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__animate {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 5px;

    span {
      display: inline-block;
      width: 3px;
      background-color: $color-text-audio-player;
      border-radius: 5px;
      animation-name: animate-equalizer;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-duration: 1.2s;

      &:nth-child(1) {
        height: 13px;
        animation-delay: 0.3s;
      }

      &:nth-child(2) {
        height: 30px;
        animation-delay: 0.8s;
      }

      &:nth-child(3) {
        height: 25px;
        animation-delay: 0.6s;
      }

      &:nth-child(4) {
        height: 8px;
        animation-delay: 0s;
      }

      @keyframes animate-equalizer {
        0% {
          height: 8px;
        }

        50% {
          height: 30px;
        }

        100% {
          height: 8px;
        }
      }
    }

    &_stop {
      span {
        animation-play-state: paused;
      }
    }
  }

  &__progress {
    position: relative;
    padding: 10px 0;
    border-radius: 5px;
    cursor: pointer;

    &:after {
      content: '';
      width: 100%;
      height: 4px;
      top: 50%;
      margin-top: -2px;
      background-color: $color-text-audio-player;
      opacity: 0.3;
      position: absolute;
      z-index: 1;
      border-radius: 5px;
    }
  }

  &__progress-volume {
    position: relative;
    height: 4px;
    background: $color-text-audio-player;
    left: 0;
    border-radius: 5px;
    z-index: 2;
  }

  &__progress-slider {
    position: absolute;
    width: 12px;
    height: 12px;
    background: $color-text-audio-player;
    outline: 1px solid $background-audio-player;
    border-radius: 50px;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  &__tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-column: span 2;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__button {
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
      fill: $color-text-audio-player;
    }

    &:last-child,
    &:first-child {
      svg {
        opacity: 0.8;
        transform: scale(0.8);
      }
    }
  }

  &__time {
    opacity: 0.6;
  }

  &__sound-volume-wrapper {
    display: flex;
    width: 90px;
    align-items: center;
    gap: 10px;
  }

  &__sound-volume-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: start;
    width: 20px;
    height: 20px;

    svg {
      fill: $color-text-audio-player;
      width: 20px;
      height: 20px;
    }
  }

  &__sound-volume {
    position: relative;
    width: 100%;
    padding: 10px 0;
    border-radius: 5px;
    cursor: pointer;

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 4px;
      background-color: $color-text-audio-player;
      opacity: 0.3;
      position: relative;
      z-index: 1;
      border-radius: 5px;
    }
  }

  &__sound-volume-progress {
    position: absolute;
    height: 4px;
    background: $color-text-audio-player;
    left: 0;
    border-radius: 5px;
  }

  &__sound-volume-slider {
    position: absolute;
    width: 10px;
    height: 10px;
    z-index: 2;
    background: $color-text-audio-player;
    outline: 1px solid $background-audio-player;
    border-radius: 50px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
