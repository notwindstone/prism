<script setup lang="ts">
import Modal from "@/components/base/Modal.vue";
import World from "@/components/icons/World.vue";
import { inject } from "vue";
import type { TranslationsSelectorType } from "@/types/translations-selector.type.ts";
import LocaleSelectors from "@/components/general/LocaleSelectors.vue";
import { useAccentAnimation } from "@/lib/stores/misc/accent-animations.ts";
import { useMobileSwipes } from "@/lib/stores/misc/mobile-swipes.ts";
import { useVibrate } from "@vueuse/core";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";
import { TranslationsContextKey, TranslationsSelectorContextKey } from "@/constants/application.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);
const selectTranslations = inject<TranslationsSelectorType>(TranslationsSelectorContextKey);

const { shown, toggle } = defineProps<{
  "shown" : boolean;
  "toggle": () => void;
}>();

const { vibrate } = useVibrate({ "pattern": [15] });

const accentAnimationStore = useAccentAnimation();
const mobileSwipesStore = useMobileSwipes();

function toggleAnimations() {
  accentAnimationStore.toggle();
  vibrate();
}
function toggleSwipes() {
  mobileSwipesStore.toggle();
  vibrate();
}
</script>

<template>
  <button
    @click="toggle"
    :class="[
      'group h-full min-w-20 shrink-0 flex flex-col gap-2 justify-center items-center flex-1',
      shown
        ? 'text-white fill-white font-semibold'
        : 'text-[theme(colors.white/.7)] fill-[theme(colors.white/.7)]',
    ]"
  >
    <span
      :class="[
        'relative flex justify-center h-8 rounded-full duration-200 transition-[width,background-color]',
        'group-hover:before:bg-[theme(colors.white/.02)] group-active:before:bg-[theme(colors.white/.02)]',
        'before:w-18 before:h-full before:rounded-full before:absolute before:content-empty',
        shown
          ? 'w-18 bg-catppuccin-600'
          : 'w-8',
        ]"
    >
      <World :active="shown" />
    </span>
    <span class="block pb-1 text-center text-sm leading-none transition-[color] duration-200">
      {{ translations?.Messages?.["general.other"] }}
    </span>
  </button>
  <Modal
    :shown="shown"
    :toggle="toggle"
    class-names="left-[calc(50%-128px)] top-[calc(50%-228px-40px)]"
  >
    <div class="h-fit w-64 flex flex-col select-none gap-4 p-4">
      <div class="flex flex-nowrap items-center justify-between">
        <p class="text-xl leading-none">
          {{ translations?.Messages?.["general.other"] }}
        </p>
        <button
          @click="toggle"
          class="grid h-9 w-9 place-items-center rounded-full bg-catppuccin-700"
        >
          <span class="i-lucide-x block h-5 w-5" />
        </button>
      </div>
      <div class="h-[1px] w-full bg-catppuccin-700" />
      <div class="max-h-52 flex flex-col gap-2 overflow-y-auto">
        <LocaleSelectors :apply="selectTranslations" :current="translations" />
      </div>
      <div class="h-[1px] w-full bg-catppuccin-700" />
      <div class="flex flex-col gap-2">
        <button
          @click="toggleAnimations"
          :class="[
          'w-full flex flex-nowrap items-center gap-4 px-4 py-3 text-lg',
          'rounded-t-3xl rounded-b-md',
          'transition-[background-color]',
          accentAnimationStore.enabled
            ? 'bg-catppuccin-600'
            : 'bg-catppuccin-800',
        ]"
        >
          <span class="i-lucide-palette block size-5 shrink-0" />
          <span class="max-sm:w-full max-sm:text-center">
          Color Animation
        </span>
        </button>
        <button
          @click="toggleSwipes"
          :class="[
          'w-full flex flex-nowrap items-center gap-4 px-4 py-3 text-lg',
          'rounded-t-md rounded-b-3xl',
          'transition-[background-color]',
          mobileSwipesStore.enabled
            ? 'bg-catppuccin-600'
            : 'bg-catppuccin-800',
        ]"
        >
          <span class="i-lucide-gallery-horizontal block size-5 shrink-0" />
          <span class="max-sm:w-full max-sm:text-center">
          Swipes
        </span>
        </button>
      </div>
    </div>
  </Modal>
</template>