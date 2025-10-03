<script setup lang="ts">
import { inject, ref } from "vue";
import { RouterLink, useRoute } from "@kitbag/router";
import { RoutesArray } from "@/constants/routes.ts";
import LocaleModalToggler from "@/components/general/LocaleModalToggler.vue";
import { TranslationsContextKey } from "@/constants/application.ts";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);

const currentRoute = useRoute();
const shown = ref<boolean>(false);

function toggleModal(properties?: { "show"?: boolean }) {
  shown.value = properties?.show ?? !shown.value;
}

function onNavigate() {
  toggleModal({ "show": false });
}
</script>

<template>
  <div class="fixed bottom-0 z-1000 h-20 w-full flex flex-nowrap overflow-x-auto bg-catppuccin-925 sm:hidden">
    <RouterLink
      @click="onNavigate"
      v-for="route in RoutesArray"
      :key="route.Key"
      :to="route.Path"
      :class="[
        'group h-full min-w-20 shrink-0 flex flex-col gap-2 justify-center items-center flex-1',
        currentRoute?.matched?.path === route.Path
          ? 'text-white fill-white font-semibold'
          : 'text-[theme(colors.white/.7)] fill-[theme(colors.white/.7)]',
      ]"
    >
      <div
        :class="[
          'relative flex justify-center h-8 rounded-full duration-200 transition-[width,background-color]',
          'group-hover:before:bg-[theme(colors.white/.02)] group-active:before:bg-[theme(colors.white/.02)]',
          'before:w-18 before:h-full before:rounded-full before:absolute before:content-empty',
          currentRoute?.matched?.path === route.Path
            ? 'w-18 bg-catppuccin-600'
            : 'w-8',
        ]"
      >
        <component
          :is="route.Icon"
          :active="currentRoute?.matched?.path === route.Path"
        />
      </div>
      <p class="pb-1 text-center text-sm leading-none transition-[color] duration-200">
        {{ translations?.Messages?.[route.Name] }}
      </p>
    </RouterLink>
    <LocaleModalToggler
      :shown="shown"
      :toggle="toggleModal"
    />
  </div>
</template>