<script setup lang="ts">
import { useCurrentInstance } from "@/lib/stores/launcher/current-instance.ts";
import {
  Deleted,
  LauncherInstanceBarItems,
  UnknownInstance,
} from "@/constants/launcher.ts";
import Image from "@/components/base/Image.vue";
import { computed, inject } from "vue";
import { useAllInstances } from "@/lib/stores/launcher/all-instances.ts";
import type { LauncherInstanceType } from "@/types/launcher-instance.type.ts";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";
import { TranslationsContextKey } from "@/constants/application.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);

const { barStates } = defineProps<{
  "barStates": {
    "news"    : boolean;
    "status"  : boolean;
    "instance": boolean;
  };
}>();

const allInstances = useAllInstances();
const currentInstanceStore = useCurrentInstance();
const currentInstance = computed(
  (): LauncherInstanceType => allInstances
    .instances
    .find(
      searching => searching.Id === currentInstanceStore.id,
    ) ?? UnknownInstance,
);
const isDeleted = computed((): boolean => currentInstance.value.Id === UnknownInstance.Id);

const actionStates: Record<
  typeof LauncherInstanceBarItems[number]["Name"],
  () => void
> = {
  "launcher.launch": () => {
    currentInstanceStore.setLaunched(currentInstance.value.Id);
  },
  "launcher.kill": () => {
    currentInstanceStore.setLaunched(undefined);
  },
  "launcher.edit"        : () => {},
  "launcher.change-group": () => {},
  "launcher.folder"      : () => {},
  "launcher.export"      : () => {},
  "launcher.copy"        : () => {},
  "launcher.delete"      : () => {
    allInstances.instances = allInstances
      .instances
      .map(mapping => {
        if (mapping.Id !== currentInstance.value.Id) {
          return mapping;
        }

        return {
          ...mapping,
          "Deleted": Deleted.Process,
        };
      });
  },
  "launcher.create-shortcut": () => {},
};
const disableStates = computed((): Record<
  typeof LauncherInstanceBarItems[number]["Name"],
  boolean
> => {
  if (currentInstanceStore.id === UnknownInstance.Id) {
    return {
      "launcher.launch"         : true,
      "launcher.kill"           : true,
      "launcher.edit"           : true,
      "launcher.change-group"   : true,
      "launcher.folder"         : true,
      "launcher.export"         : true,
      "launcher.copy"           : true,
      "launcher.delete"         : true,
      "launcher.create-shortcut": true,
    };
  }

  return {
    "launcher.launch"         : currentInstanceStore.launched === currentInstance.value.Id,
    "launcher.kill"           : currentInstanceStore.launched !== currentInstance.value.Id,
    "launcher.edit"           : true,
    "launcher.change-group"   : true,
    "launcher.folder"         : true,
    "launcher.export"         : true,
    "launcher.copy"           : true,
    "launcher.delete"         : false,
    "launcher.create-shortcut": true,
  };
});
</script>

<template>
  <div
    :class="[
      'w-32 flex flex-col gap-2 bg-[#0a0a10] p-[10px] sm:w-42',
      barStates.status ? 'rounded-bl-none' : 'rounded-bl-md',
    ]"
  >
    <div class="animated-accent-background h-[5px] w-full cursor-move rounded-full transition-[background-color] duration-2000 ease-linear" />
    <div
      :class="[
        'grid place-items-center rounded-md transition-[background-color]',
        !isDeleted && 'hover:bg-[#1b1825]',
      ]"
    >
      <Image
        :class-names="`w-20 ${isDeleted && 'grayscale-100 contrast-40'}`"
        :src="currentInstance.Icon"
        :alt="`${currentInstance.Name}'s icon`"
      />
    </div>
    <button
      @click="() => currentInstanceStore.setRenaming(currentInstance.Id)"
      :class="[
        'grid place-items-center rounded-md transition-[background-color]',
        !isDeleted && 'hover:bg-[#1b1825]'
      ]"
    >
      <span class="block text-center text-[10px] text-[#cdd6f4] sm:text-[13px]">
        {{ currentInstance.Name }}
      </span>
    </button>
    <button
      v-for="item in LauncherInstanceBarItems"
      :key="item.Name"
      @click="actionStates[item.Name]"
      :disabled="disableStates[item.Name]"
      class="flex items-start gap-1 rounded-md px-1 py-[2px] text-[#cdd6f4] transition-[background-color] disabled:pointer-events-none sm:items-center disabled:bg-transparent hover:bg-[#1b1825] disabled:text-[#9298b6] disabled:transition-none"
    >
      <span
        :class="[
          'block w-[14px] shrink-0',
          item.Icon,
        ]"
      />
      <span class="text-[10px] sm:text-[13px]">
        {{ translations?.Messages?.[item.Name] }}
      </span>
    </button>
  </div>
</template>