<script setup lang="ts">
import Page from "@/components/layout/Page.vue";
import { useRouter, RouterLink } from "@kitbag/router";
import { Locales } from "@/constants/locales.ts";
import { inject, ref } from "vue";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";
import { TranslationsContextKey } from "@/constants/application.ts";

document.title = "Not Found - Freesm Launcher";
document
  ?.querySelector?.("meta[name=\"description\"]")
  ?.setAttribute?.(
    "content",
    "A Prism Launcher fork aimed to provide a free way to play Minecraft.",
  );

const router = useRouter();
const pathname = location.pathname;
const hidden = ref<boolean>(false);

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);

for (const locale of Locales) {
  if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
    const pathnameWithoutLocale = pathname.split("/");

    pathnameWithoutLocale.shift();
    pathnameWithoutLocale.shift();

    hidden.value = true;
    router.push(`/${pathnameWithoutLocale.join("/")}`);
  }
}
</script>

<template>
  <Page v-show="!hidden">
    <div class="mx-auto max-w-225 min-h-[calc(100vh-112px)] w-full flex flex-col items-center justify-center gap-2 px-4 text-center text-balance text-white sm:px-6">
      <p class="animated-accent-text select-text pb-2 text-6xl font-black transition-[color] duration-2000 ease-linear sm:pb-4 sm:text-9xl">
        {{ translations?.Messages?.["pages.not-found.title"] }}
      </p>
      <p class="select-text text-xl font-bold sm:text-3xl">
        {{ translations?.Messages?.["pages.not-found.subtitle"] }}
      </p>
      <p class="select-text text-sm sm:text-lg">
        {{ translations?.Messages?.["pages.not-found.description"] }}
      </p>
      <RouterLink to="/" class="animated-accent-background mt-2 rounded-md px-2 py-1 text-sm text-black font-bold transition-[background-color,opacity] duration-[2000ms,150ms] ease-[linear,in-out] sm:mt-4 sm:px-4 sm:py-2 sm:text-xl hover:opacity-70">
        {{ translations?.Messages?.["pages.not-found.go-to-home"] }}
      </RouterLink>
    </div>
  </Page>
</template>