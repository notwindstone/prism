<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { onClickOutside } from "@vueuse/core";
import { LauncherCatPacks } from "@/constants/launcher.ts";
import Image from "@/components/base/Image.vue";
import { useCatPackState } from "@/lib/stores/launcher/cat-pack-state.ts";

const opened = ref<boolean>(false);
const target = useTemplateRef<HTMLElement>("target");
const catPackStore = useCatPackState();

function select({ Image, Name }: { "Image": string; "Name": string }) {
  opened.value = false;
  catPackStore.change(Image, Name);
}

const mouseDownTime = ref<number>(0);

function onMouseDown(): void {
  opened.value = true;
  mouseDownTime.value = Date.now();
}
function onMouseUp(catPack: { "Name": string; "Image": string }): void {
  const difference: number = Date.now() - mouseDownTime.value;

  if (difference > 750) {
    select(catPack);
  }
}

onClickOutside(target, () => {
  opened.value = false;
});
</script>

<template>
  <div class="w-full flex flex-1 flex-col gap-2 rounded-md bg-catppuccin-900 p-4 lg:w-auto">
    <p class="animated-accent-border w-fit border-b px-2 pb-2 text-catppuccin-50 transition-[border-color] duration-2000 ease-linear max-sm:text-sm">
      Theme
    </p>
    <div class="flex flex-nowrap gap-0 rounded-md bg-[#16161f] p-2">
      <div class="flex shrink-0 flex-col justify-between gap-2">
        <p
          v-for="item in ['Icons', 'Widgets', 'Cat']"
          :key="item"
          class="p-2 text-catppuccin-50 leading-none max-sm:text-sm"
        >
          {{ item }}
        </p>
      </div>
      <div class="relative w-full flex flex-col justify-between gap-2">
        <button
          @click="() => opened = true"
          @mousedown="onMouseDown"
          v-for="item in ['Fluent Dark', 'Freesm Dark', 'Cat Pack']"
          :key="item"
          :disabled="item !== 'Cat Pack'"
          class="w-full flex items-center justify-between rounded-md bg-[#26262f] p-1 text-catppuccin-50 leading-none disabled:cursor-not-allowed hover:bg-[#2b2b33] disabled:opacity-70 disabled:hover:bg-[#26262f]"
        >
          <span v-if="item === 'Cat Pack'" class="flex flex-wrap items-center gap-2">
            <Image
              class-names="h-5 w-5 ml-[2px] object-cover rounded-md sm:h-6 sm:w-6 sm:ml-0"
              :src="catPackStore.image"
              :alt="`${catPackStore.name} cat pack`"
            />
            <span class="block py-1 text-sm leading-none max-sm:text-xs">
              {{ catPackStore.name }}
            </span>
            <span class="block py-1 text-xs opacity-50 max-sm:text-[10px]">
              check launcher
            </span>
          </span>
          <span v-else class="block p-1 text-sm leading-none max-sm:text-xs">
            {{ item }}
          </span>
          <span v-if="item === 'Cat Pack'" class="i-lucide-chevron-down block" />
        </button>
        <div ref="target" v-if="opened" class="absolute bottom-0 w-full flex flex-col translate-y-[56px] gap-0 border border-catppuccin-600 bg-catppuccin-800 p-1">
          <button
            @click="() => select(pack)"
            @mouseup="() => onMouseUp(pack)"
            v-for="pack in LauncherCatPacks"
            :key="pack.Name"
            class="group relative w-full flex flex-wrap items-center gap-2 px-2 py-1 lg:flex-nowrap"
          >
            <Image
              class-names="relative z-10 h-6 w-6 object-cover rounded-md"
              :src="pack.Image"
              :alt="`${pack.Name} cat pack`"
            />
            <span class="relative z-10 block break-all text-start text-sm">
              {{ pack.Name }}
            </span>
            <span class="animated-accent-background absolute bottom-0 left-0 right-0 top-0 hidden opacity-60 transition-[background-color] duration-2000 ease-linear group-hover:block" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>