import { defineStore } from "pinia";
import { MobileSwipesKey } from "@/constants/application.ts";

export const useMobileSwipes = defineStore("mobile-swipes", {
  "state": () => ({
    "enabled": localStorage?.getItem?.(MobileSwipesKey) === "true",
  }),
  "actions": {
    "toggle"() {
      localStorage.setItem(MobileSwipesKey, JSON.stringify(!this.enabled));
      this.enabled = !this.enabled;
    },
  },
});