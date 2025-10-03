import { defineStore } from "pinia";
import { AccentAnimationKey } from "@/constants/application.ts";

export const useAccentAnimation = defineStore("accent-animation", {
  "state": () => ({
    "enabled": localStorage?.getItem?.(AccentAnimationKey) === "true",
  }),
  "actions": {
    "toggle"() {
      localStorage.setItem(AccentAnimationKey, JSON.stringify(!this.enabled));
      this.enabled = !this.enabled;
    },
  },
});