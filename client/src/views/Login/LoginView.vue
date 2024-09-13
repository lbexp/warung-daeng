<script setup lang="ts">
import { ref } from 'vue'

import CardComp from '@/components/bases/Card/CardComp.vue'
import LoginFormComp from './components/LoginFormComp.vue'
import RegisterFormComp from './components/RegisterFormComp.vue'

const isRegister = ref(false)
</script>

<template>
  <div :class="$style.wrapper">
    <CardComp>
      <RegisterFormComp v-if="isRegister.valueOf()" />
      <LoginFormComp v-else @register="isRegister = !isRegister.valueOf()" />
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
