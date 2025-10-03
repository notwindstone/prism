<script setup lang="ts">
import { ExtraInfo, Locales } from "@/constants/locales.ts";
import { useVibrate } from "@vueuse/core";
import type { TranslationsType } from "@/types/translations.type.ts";
import type { LocaleType } from "@/types/locale.type.ts";
import { ref } from "vue";
import { fetchTranslations } from "@/lib/helpers/fetch-translations.ts";

const { apply, current } = defineProps<{
  "apply"  : ((translations: TranslationsType) => void) | undefined;
  "current": TranslationsType | undefined;
}>();
const { vibrate } = useVibrate({ "pattern": [15] });
const loading = ref<boolean>(false);

async function applyLocale(selected: LocaleType): Promise<void> {
  loading.value = true;

  try {
    await fetchTranslations({
      "locale"         : selected,
      "setTranslations": apply,
    });

    vibrate();
  } catch (error) {
    console.error(`Couldn't retrieve translations for '${selected}':`, error);
  }

  loading.value = false;
}
</script>

<template>
  <button
    v-for="locale in Locales"
    :key="locale"
    :disabled="loading"
    @click="() => applyLocale(locale)"
    :class="[
      'w-full flex flex-nowrap gap-4 px-4 py-3 text-lg',
      'first:rounded-t-3xl first:rounded-b-md last:rounded-t-md last:rounded-b-3xl rounded-md',
      'bg-catppuccin-800 sm:bg-transparent sm:gap-2 sm:!rounded-md sm:px-2 sm:py-1',
      'transition-[background-color,opacity] hover:bg-catppuccin-600 disabled:opacity-60',
      current?.Info?.Code === locale && '!bg-catppuccin-600 sm:!bg-catppuccin-800 sm:hover:bg-catppuccin-800',
    ]"
  >
    <span class="max-sm:shrink-0">{{ ExtraInfo[locale].Flag }}</span>
    <span class="max-sm:w-full max-sm:text-center">{{ ExtraInfo[locale].Name }}</span>
  </button>
</template>