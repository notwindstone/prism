<script setup lang="ts">
import { ref } from "vue";

const { src, alt, classNames } = defineProps<{
  "src"        : string;
  "alt"        : string;
  "classNames"?: string;
}>();
const shown = ref<boolean>(false);
</script>

<template>
  <img
    @load="shown = true"
    loading="lazy"
    :alt="alt"
    :src="src"
    :class="[
      'shrink-0 transition-[opacity] duration-300',
      shown ? 'opacity-100' : 'opacity-0',
      classNames,
    ]"
  />
</template>