import { defineStore } from "pinia";
import { LauncherInstances } from "@/constants/launcher.ts";

export const useCurrentInstance = defineStore("current-instance", {
  "state": (): {
    "id"      : string;
    "launched": string | undefined;
    "renaming": string | undefined;
  } => ({
    "id"      : LauncherInstances[0].Id,
    "launched": undefined,
    "renaming": undefined,
  }),
  "actions": {
    "setCurrent"(id: string) {
      this.id = id;
    },
    "setLaunched"(id: string | undefined) {
      this.launched = id;
    },
    "setRenaming"(id: string | undefined) {
      this.renaming = id;
    },
  },
});