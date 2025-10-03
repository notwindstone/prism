import { Deleted, Groups } from "@/constants/launcher.ts";

export type LauncherInstanceType = {
  "Id"     : string;
  "Name"   : string;
  "Version": string;
  "Group"  : typeof Groups[keyof typeof Groups];
  "Icon"   : string;
  "Deleted": typeof Deleted[keyof typeof Deleted];
};