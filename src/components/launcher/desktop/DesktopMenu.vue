<script setup lang="ts">
import Image from "@/components/base/Image.vue";
import { onClickOutside } from "@vueuse/core";
import { useTemplateRef } from "vue";

const { open, closeMenu } = defineProps<{
  "open"     : () => void;
  "closeMenu": () => void;
}>();
const target = useTemplateRef<HTMLElement>("target");

onClickOutside(target, event => {
  // Don't close the menu if user click on the KDE menu button
  if (event.target !== null && "id" in event.target && event.target.id === "__kde-menu-opener") {
    return;
  }

  closeMenu();
});
</script>

<template>
  <div
    ref="target"
    class="absolute bottom-18 left-2 flex flex-col gap-0 overflow-hidden rounded-md bg-[#eff0f1] text-black"
  >
    <div class="flex flex-nowrap items-center gap-2 border-b-2 border-[#d4d6d7] bg-[#e3e5e7] p-2">
      <!-- '@contextmenu.stop' returns default context menu -->
      <Image
        @contextmenu.stop
        class-names="w-8 h-8 rounded-full border-2 box-content animated-accent-border !transition-[border-color,opacity] !duration-[2000ms,300ms] !ease-[linear,in-out]"
        src="/assets/ame-chan.webp"
        alt="Ame-Chan from Needy Streamer Overload"
      />
      <p class="">
        Ame-chan
      </p>
    </div>
    <div class="flex flex-nowrap gap-0 border-b-2 border-[#d4d6d7]">
      <div class="flex flex-col border-r-2 border-[#d4d6d7] p-2">
        <div class="animated-accent-border relative flex flex-nowrap items-center gap-2 border rounded-md p-2 transition-[border-color] duration-2000 ease-linear sm:min-w-36">
          <div class="animated-accent-background absolute bottom-0 left-0 right-0 top-0 opacity-40 transition-[background-color] duration-2000 ease-linear" />
          <div class="i-lucide-bookmark relative z-10 h-4 w-4" />
          <p class="relative z-10 text-sm">
            Favorites
          </p>
        </div>
      </div>
      <div class="flex p-2 sm:min-w-56">
        <button
          aria-label="Open Freesm Launcher"
          @click="open"
          class="group relative h-24 w-24 flex flex-col items-center justify-center gap-2"
        >
          <span class="animated-accent-border invisible absolute bottom-0 left-0 right-0 top-0 block border rounded-md transition-[border-color] duration-2000 ease-linear group-hover:visible" />
          <span class="animated-accent-background invisible absolute bottom-0 left-0 right-0 top-0 block border border-transparent rounded-md opacity-40 transition-[background-color] duration-2000 ease-linear group-hover:visible" />
          <Image
            class-names="relative z-10 h-12 w-12"
            src="/favicon.webp"
            alt="Freesm Launcher logo"
          />
          <span class="relative z-10 block max-w-12 text-center text-xs font-semibold leading-none">
            Freesm Launcher
          </span>
        </button>
      </div>
    </div>
    <div class="h-9 w-full flex justify-between px-2">
      <div class="relative flex flex-nowrap items-center gap-2 px-2">
        <div class="animated-accent-background absolute left-0 right-0 top-[-2px] h-1 transition-[background-color] duration-2000 ease-linear" />
        <div class="i-lucide-grid-2x2 h-4 w-4" />
        <p class="text-sm">
          Applications
        </p>
      </div>
    </div>
  </div>
</template>