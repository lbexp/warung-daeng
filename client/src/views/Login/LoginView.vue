<script setup lang="ts">
import CardComp from '@/components/bases/Card/CardComp.vue'
import LoginFormComp from './components/LoginFormComp.vue'
</script>

<template>
  <div :class="$style.wrapper">
    <CardComp>
      <LoginFormComp />
    </CardComp>
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 24px;
}
</style>
