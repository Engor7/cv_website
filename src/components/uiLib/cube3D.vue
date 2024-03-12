<script setup>
import { ref, onMounted } from 'vue';

const cubeRef = ref(null);

onMounted(() => {
  const animate = () => {
    cubeRef.value.style.transform += 'rotateX(1deg) rotateY(1deg)';
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
});
</script>

<template>
  <div class="scene">
    <div class="cube" ref="cubeRef">
      <div class="cube__face cube__face--front">front</div>
      <div class="cube__face cube__face--back">back</div>
      <div class="cube__face cube__face--right">right</div>
      <div class="cube__face cube__face--left">left</div>
      <div class="cube__face cube__face--top">top</div>
      <div class="cube__face cube__face--bottom">bottom</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scene {
  width: 400px;
  height: 400px;
  perspective: 600px;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-100px);
}

.cube__face {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  line-height: 200px;
  text-align: center;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0.8);
}

.cube__face--front {
  transform: rotateY(0deg) translateZ(100px);
}

.cube__face--back {
  transform: rotateY(180deg) translateZ(100px);
}

.cube__face--right {
  transform: rotateY(90deg) translateZ(100px);
}

.cube__face--left {
  transform: rotateY(-90deg) translateZ(100px);
}

.cube__face--top {
  transform: rotateX(90deg) translateZ(100px);
}

.cube__face--bottom {
  transform: rotateX(-90deg) translateZ(100px);
}
</style>
