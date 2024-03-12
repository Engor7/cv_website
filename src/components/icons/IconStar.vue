<script setup>
const props = defineProps({
  size: Number,
});
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 12 12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="1.5" cy="1.5" r="1.5" />
  </svg>
</template>
