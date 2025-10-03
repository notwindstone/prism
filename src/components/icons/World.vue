<script setup lang="ts">
const { active } = defineProps<{
  "active": boolean;
}>();
</script>

<style scoped>
.world-icon {
  will-change: d;
  transition-property: d;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(.25,.75,.25,.75);
}

.active .world-icon {
  d: path("M 480 -80 q -83 0 -156 -31.5 T 197 -197 q -54 -54 -85.5 -127 T 80 -480 q 0 -83 31.5 -156 T 197 -763 q 54 -54 127 -85.5 T 480 -880 q 83 0 156 31.5 T 763 -763 q 54 54 85.5 127 T 880 -480 q 0 83 -31.5 156 T 763 -197 q -54 54 -127 85.5 T 480 -80 Z m 0 -80 q 134 0 227 -93 t 93 -227 q 0 -7 -0.5 -14.5 T 799 -507 q 0 0 0 0 t 0 0 h 0 q 1 -107 -92 -200 T 707 -707 v 0 H 707 v 0 q 0 0 0 0 T 707 -707 h 0 q -61 -61 -144 -82 T 563 -789 q -20 -5 -40.5 -8 t -42.5 -3 q -134 0 -227 93 t -93 227 h 0 q 0 134 93 227 t 227 93 v 0 H 480 v 0 q 0 0 0 0 T 480 -160 Z");
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
      class="world-icon"
      d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-7-.5-14.5T799-507q-5 29-27 48t-52 19h-80q-33 0-56.5-23.5T560-520v-40H400v-80q0-33 23.5-56.5T480-720h40q0-23 12.5-40.5T563-789q-20-5-40.5-8t-42.5-3q-134 0-227 93t-93 227h200q66 0 113 47t47 113v40H400v110q20 5 39.5 7.5T480-160Z"
    />
  </svg>
</template>