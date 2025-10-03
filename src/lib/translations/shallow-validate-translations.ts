import type { TranslationsType } from "@/types/translations.type.ts";
import Translations from "@/locales/en.json";

export function shallowValidateTranslations(parsed: unknown): TranslationsType {
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("Info" in parsed) ||
    typeof parsed?.Info !== "object" ||
    parsed?.Info === null ||
    !("Messages" in parsed) ||
    typeof parsed?.Messages !== "object" ||
    parsed?.Messages === null
  ) {
    return Translations as TranslationsType;
  }

  return parsed as TranslationsType;
}