<script setup lang="ts">
withDefaults(defineProps<{
  noPadding?: boolean
}>(), {
  noPadding: false
})
</script>

<template>
  <div class="card-custom" :class="{ 'p-3': !noPadding }">
    <slot></slot>
  </div>
</template>