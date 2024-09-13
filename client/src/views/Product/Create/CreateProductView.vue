<script setup lang="ts">
import useAddProduct from '@/usecases/useAddProduct'

import CardComp from '@/components/bases/Card/CardComp.vue'
import InputComp from '@/components/bases/Input/InputComp.vue'
import ButtonComp from '@/components/bases/Button/ButtonComp.vue'

const { loading, input, onAddProduct } = useAddProduct()
</script>

<template>
  <div :class="$style.wrapper">
    <CardComp>
      <div :class="$style['form-wrapper']">
        <TypographyComp>Tambah Produk</TypographyComp>

        <div :class="$style['input-wrapper']">
          <InputComp v-model:value="input.name.value" label-value="Nama" />
          <InputComp v-model:value="input.description.value" label-value="Deskripsi" />
          <InputComp v-model:value="input.categoryName.value" label-value="Kategori" />
          <InputComp v-model:value="input.sku.value" label-value="SKU" />
          <InputComp v-model:value="input.weight.value" label-value="Berat" />
          <InputComp v-model:value="input.width.value" label-value="Lebar" />
          <InputComp v-model:value="input.length.value" label-value="Panjang" />
          <InputComp v-model:value="input.height.value" label-value="Tinggi" />
          <InputComp v-model:value="input.price.value" label-value="Harga" />
          <InputComp v-model:value="input.image.value" label-value="Link Gambar" />
        </div>

        <ButtonComp @click="onAddProduct()">{{
          loading.valueOf() ? 'Loading' : 'Register'
        }}</ButtonComp>
      </div>
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

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
