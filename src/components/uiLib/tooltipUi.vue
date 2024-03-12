<script setup></script>

<template>
  <div class="tooltip" data-tooltips="Там лес и дол видений полны">Tooltip</div>
</template>

<style scoped lang="scss">
.tooltip {
  background: $background-tooltip;
  color: $color-text-tooltip;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  position: relative;
  font-size: 13px;

  &:before,
  &:after {
    display: none;
    position: absolute;
    background: $background-tooltip;
  }

  &:before {
    content: attr(data-tooltips);
    color: $color-text-tooltip;
    white-space: nowrap;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 20px;
  }

  &:after {
    content: '';
    height: 20px;
    width: 20px;
    top: -26px;
    left: calc(50% - 10px);
    clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
    transform: rotate(-45deg);
    border-radius: 0 0 0 4px;
  }

  &:hover {
    &:before,
    &:after {
      display: block;
    }
  }
}
</style>
