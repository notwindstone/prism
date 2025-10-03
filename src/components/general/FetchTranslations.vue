<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { TranslationsSelectorContextKey } from "@/constants/application.ts";
import { inject } from "vue";
import type { TranslationsSelectorType } from "@/types/translations-selector.type.ts";
import { fetchTranslations } from "@/lib/helpers/fetch-translations.ts";
import type { LocaleType } from "@/types/locale.type.ts";

const setTranslations = inject<TranslationsSelectorType>(TranslationsSelectorContextKey);

/*
 * this component renders only if navigator locale is valid
 * so no need for additional checks that provided locale is 'LocaleType'
 */
const locale = navigator.language.slice(0, 2) as LocaleType;

useQuery({
  "queryKey": ["translations", "background", locale],
  "queryFn" : () => {
    return fetchTranslations({ locale, setTranslations });
  },
});
</script>