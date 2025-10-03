<script setup lang="ts">
import { computed, inject, ref, watchEffect } from "vue";
import { useCurrentInstance } from "@/lib/stores/launcher/current-instance.ts";
import { useIntervalFn } from "@vueuse/core";
import { Deleted, LauncherInstances, UnknownInstance } from "@/constants/launcher.ts";
import { useAllInstances } from "@/lib/stores/launcher/all-instances.ts";
import type { LauncherInstanceType } from "@/types/launcher-instance.type.ts";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";
import { TranslationsContextKey } from "@/constants/application.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);

const allInstances = useAllInstances();
const currentInstanceStore = useCurrentInstance();
const currentInstance = computed(
  (): LauncherInstanceType => allInstances
    .instances
    .find(
      searching => searching.Id === currentInstanceStore.id,
    ) ?? UnknownInstance,
);

const playtime = ref<Record<string, number>>(
  Object.fromEntries(
    LauncherInstances.map((instance): [string, number] => [instance.Id, 0]),
  ),
);

const playtimeText = computed((): {
  "instance": string;
  "overall" : string;
} => {
  const overallSeconds = Object
    .values(playtime.value)
    .reduce((accumulator: number, currentValue) => currentValue + accumulator, 0);
  const overallMinutes = Math.floor(overallSeconds / 60);
  const overallSecondsRemaining = overallSeconds % 60;

  const instanceSeconds = playtime.value[currentInstance.value.Id] ?? 0;
  const instanceMinutes = Math.floor(instanceSeconds / 60);
  const instanceSecondsRemaining = instanceSeconds % 60;

  return {
    "instance": currentInstance.value.Id === UnknownInstance.Id
      ? (translations?.value?.Messages?.["launcher.no-instance-selection"] ?? "")
      :
      "Minecraft" +
      " " +
      currentInstance.value.Version +
      ", " +
      translations?.value?.Messages?.["launcher.specific-time-played"] +
      " " +
      (
        instanceMinutes > 0
          ? instanceMinutes + (translations?.value?.Messages?.["launcher.minutes-short"] ?? "") + " "
          : ""
      ) +
      instanceSecondsRemaining +
      " " +
      translations?.value?.Messages?.["launcher.seconds-short"],
    "overall":
      translations?.value?.Messages?.["launcher.time-played"] +
      ": " +
      (
        overallMinutes > 0
          ? overallMinutes + (translations?.value?.Messages?.["launcher.minutes-short"] ?? "") + " "
          : ""
      ) +
      overallSecondsRemaining +
      " " +
      translations?.value?.Messages?.["launcher.seconds-short"],
  };
});

const { pause, resume } = useIntervalFn(() => {
  if (currentInstanceStore.launched === undefined) {
    return;
  }

  playtime.value[currentInstanceStore.launched] += 1;
}, 1000, {
  "immediate": false,
});

watchEffect(() => {
  const isNotLaunched = currentInstanceStore.launched === undefined;
  const isDeleted =
    allInstances.instances.find(
      searching => searching.Id === currentInstanceStore.launched,
    )?.Deleted === Deleted.Yes;

  if (isNotLaunched || isDeleted) {
    pause();

    return;
  }

  resume();
});
</script>

<template>
  <div class="h-9 w-full flex items-center justify-between gap-2 rounded-b-md bg-[#09090e] p-2">
    <div class="px-4 text-nowrap text-[10px] text-[#cdd6f4] sm:text-[13px]">
      <p class="w-fit text-nowrap">
        {{ playtimeText.instance }}
      </p>
    </div>
    <div class="px-4 text-nowrap text-[10px] text-[#cdd6f4] sm:text-[13px]">
      <p class="w-fit text-nowrap">
        {{ playtimeText.overall }}
      </p>
    </div>
  </div>
</template>