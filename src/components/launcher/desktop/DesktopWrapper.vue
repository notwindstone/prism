<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import DesktopLoading from "@/components/launcher/desktop/DesktopLoading.vue";

const DesktopAsyncContent = defineAsyncComponent({
  "loader"          : () => import("./DesktopAsyncContent.vue"),
  "loadingComponent": DesktopLoading,
});
const { open } = defineProps<{
  "open": () => void;
}>();
</script>

<template>
  <div
    @touchstart.stop
    @touchmove.stop
    @touchend.stop
    class="absolute h-full w-full overflow-hidden rounded-lg bg-black bg-cover bg-center text-white -z-10"
  >
    <Transition name="fade">
      <DesktopAsyncContent :open="open" />
    </Transition>
  </div>
</template>