<script setup lang="ts">
import ButtonComp from '@/components/bases/Button/ButtonComp.vue'
import InputComp from '@/components/bases/Input/InputComp.vue'
</script>

<template>
  <div :class="$style.wrapper">
    <InputComp />
    <InputComp />
    <ButtonComp />
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
