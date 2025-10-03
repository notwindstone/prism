<script setup lang="ts">
import { onBeforeRouteLeave, onAfterRouteLeave } from "@kitbag/router";
import { onMounted, ref } from "vue";

const loading = ref<boolean>(false);

onMounted(() => {
  onBeforeRouteLeave(() => {
    loading.value = true;
  });
  onAfterRouteLeave(() => {
    loading.value = false;
  });
});
</script>

<template>
  <div class="fixed left-0 right-0 top-0 z-50000 h-1 overflow-x-clip">
    <!-- Opacity will be overwritten by the animation -->
    <div :class="['absolute h-1 w-full bg-white opacity-0', loading && 'animate-progress-bar']" />
  </div>
</template>