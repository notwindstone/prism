<script setup lang="ts">
import { inject, ref, useTemplateRef } from "vue";
import type { TranslationsSelectorType } from "@/types/translations-selector.type.ts";
import { onClickOutside } from "@vueuse/core";
import LocaleSelectors from "@/components/general/LocaleSelectors.vue";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";
import { TranslationsContextKey, TranslationsSelectorContextKey } from "@/constants/application.ts";

const opened = ref<boolean>(false);

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);
const selectTranslations = inject<TranslationsSelectorType>(TranslationsSelectorContextKey);

function toggleMenu() {
  opened.value = !opened.value;
}

const target = useTemplateRef<HTMLElement>("target");

onClickOutside(target, event => {
  // Don't close dropdown if target element was a dropdown toggle button
  if (event.target === null || !("id" in event.target) || event.target.id === "__locale-selector") {
    return;
  }

  opened.value = false;
});
</script>

<template>
  <div class="relative">
    <button
      id="__locale-selector"
      @mousedown="toggleMenu"
      class="grid size-8 place-items-center rounded-full bg-catppuccin-800 transition-[background-color] active:cursor-default hover:bg-catppuccin-600"
      title="Change a website locale"
      aria-label="Change a website locale"
    >
      {{ translations?.Info?.Flag }}
    </button>
    <Transition name="slide-fade">
      <div ref="target" v-show="opened" class="absolute right-0 top-10 flex flex-col items-start gap-1 rounded-md bg-catppuccin-900 p-1">
        <LocaleSelectors :apply="selectTranslations" :current="translations" />
      </div>
    </Transition>
  </div>
</template>