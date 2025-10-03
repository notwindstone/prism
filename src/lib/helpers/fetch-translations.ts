import type { LocaleType } from "@/types/locale.type.ts";
import type { TranslationsType } from "@/types/translations.type.ts";
import { shallowValidateTranslations } from "@/lib/translations/shallow-validate-translations.ts";
import type { TranslationsSelectorType } from "@/types/translations-selector.type.ts";

export async function fetchTranslations({
  locale,
  setTranslations,
}: {
  "locale"         : LocaleType;
  "setTranslations": TranslationsSelectorType | undefined;
}): Promise<"success" | Error> {
  if (locale === "en") {
    // 'shallowValidateTranslations' returns english translations if something ain't good
    setTranslations?.(shallowValidateTranslations({}));

    return "success";
  }

  const response = await fetch(`/translations/${locale}.json`);
  const data: unknown = await response.json();
  const validated: TranslationsType = shallowValidateTranslations(data);

  setTranslations?.(validated);

  return "success";
}