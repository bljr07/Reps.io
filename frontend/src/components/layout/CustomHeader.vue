
<template>
  <header class="sticky-top glass-header">
    <div class="container d-flex align-items-center justify-content-between p-4">
        <div>
          <slot name="title"></slot>
        </div>
    
        <div>
          <slot name="actions"></slot>
        </div>
    </div>
  </header>
</template>

<style scoped>
.glass-header {
  background: rgba(16, 28, 34, 0.95);
  backdrop-filter: blur(10px);
  z-index: 20;
}
</style>