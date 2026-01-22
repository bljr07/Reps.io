<template>
  <div class="d-flex justify-content-between gap-3">
    <button type="button" class="btn btn-dark flex-fill social-btn">
      <i class="bi bi-facebook text-white"></i>
    </button>
    <button type="button" class="btn btn-dark flex-fill social-btn">
      <i class="bi bi-google text-white"></i>
    </button>
  </div>
</template>

<style scoped>
.social-btn {
  background: var(--bg-card); 
  border: 1px solid var(--border-color);
  transition: all 0.2s;
}
.social-btn:hover {
  border-color: var(--primary);
}
</style>