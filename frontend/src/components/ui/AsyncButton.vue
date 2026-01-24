<script setup lang="ts">
import CustomBtn from './CustomBtn.vue';

withDefaults(defineProps<{
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  block?: boolean
}>(), {
  loading: false,
  type: 'button',
  variant: 'primary',
  block: true
})
</script>

<template>
  <custom-btn
    element="button"
    :loading="loading"
    :type="type"
    :variant="variant"
    :block="block"
  >
    <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <slot></slot>
  </custom-btn>
</template>