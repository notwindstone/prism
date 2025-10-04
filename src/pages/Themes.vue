<script setup lang="ts">
import Page from "@/components/layout/Page.vue";
import { inject } from "vue";
import ThemeGenerator from "@/components/themes/ThemeGenerator.vue";
import { TranslationsContextKey } from "@/constants/application.ts";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";

document.title = "Themes - Prism Launcher";
document
  ?.querySelector?.("meta[name=\"description\"]")
  ?.setAttribute?.(
    "content",
    "Easily create and preview your Prism Launcher theme in real-time.",
  );

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);
</script>

<template>
  <Page>
    <div class="mx-auto max-w-240 flex flex-col gap-8 px-4 pt-12">
      <p class="select-text text-center text-balance text-5xl text-white font-bold sm:text-7xl">
        {{ translations?.Messages?.["pages.themes.title"] }}
      </p>
      <p class="text-right-to-left select-text text-center text-balance text-lg text-gray-400 sm:text-2xl">
        {{ translations?.Messages?.["pages.themes.description"] }}
      </p>
      <a href="https://prismlauncher.org/wiki/getting-started/change-themes/#how-to-install-themes-and-icons" class="select-text text-center text-white hover:underline">
        Installation guide
      </a>
    </div>
    <ThemeGenerator />
    <div class="text-center text-sm text-gray-400">
      <span>Made by</span>
      <span>{{ " " }}</span>
      <a class="text-white hover:underline" href="https://github.com/notwindstone" target="_blank">
        notwindstone
      </a>
      <span>{{ " " }}</span>
      <span>{{ "<3" }}</span>
    </div>
  </Page>
</template>