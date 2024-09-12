<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="wrapper">
    <RouterLink to="/">
      <h1>Warung Daeng</h1>
    </RouterLink>

    <nav>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: solid 2px;
}
</style>
