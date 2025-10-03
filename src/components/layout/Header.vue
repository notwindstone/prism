<script setup lang="ts">
import { RouterLink, useRoute } from "@kitbag/router";
import { ExternalLinks, RoutesArray } from "@/constants/routes.ts";
import Image from "@/components/base/Image.vue";
import LocaleDropdownSelector from "@/components/general/LocaleDropdownSelector.vue";
import { inject } from "vue";
import { TranslationsContextKey } from "@/constants/application.ts";
import { useAccentAnimation } from "@/lib/stores/misc/accent-animations.ts";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);

const currentRoute = useRoute();
const accentAnimationStore = useAccentAnimation();
</script>

<template>
  <header class="sticky top-0 z-50 hidden h-20 max-w-320 w-full shrink-0 justify-center bg-transparent xle:fixed xle:left-[50%] sm:flex xle:translate-x-[-50%]">
    <!-- 'scrollbar-gutter: stable both-edges' is needed to make sure header is aligned with footer -->
    <div class="h-full w-full flex items-center justify-between gap-0 rounded-b-md bg-catppuccin-925 px-4 md:gap-4">
      <RouterLink to="/" class="shrink-0">
        <Image src="/freesm-launcher-logo.webp" alt="Freesm Launcher logo" class-names="h-12" />
      </RouterLink>
      <div class="flex flex-nowrap items-center gap-2 md:gap-4">
        <nav class="flex flex-nowrap gap-0">
          <RouterLink
            v-for="route in RoutesArray"
            :key="route.Key"
            :to="route.Path"
            :class="[
              'relative p-1 md:p-2 font-semibold animated-accent-before-background',
              'before:absolute before:bottom-0 before:h-[2px] before:w-0 before:ease-[linear,in-out]',
              'before:transition-[background-color,width] before:duration-[2000ms,300ms]',
              'before:content-empty hover:before:!w-[calc(100%-8px)] md:hover:before:!w-[calc(100%-16px)]',
              route.Path === currentRoute?.matched?.path
                && 'before:!w-[calc(100%-8px)] md:before:!w-[calc(100%-16px)]',
            ]"
          >
            {{ translations?.Messages?.[route.Name] }}
          </RouterLink>
        </nav>
        <div className="w-[2px] h-8 animated-accent-background transition-[background-color] duration-2000 ease-linear" />
        <a
          v-for="link in ExternalLinks"
          :key="link.Key"
          :href="link.Link"
          :aria-label="`A link to our ${link.Key}`"
          target="_blank"
          class="hidden size-8 shrink-0 place-items-center rounded-full bg-catppuccin-800 transition-[background-color] md:grid hover:bg-catppuccin-600"
        >
          <div :class="[link.Icon, 'size-5']" />
        </a>
        <button
          @click="accentAnimationStore.toggle"
          class="grid size-8 shrink-0 place-items-center rounded-full bg-catppuccin-800 transition-[background-color] active:cursor-default hover:bg-catppuccin-600"
          title="Toggle accent color animation"
          aria-label="Toggle accent color animation"
        >
          <span :class="[
            'i-lucide-palette block size-5',
            'animated-accent-text transition-[color,filter] duration-[2000ms,150ms] ease-linear',
            accentAnimationStore.enabled ? 'brightness-100' : 'brightness-200',
          ]" />
        </button>
        <LocaleDropdownSelector />
      </div>
    </div>
  </header>
</template>