import Translations from "@/locales/en.json";
import type { LocaleType } from "@/types/locale.type.ts";

export type TranslationsType = {
  "Info": {
    "Code": LocaleType;
    "Name": string;
    "Flag": string;
    "RTL" : boolean;
  };
  "Messages": typeof Translations["Messages"];
};