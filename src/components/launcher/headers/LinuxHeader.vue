<script setup lang="ts">
import { inject } from "vue";
import { ApplicationName } from "@/constants/application.ts";
import type { ContextLauncherType } from "@/types/context-launcher.type.ts";
import Image from "@/components/base/Image.vue";

const { contextKey, onlyCloseButton, invertColors } = defineProps<{
  "contextKey"      : symbol;
  "onlyCloseButton"?: boolean;
  "invertColors"   ?: boolean;
}>();
const { maximized, title, maximize, minimize, close } = inject<ContextLauncherType>(contextKey) ?? {
  "maximized": false,
  "title"    : ApplicationName,
  "maximize" : () => {},
  "minimize" : () => {},
  "close"    : () => {},
};
</script>

<template>
  <div
    :class="[
      'h-6 w-full flex flex-nowrap items-center justify-between gap-2 rounded-t-md sm:h-8',
      invertColors ? 'bg-[#eff0f1]' : 'bg-catppuccin-900',
    ]"
  >
    <div
      :class="[
        'flex flex-nowrap items-center justify-start gap-2 pl-1 sm:pl-2',
        onlyCloseButton ? 'w-6 sm:w-8' : 'w-18 sm:w-24',
      ]"
    >
      <Image
        class-names="h-4 w-4 sm:h-5 sm:w-5"
        src="/favicon.webp"
        :alt="`${ApplicationName}'s logo`"
      />
    </div>
    <div :class="['text-nowrap text-xs sm:text-sm', invertColors ? 'text-black' : 'text-white']">
      {{ title }}
    </div>
    <div class="h-full flex items-stretch gap-0">
      <template v-if="!onlyCloseButton">
        <button aria-label="Launcher minimize button" @click="minimize" class="group grid w-6 cursor-default place-items-center sm:w-8">
          <span class="grid h-4 w-4 place-items-center rounded-full text-[#999] transition-[background-color,color] sm:h-5 sm:w-5 group-hover:bg-white group-hover:text-catppuccin-900">
            <span class="i-mdi-chevron-down block h-4 w-4 sm:h-5 sm:w-5" />
          </span>
        </button>
        <button aria-label="Launcher maximize button" @click="maximize" class="group grid w-6 cursor-default place-items-center sm:w-8">
          <span
            :class="[
              'grid h-4 w-4 place-items-center rounded-full text-[#999] transition-[background-color,color]',
              'sm:h-5 sm:w-5 group-hover:bg-white group-hover:text-catppuccin-900',
              maximized && 'bg-white text-catppuccin-900',
            ]"
          >
            <span class="i-mdi-chevron-up block h-4 w-4 sm:h-5 sm:w-5" />
          </span>
        </button>
      </template>
      <button aria-label="Launcher close button" @click="close" class="group grid w-6 cursor-default place-items-center sm:w-8">
        <span class="grid h-4 w-4 place-items-center rounded-full text-[#999] transition-[background-color,color] sm:h-5 sm:w-5 group-hover:bg-white group-hover:text-catppuccin-900">
          <span class="i-mdi-close block h-3 w-3 sm:h-4 sm:w-4" />
        </span>
      </button>
    </div>
  </div>
</template>