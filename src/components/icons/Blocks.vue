<script setup lang="ts">
const { active } = defineProps<{
  "active": boolean;
}>();
</script>

<style scoped>
.blocks-icon {
  will-change: d;
  transition-property: d;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(.25,.75,.25,.75);
}

.active .blocks-icon {
  d: path("M 520 -840 h 320 v 320 H 520 v -320 Z m 80 80 v 160 v -160 Z m -80 320 h 320 v 320 H 520 v -320 Z m 80 80 v 160 v -160 Z M 120 -840 h 320 v 320 H 120 v -320 Z m 80 80 v 160 v -160 Z m 40 520 h 0 v 120 h 80 v -120 H 440 v -80 h -120 v -120 H 240 v 120 h -120 v 80 Z m 360 -200 v 240 h 160 v -160 H 600 Z m 0 80 v -240 h 160 v -160 H 600 Z m -400 -400 v 160 h 160 v -160 H 200 Z");
}
</style>

<template>
  <svg
    :class="[
    'shrink-0 py-1 transition-[fill] duration-200',
    active && 'active',
  ]"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
  >
    <path
      class="blocks-icon"
      d="M120-840h320v320H120v-320Zm80 80v160-160Zm320-80h320v320H520v-320Zm80 80v160-160ZM120-440h320v320H120v-320Zm80 80v160-160Zm440-80h80v120h120v80H720v120h-80v-120H520v-80h120v-120Zm-40-320v160h160v-160H600Zm-400 0v160h160v-160H200Zm0 400v160h160v-160H200Z"
    />
  </svg>
</template>