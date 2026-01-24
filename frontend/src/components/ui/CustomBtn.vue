<script setup lang="ts">


withDefaults(defineProps<{
  // Which element to create
  element?: 'button' | 'a' | 'router-link'
  // For button
  type?: 'button' | 'submit' | 'reset'
  // For async button
  loading?: boolean
  // For anchor tag and router link
  href?: string
  // Styling options
  variant?: 'primary' | 'secondary' | 'info' | 'danger'
  block?: boolean
  extraClasses?: string
}>(), {
  element: 'button',
  loading: false,
  type: 'button',
  variant: 'primary',
  block: true,
  extraClasses: '',
})

</script>

<template>
  <!-- Button -->
  <button
    v-if="element == 'button'"
    :type="type"
    class="btn py-2 fw-medium hover-expand d-flex align-items-center justify-content-center gap-2"
    :class="[
      `btn-${variant}`,
      { 'w-100': block, 'opacity-75': loading },
      extraClasses
    ]"
    :disabled="loading"
    style="border: none;"
  >
    <slot></slot>
  </button>

  <!-- Anchor Tags -->
  <a 
    v-if="element == 'a' && href" 
    type="button" 
    class="btn hover-expand text-center" 
    :class="[
      `bg-${variant}`,
      { 'w-100': block },
      extraClasses
    ]"
    :href="href" 
    target="_blank" 
    rel="noopener noreferrer">
      <slot></slot>
  </a>

  <a 
    v-else-if="element == 'a' && !href" 
    type="button" 
    class="btn hover-expand text-center"
    :class="[
      `bg-${variant}`,
      { 'w-100': block },
      extraClasses
    ]"
    >
      <slot></slot>
  </a>

  <!-- Router Links -->
  <router-link
    v-else-if="element == 'router-link' && href"
    :to="href" 
    class="btn hover-expand text-center"
    :class="[
      `bg-${variant}`,
      { 'w-100': block },
      extraClasses
    ]"
    >
      <slot></slot>
  </router-link>
</template>