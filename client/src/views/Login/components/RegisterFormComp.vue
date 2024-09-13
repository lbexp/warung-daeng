<script setup lang="ts">
import ButtonComp from '@/components/bases/Button/ButtonComp.vue'
import InputComp from '@/components/bases/Input/InputComp.vue'
import TypographyComp from '@/components/bases/Typography/TypographyComp.vue'

import useRegisterForm from '@/usecases/useRegisterForm'

const { loading, name, email, password, onSignUp } = useRegisterForm()
</script>

<template>
  <div :class="$style.wrapper">
    <TypographyComp>Sign Up</TypographyComp>

    <div :class="$style['input-wrapper']">
      <InputComp v-model:value="name" label-value="Name" />
      <InputComp v-model:value="email" label-value="Email" />
      <InputComp v-model:value="password" label-value="Password" />
    </div>

    <ButtonComp @click="onSignUp()">{{ loading.valueOf() ? 'Loading' : 'Register' }}</ButtonComp>
  </div>
</template>

<style module>
.wrapper {
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
