<script setup lang="ts">
defineProps({
  labelValue: String
})

const value = defineModel('value')
</script>

<template>
  <label v-if="Boolean(labelValue)">{{ labelValue }}</label>

  <input v-model="value" />
</template>

<style></style>
