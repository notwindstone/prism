import { defineStore } from "pinia";
import { LauncherCatPacks } from "@/constants/launcher.ts";

export const useCatPackState = defineStore("cat-pack", {
  "state": () => ({
    "enabled": true,
    "image"  : LauncherCatPacks[0].Image,
    "name"   : LauncherCatPacks[0].Name,
  }),
  "actions": {
    "toggle"() {
      this.enabled = !this.enabled;
    },
    "change"(newImage: string, newName: string) {
      this.image = newImage;
      this.name = newName;
    },
  },
});