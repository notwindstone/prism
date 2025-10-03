import type { LocaleType } from "@/types/locale.type.ts";

export const Locales = ["en", "ru", "ua", "fa", "pl"] as const;
export const ExtraInfo: Record<LocaleType, {
  "Name": string;
  "Flag": string;
}> = {
  "en": {
    "Name": "English",
    "Flag": "\uD83C\uDDEC\uD83C\uDDE7",
  },
  "ru": {
    "Name": "Русский",
    "Flag": "\uD83C\uDDF7\uD83C\uDDFA",
  },
  "ua": {
    "Name": "Українська",
    "Flag": "\uD83C\uDDFA\uD83C\uDDE6",
  },
  "fa": {
    "Name": "فارسی",
    "Flag": "\uD83C\uDDEE\uD83C\uDDF7",
  },
  "pl": {
    "Name": "Polski",
    "Flag": "\uD83C\uDDF5\uD83C\uDDF1",
  },
};