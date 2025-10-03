<script setup lang="ts">
import type { LauncherInstanceType } from "@/types/launcher-instance.type.ts";
import { computed, inject, shallowRef, useTemplateRef } from "vue";
import { onClickOutside, useEventListener } from "@vueuse/core";
import { Deleted, LauncherInstanceContextMenuItems, UnknownInstance } from "@/constants/launcher.ts";
import Image from "@/components/base/Image.vue";
import { useCurrentInstance } from "@/lib/stores/launcher/current-instance.ts";
import { useAllInstances } from "@/lib/stores/launcher/all-instances.ts";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";
import { TranslationsContextKey } from "@/constants/application.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);

const { instance, selectInstance } = defineProps<{
  "instance"      : LauncherInstanceType;
  "selectInstance": () => void;
}>();

const contextTarget = useTemplateRef<HTMLElement>("contextTarget");
const contextMenu = shallowRef<{
  "opened": boolean;
  "x"     : number;
  "y"     : number;
}>({
  "opened": false,
  "x"     : 0,
  "y"     : 0,
});

const currentInstanceStore = useCurrentInstance();
const allInstances = useAllInstances();

const closeContextMenu = () => {
  contextMenu.value = {
    ...contextMenu.value,
    "opened": false,
  };
};

onClickOutside(contextTarget, closeContextMenu);
useEventListener("contextmenu", (event: MouseEvent) => {
  if (
    event.target === null ||
    !("id" in event.target)
  ) {
    closeContextMenu();

    return;
  }

  if (event.target.id === `__context-menu-${instance.Id}`) {
    return;
  }

  if (event.target.id !== `__instance-selector-${instance.Id}`) {
    closeContextMenu();

    return;
  }

  selectInstance();

  contextMenu.value = {
    "x"     : event.offsetX,
    "y"     : event.offsetY,
    "opened": true,
  };
});

const actionStates: Record<
  typeof LauncherInstanceContextMenuItems[number]["Name"],
  () => void
> = {
  "launcher.launch": () => {
    currentInstanceStore.setLaunched(instance.Id);
    closeContextMenu();
  },
  "launcher.kill": () => {
    currentInstanceStore.setLaunched(undefined);
    closeContextMenu();
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
        if (mapping.Id !== instance.Id) {
          return mapping;
        }

        return {
          ...mapping,
          "Deleted": Deleted.Process,
        };
      });

    closeContextMenu();
  },
  "launcher.create-shortcut": () => {},
  "launcher.rename"         : () => {
    currentInstanceStore.setRenaming(instance.Id);
    closeContextMenu();
  },
  "launcher.change-icon": () => {},
};
const disableStates = computed((): Record<
  typeof LauncherInstanceContextMenuItems[number]["Name"],
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
      "launcher.rename"         : true,
      "launcher.change-icon"    : true,
    };
  }

  return {
    "launcher.launch"         : currentInstanceStore.launched === instance.Id,
    "launcher.kill"           : currentInstanceStore.launched !== instance.Id,
    "launcher.edit"           : true,
    "launcher.change-group"   : true,
    "launcher.folder"         : true,
    "launcher.export"         : true,
    "launcher.copy"           : true,
    "launcher.delete"         : false,
    "launcher.create-shortcut": true,
    "launcher.rename"         : false,
    "launcher.change-icon"    : true,
  };
});
</script>

<template>
  <div
    ref="contextTarget"
    :id="`__context-menu-${instance.Id}`"
    :class="[
        'absolute z-1000 flex flex-col cursor-default gap-1',
        'border border-[#181822] bg-catppuccin-900 p-1 transition-[opacity]',
        contextMenu.opened
          ? 'visible opacity-100'
          : 'invisible opacity-0',
      ]"
    :style="{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }"
  >
    <p class="pointer-events-none p-1 text-center text-nowrap text-[10px] text-[#9da3bd] sm:text-[13px]">
      {{ instance.Name }}
    </p>
    <button
      v-for="item in LauncherInstanceContextMenuItems"
      :key="item.Name"
      @click="actionStates[item.Name]"
      :disabled="disableStates[item.Name]"
      class="w-full flex items-center gap-3 rounded-md p-1 text-[#cdd6f4] transition-[background-color] disabled:cursor-default sm:gap-4 hover:bg-[#1d1a28] disabled:text-[#9298b6] disabled:transition-none disabled:hover:bg-transparent"
    >
      <span
        v-if="item.Icon"
        :class="['block h-[14px]', item.Icon]"
      />
      <Image
        v-else
        class-names="h-[14px]"
        :src="instance.Icon"
        :alt="`${instance.Name}'s icon`"
      />
      <span class="block text-nowrap text-[10px] sm:text-[13px]">
        {{ translations?.Messages?.[item.Name] }}
      </span>
    </button>
  </div>
</template>