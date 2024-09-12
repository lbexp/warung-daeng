<script setup lang="ts"></script>

<template>
  <div :class="$style.wrapper">
    <slot />
  </div>
</template>

<style module>
.wrapper {
  padding: 24px;

  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: var(--color-background);
}
</style>
