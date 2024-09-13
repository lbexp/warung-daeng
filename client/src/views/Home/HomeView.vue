<script setup lang="ts">
import useProductList from '@/usecases/useProductList'
import ProductListComp from './components/ProductListComp.vue'
import InputComp from '@/components/bases/Input/InputComp.vue'

const { loading, search, products } = useProductList()
</script>

<template>
  <div :class="$style.wrapper">
    <InputComp v-model:value="search" label-value="Cari produk" />

    <p v-if="loading">Loading</p>
    <ProductListComp v-else :products="products" />
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 0px 16px;
}
</style>
