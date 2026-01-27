<script setup lang="ts">
import CustomFooter from './CustomFooter.vue'
</script>

<template>
  <CustomFooter>
    <div class="d-flex justify-content-around py-2">
      
      <router-link to="/dashboard" class="nav-item active">
        <span class="material-symbols-outlined icon">home</span>
        <span class="label">Home</span>
      </router-link>
      
      <router-link to="/history" class="nav-item">
        <span class="material-symbols-outlined icon">history</span>
        <span class="label">History</span>
      </router-link>
      
      <router-link to="/profile" class="nav-item">
        <span class="material-symbols-outlined icon">person</span>
        <span class="label">Profile</span>
      </router-link>
      
    </div>
  </CustomFooter>
</template>

<style scoped>
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #858796;
  width: 64px;
  transition: color 0.2s;
}

.nav-item.active, .nav-item:hover {
  color: var(--primary);
}

.nav-item.active .icon {
  font-variation-settings: 'FILL' 1; /* Fills the icon */
}

.icon { font-size: 28px; margin-bottom: 2px; }
.label { font-size: 10px; font-weight: 500; }
</style>