<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'

import HeaderComp from '@/components/composites/Header/HeaderComp.vue'

import useAuthStore from './stores/auth'

const auth = useAuthStore()

onBeforeMount(() => {
  auth.onInitAuth()
})
</script>

<template>
  <HeaderComp />
  <RouterView />
</template>

<style scoped></style>
