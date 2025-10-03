<script setup lang="ts">
import { LauncherTabs } from "@/constants/launcher.ts";
import { inject, shallowRef, useTemplateRef } from "vue";
import ProfileButton from "@/components/launcher/bars/ProfileButton.vue";
import { useCatPackState } from "@/lib/stores/launcher/cat-pack-state.ts";
import { onClickOutside } from "@vueuse/core";
import type { TranslationsKeyType } from "@/types/translations-key.type.ts";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";
import { TranslationsContextKey } from "@/constants/application.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);

const { barStates, toggleNews, toggleStatus, toggleInstance } = defineProps<{
  "barStates": {
    "news"    : boolean;
    "status"  : boolean;
    "instance": boolean;
  };
  "toggleNews"    : () => void;
  "toggleStatus"  : () => void;
  "toggleInstance": () => void;
}>();

const contextActions: Record<string, () => void> = {
  "news"    : toggleNews,
  "status"  : toggleStatus,
  "instance": toggleInstance,
};
const contextTranslations: Record<string, TranslationsKeyType> = {
  "news"    : "launcher.news-toggle",
  "status"  : "launcher.status-toggle",
  "instance": "launcher.instance-toggle",
};

const catStore = useCatPackState();
const contextMenu = shallowRef<{
  "opened": boolean;
  "x"     : number;
  "y"     : number;
}>({
  "opened": false,
  "x"     : 0,
  "y"     : 0,
});
const target = useTemplateRef<HTMLElement>("target");

onClickOutside(target, () => {
  contextMenu.value = {
    ...contextMenu.value,
    "opened": false,
  };
});

function handleRightClick(event: MouseEvent): void {
  contextMenu.value = {
    "x"     : event.offsetX,
    "y"     : event.offsetY,
    "opened": true,
  };
}
</script>

<template>
  <div
    @contextmenu="handleRightClick"
    class="h-fit w-full flex justify-between bg-catppuccin-900 p-[10px]"
  >
    <div
      @contextmenu.stop
      @contextmenu.prevent
      ref="target"
      id="__menu-bar-context-menu"
      :class="[
        'absolute z-1000 flex flex-col cursor-default gap-1',
        'border border-[#181822] bg-catppuccin-900 p-1 transition-[opacity]',
        contextMenu.opened
          ? 'visible opacity-100'
          : 'invisible opacity-0',
      ]"
      :style="{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }"
    >
      <button
        v-for="[key, value] in Object.entries(barStates)"
        @click="contextActions[key]"
        :key="key"
        class="w-full flex flex-nowrap gap-3 rounded-md p-1 transition-[background-color] sm:gap-4 hover:bg-[#1d1a28]"
      >
        <span
          :class="[
            'h-4 min-w-4 flex border border-[#606060] rounded-md sm:h-[18px] sm:min-w-[18px]',
            value && 'border-transparent',
          ]"
        >
          <span v-show="value" class="animated-accent-background block h-full w-full rounded-md transition-[background-color] duration-2000 ease-linear" />
          </span>
        <span class="block text-nowrap text-[10px] text-[#cdd6f4] sm:text-[13px]">
          {{ translations?.Messages?.[contextTranslations[key]] }}
        </span>
      </button>
    </div>
    <div class="flex flex-wrap items-stretch gap-2">
      <div class="animated-accent-background w-[5px] cursor-move rounded-full transition-[background-color] duration-2000 ease-linear" />
      <button
        @click="catStore.toggle"
        v-for="tab in LauncherTabs"
        :key="tab.Icon"
        :disabled="tab?.Disabled"
        :aria-label="tab?.Name === undefined && catStore.enabled ? 'Cat Pack toggle button' : undefined"
        :class="[
          'group min-h-8 flex items-center gap-1 rounded-md px-1 py-1 transition-[background-color] ease-out',
          'sm:min-h-10 sm:px-2 sm:py-0 hover:bg-[#211e2f] active:bg-[#171721]',
          'disabled:text-[#9298b6] disabled:transition-none disabled:pointer-events-none',
          'disabled:hover:bg-transparent disabled:active:bg-transparent',
          // Check if the button is a Cat Pack button
          tab?.Name === undefined && catStore.enabled && 'bg-[#211e2f]',
        ]"
      >
        <span class="block min-w-6">
          <span :class="[
            'block h-4 sm:h-8 w-6',
            tab?.Icon,
          ]" />
        </span>
        <span
          v-if="tab?.Name"
          class="block text-nowrap text-[10px] text-[#cdd6f4] sm:text-[13px] group-disabled:text-[#9298b6]"
        >
            {{ translations?.Messages?.[tab.Name] }}
          </span>
      </button>
    </div>
    <ProfileButton />
  </div>
</template>