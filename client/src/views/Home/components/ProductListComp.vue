<script setup lang="ts">
import CardComp from '@/components/bases/Card/CardComp.vue'
import type { Product } from '@/entities/Product'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div :class="$style.wrapper">
    <CardComp v-for="item in products" :key="item.id">{{ item }}</CardComp>
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
