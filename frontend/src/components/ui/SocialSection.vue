<script setup lang="ts">
import CustomBtn from './CustomBtn.vue';

// Edit here
const platforms = [
  { name: 'facebook', link: '' },
  { name: 'google', link: 'https://google.com' },
]
</script>

<template>
  <div>
    <div class="text-center mt-4 mb-3 position-relative">
      <hr>
      <span class="text-info small">
        OR CONTINUE WITH
      </span>
    </div>
    <div class="row justify-content-between gap-3">
      <CustomBtn
        v-for="platform, index in platforms" 
        :key="index" 
        extra-classes="col" 
        element="a"
        :href="platform.link" 
        variant="secondary"
        :block="false"
        >
          <i :class="'bi bi-' + platform.name + ' text-white'"></i>
      </CustomBtn>
    </div>
  </div>
</template>