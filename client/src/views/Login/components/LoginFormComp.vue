<script setup lang="ts">
import ButtonComp from '@/components/bases/Button/ButtonComp.vue'
import InputComp from '@/components/bases/Input/InputComp.vue'
import TypographyComp from '@/components/bases/Typography/TypographyComp.vue'

import useLoginForm from '@/usecases/useLoginForm'

defineEmits({
  register: Function
})

const { loading, email, password, onSignIn } = useLoginForm()
</script>

<template>
  <div :class="$style.wrapper">
    <TypographyComp>Sign In</TypographyComp>

    <div :class="$style['group-wrapper']">
      <InputComp v-model:value="email" label-value="Email" />
      <InputComp v-model:value="password" label-value="Password" />
    </div>

    <div :class="$style['group-wrapper']">
      <ButtonComp @click="onSignIn()">{{ loading.valueOf() ? 'Loading' : 'Login' }}</ButtonComp>
      <ButtonComp @click="$emit('register')">Register</ButtonComp>
    </div>
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.group-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
