<script setup lang="ts">
import { RouterLink } from 'vue-router'

import useProductList from '@/usecases/useProductList'

import ProductListComp from './components/ProductListComp.vue'
import InputComp from '@/components/bases/Input/InputComp.vue'
import TypographyComp from '@/components/bases/Typography/TypographyComp.vue'

const { loading, search, page, products, onNextPage, onPrevPage } = useProductList()
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.menu">
      <InputComp v-model:value="search" label-value="Cari produk" />
      <RouterLink to="/products/create"><TypographyComp>Tambah Produk</TypographyComp></RouterLink>
    </div>

    <p v-if="loading">Loading</p>
    <ProductListComp v-else :products="products" />

    <div :class="$style.pagination">
      <!-- eslint-disable-next-line vue/no-parsing-error -->
      <div v-if="page > 1" role="button" tabIndex="0" @click="onPrevPage()"><</div>
      <TypographyComp>{{ page }}</TypographyComp>
      <div role="button" tabIndex="0" @click="onNextPage()">></div>
    </div>
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

.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
</style>
