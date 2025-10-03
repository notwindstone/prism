<script setup lang="ts">
import { inject } from "vue";
import { ApplicationName } from "@/constants/application.ts";
import type { ContextLauncherType } from "@/types/context-launcher.type.ts";

const { contextKey, onlyCloseButton } = defineProps<{
  "contextKey"      : symbol;
  "onlyCloseButton"?: boolean;
}>();
const { title, maximize, minimize, close } = inject<ContextLauncherType>(contextKey) ?? {
  "maximized": false,
  "title"    : ApplicationName,
  "maximize" : () => {},
  "minimize" : () => {},
  "close"    : () => {},
};
</script>

<template>
  <div class="h-6 w-full flex flex-nowrap items-center justify-between gap-2 rounded-t-md bg-catppuccin-900 sm:h-8">
    <div class="h-full flex items-stretch gap-0">
      <button aria-label="Launcher close button" @click="close" class="group grid w-6 cursor-default place-items-center sm:w-8">
        <span class="grid h-[14px] w-[14px] place-items-center rounded-full bg-[#ff5e54] text-transparent transition-[color] sm:h-[18px] sm:w-[18px] group-hover-text-[#700700]">
          <span class="sm:h-18px] i-stash-times-solid block h-[14px] w-[14px] sm:w-[18px] -scale-x-100" />
        </span>
      </button>
      <template v-if="!onlyCloseButton">
        <button aria-label="Launcher minimize button" @click="minimize" class="group grid w-6 cursor-default place-items-center sm:w-8">
          <span class="grid h-[14px] w-[14px] place-items-center rounded-full bg-[#ffbd2e] text-transparent transition-[color] sm:h-[18px] sm:w-[18px] group-hover:text-[#733e01]">
            <span class="i-stash-minus-solid block h-[14px] w-[14px] sm:h-[18px] sm:w-[18px] -scale-x-100" />
          </span>
        </button>
        <button aria-label="Launcher maximize button" @click="maximize" class="group grid w-6 cursor-default place-items-center sm:w-8">
          <span class="grid h-[14px] w-[14px] place-items-center rounded-full bg-[#27c93f] text-transparent transition-[color] sm:h-[18px] sm:w-[18px] group-hover:text-[#01540d]">
            <span class="i-stash-expand-diagonal-solid block h-[14px] w-[14px] sm:h-[18px] sm:w-[18px] -scale-x-100"></span>
          </span>
        </button>
      </template>
    </div>
    <div class="w-fit flex flex-nowrap items-center justify-start gap-2 px-1 sm:px-2">
      <p class="text-nowrap text-xs text-white sm:text-sm">
        {{ title }}
      </p>
    </div>
    <div :class="onlyCloseButton ? 'w-6 sm:w-8' : 'w-18 sm:w-24'" />
  </div>
</template>