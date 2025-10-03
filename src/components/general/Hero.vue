<script setup lang="ts">
import { UAParser } from "ua-parser-js";
import { inject } from "vue";
import { getPlatformName } from "@/lib/helpers/get-platform-name.ts";
import { Routes, Socials } from "@/constants/routes.ts";
import Launcher from "@/components/launcher/Launcher.vue";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";
import { TranslationsContextKey } from "@/constants/application.ts";

const { os } = UAParser(navigator.userAgent);
const platform = getPlatformName(os?.name);
let icon: string;

switch (platform) {
  case "Windows": {
    icon = "i-mdi-windows";
    break;
  }
  case "Linux": {
    icon = "i-mdi-linux";
    break;
  }
  case "macOS": {
    icon = "i-mdi-apple";
    break;
  }
}

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);
</script>

<template>
  <div class="mx-auto max-w-240 flex flex-col gap-8 px-4 pt-12">
    <p class="text-right-to-left select-text text-center text-balance text-5xl text-white font-bold sm:text-7xl">
      <span>{{ translations?.Messages?.["pages.home.hero.title"] }}</span>
      {{ " " }}
      <span class="animated-accent-text transition-[color] duration-2000 ease-linear">
        {{ platform }}
      </span>
    </p>
    <p class="select-text text-center text-balance text-lg text-gray-400 sm:text-2xl">
      {{ translations?.Messages?.["pages.home.hero.description"] }}
    </p>
    <div class="flex justify-center gap-2">
      <RouterLink
        :to="Routes.Downloads.Path"
        class="animated-accent-background flex items-center gap-2 rounded-md px-4 py-2 text-center text-balance text-[18px] text-black font-bold transition-[background-color,opacity] duration-[2000ms,150ms] ease-[linear,in-out] hover:opacity-70"
      >
        <div class="grid min-h-6 min-w-6 place-items-center">
          <div :class="['w-6 h-6', icon]" />
        </div>
        {{ translations?.Messages?.["pages.home.hero.download-now"] }}
      </RouterLink>
      <a
        target="_blank"
        :href="Socials.Github.Home"
        class="rounded-md bg-transparent px-4 py-2 text-center text-balance text-[18px] text-white font-bold transition-[background-color] hover:bg-[theme(colors.white/.1)]"
      >
        Github
      </a>
    </div>
    <Launcher />
  </div>
</template>