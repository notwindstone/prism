<!-- eslint-disable unicorn/filename-case -->
<script setup lang="ts">
import Page from "@/components/layout/Page.vue";
import CommonIssues from "@/components/general/CommonIssues.vue";
import { inject } from "vue";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";
import { TranslationsContextKey } from "@/constants/application.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);

document.title = "FAQ - Freesm Launcher";
document
  ?.querySelector?.("meta[name=\"description\"]")
  ?.setAttribute?.(
    "content",
    "A collection of helpful information for frequent problems when using Freesm Launcher.",
  );
</script>

<template>
  <Page>
    <div class="mx-auto max-w-240 flex flex-col gap-8 px-4 pt-12">
      <p class="select-text text-center text-balance text-5xl text-white font-bold sm:text-7xl">
        {{ translations?.Messages?.["pages.faq.title"] }}
      </p>
      <p class="select-text text-center text-balance text-lg text-gray-400 sm:text-2xl">
        {{ translations?.Messages?.["pages.faq.description"] }}
      </p>
    </div>
    <CommonIssues />
  </Page>
</template>