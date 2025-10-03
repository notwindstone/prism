<script setup lang="ts">
const { active } = defineProps<{
  "active": boolean;
}>();
</script>

<style scoped>
.downloading-icon__outer {
  transition-property: transform;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(.25,.75,.25,.75);
  transform-origin: 50% -50%;
}
.downloading-icon__circle {
  opacity: 0;
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(.25,.75,.25,.75);
  transition-delay: 50ms;
}

.active .downloading-icon__outer {
  transform: rotate(180deg);
}
.active .downloading-icon__circle {
  opacity: 1;
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
      d="M 439 -82 Z m 40 -198 L 278 -482 l 57 -57 l 104 104 v -245 h 80 v 245 l 103 -103 l 57 58 l -200 200 Z Z Z l -56 -57 Z Z"
    />
    <path
      class="downloading-icon__outer"
      d="M 439 -82 q -76 -8 -141.5 -42.5 t -113.5 -88 Q 136 -266 108.5 -335 T 81 -481 q 0 -155 102.5 -268.5 T 440 -880 v 80 q -121 17 -200 107.5 T 161 -481 q 0 121 79 211.5 T 439 -162 v 80 Z m 40 -198 Z m 40 198 v -80 q 43 -6 82.5 -23 t 73.5 -43 l 58 58 q -47 37 -101 59.5 T 519 -82 Z m 158 -652 q -35 -26 -74.5 -43 T 520 -800 v -80 q 59 6 113 28.5 T 733 -792 l -56 58 Z m 112 506 l -56 -57 q 26 -34 42 -73.5 t 22 -82.5 h 82 q -8 59 -30 113.5 T 789 -228 Z m 8 -293 q -6 -43 -22 -82.5 T 733 -677 l 56 -57 q 38 45 61 99.5 T 879 -521 h -82 Z"
    />
    <path
      class="downloading-icon__circle"
      d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
    />
  </svg>
</template>