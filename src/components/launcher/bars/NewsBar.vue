<script setup lang="ts">
import { inject } from "vue";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";
import { TranslationsContextKey } from "@/constants/application.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);
</script>

<template>
  <div class="h-10 w-full flex items-stretch justify-stretch gap-2 bg-[#09090e] p-[10px]">
    <div class="animated-accent-background w-[5px] cursor-move rounded-full transition-[background-color] duration-2000 ease-linear" />
    <div class="w-full flex flex-nowrap items-center gap-1 rounded-md px-1 text-nowrap text-[10px] text-[#cdd6f4] transition-[background-color] hover:bg-[#1a1723] sm:text-[13px]">
      <div class="i-fluent-news-16-regular w-4 shrink-0" />
      <p class="w-fit text-nowrap">
        {{ translations?.Messages?.["launcher.website-in-vue"] }}
      </p>
    </div>
    <div class="w-fit flex flex-nowrap items-center gap-1 rounded-md px-1 text-nowrap text-[10px] text-[#cdd6f4] transition-[background-color] hover:bg-[#1a1723] sm:text-[13px]">
      <div class="i-fluent-news-16-regular w-4 shrink-0" />
      <p class="min-w-20 text-nowrap">
        {{ translations?.Messages?.["launcher.more-news"] }}
      </p>
    </div>
  </div>
</template>