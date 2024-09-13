<script setup lang="ts">
defineProps({
  labelValue: String
})

const value = defineModel('value')
</script>

<template>
  <div :class="$style.wrapper">
    <label v-if="Boolean(labelValue)">{{ labelValue }}</label>
    <input v-model="value" />
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
