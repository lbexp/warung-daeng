<script setup lang="ts">
import { RouterLink } from 'vue-router'
import useAuthStore from '@/stores/auth'

const { user } = useAuthStore()
</script>

<template>
  <header :class="$style.wrapper">
    <RouterLink to="/">
      <h1>Warung Daeng</h1>
    </RouterLink>

    <nav>
      <RouterLink v-if="!user" to="/login">Login</RouterLink>
    </nav>
  </header>
</template>

<style module>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px;
  margin-bottom: solid 2px;

  border-radius: 0px 0px 8px 8px;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 24px;
  background-color: var(--color-background);

  margin-bottom: 24px;
}
</style>
