<script setup lang="ts">
const { shown, toggle, classNames } = defineProps<{
  "shown"      : boolean;
  "toggle"     : () => void;
  "classNames"?: string;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        @click="toggle"
        v-show="shown"
        class="fixed bottom-0 left-0 right-0 top-0 z-500 bg-[theme(colors.black/.7)]"
      />
    </Transition>
    <Transition name="slide-fade">
      <div
        v-show="shown"
        :class="[
          'fixed z-600 rounded-3xl bg-catppuccin-900',
          classNames,
        ]"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>