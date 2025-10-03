<script setup lang="ts">
import Image from "@/components/base/Image.vue";
import { FooterLinks } from "@/constants/routes.ts";
import { inject } from "vue";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";
import { TranslationsContextKey } from "@/constants/application.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);
</script>

<template>
  <div class="sticky bottom-0 left-0 right-0 z-0 h-91 flex justify-center bg-catppuccin-925 p-8 sm:h-58">
    <div class="max-w-320 w-full flex flex-col flex-nowrap gap-4 sm:flex-row sm:justify-between">
      <div class="flex flex-col items-center gap-2 sm:items-start">
        <RouterLink to="/">
          <Image
            class-names="h-10"
            src="/freesm-launcher-logo.webp"
            alt="Freesm Launcher logo"
          />
        </RouterLink>
        <p class="select-text text-gray-400 max-sm:text-sm">
          {{ translations?.Messages?.["footer.short-description"] }}
        </p>
        <Image
          class-names="max-h-7 rounded-md"
          src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Ffreesmlauncher.org%2F&label=Visits&icon=person-circle&color=%23ffffff&message=&style=for-the-badge&tz=UTC"
          alt="Visits counter"
        />
      </div>
      <div class="flex flex-col select-text gap-4 sm:flex-row">
        <div
          v-for="section in FooterLinks"
          :key="section.title"
          class="flex flex-1 flex-col items-center gap-2 px-4 sm:items-start"
        >
          <p class="text-white font-semibold max-sm:text-sm">
            {{ translations?.Messages?.[section.title] }}
          </p>
          <div class="flex flex-row items-center gap-2 sm:flex-col sm:items-start">
            <a
              v-for="link in section.links"
              :key="link.name"
              :href="link.link"
              target="_blank"
              class="text-center text-wrap text-gray-400 leading-5 underline-offset-[5px] sm:text-start max-sm:text-sm hover:underline"
            >
              {{ translations?.Messages?.[link.name] }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>