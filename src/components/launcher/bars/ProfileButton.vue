<script setup lang="ts">
import { inject, ref, useTemplateRef, watchEffect } from "vue";
import { TranslationsContextKey } from "@/constants/application.ts";
import { LauncherMenuBarProfiles } from "@/constants/launcher.ts";
import { onClickOutside, useMagicKeys } from "@vueuse/core";
import Image from "@/components/base/Image.vue";
import type { TranslationsKeyType } from "@/types/translations-key.type.ts";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);

const opened = ref<boolean>(false);
const currentProfile = ref<{ "Name": TranslationsKeyType; "Skin"?: string }>({
  "Name": LauncherMenuBarProfiles[0].Name,
  "Skin": LauncherMenuBarProfiles[0]?.Image,
});

const target = useTemplateRef<HTMLElement>("target");

const keys = useMagicKeys();

function toggleDropdown():void {
  opened.value = !opened.value;
}
function select(profile: { "Name": TranslationsKeyType; "Image"?: string }): void {
  currentProfile.value = {
    "Name": profile.Name,
    "Skin": profile?.Image,
  };
  opened.value = false;
}

onClickOutside(target, event => {
  // Don't close dropdown if target element was a dropdown toggle button
  if (event.target === null || !("id" in event.target) || event.target.id === "__profile-selector") {
    return;
  }

  opened.value = false;
});
watchEffect(() => {
  if (!keys["control"].value || !keys["0"].value) {
    return;
  }

  currentProfile.value = {
    "Name": "launcher.no-default-account",
    "Skin": "/skins/monochrome_steve.png",
  };
});
</script>

<template>
  <div class="relative">
    <div
      ref="target"
      :class="[
        'absolute right-0 top-12 z-1000 flex flex-col gap-2 max-w-[calc(100vw-64px)]',
        'border border-[#181822] bg-catppuccin-900 p-1 transition-[opacity]',
        opened ? 'opacity-100 visible' : 'opacity-0 invisible',
      ]"
    >
      <button
        v-for="profile in LauncherMenuBarProfiles"
        @click="() => select(profile)"
        :key="profile.Name"
        :disabled="profile?.Note === undefined"
        class="group flex items-center gap-2 rounded-md p-1 transition-[background-color] sm:gap-4 disabled:bg-transparent hover:bg-[#1d1a28] disabled:transition-none"
      >
        <span v-if="profile?.Icon" :class="['block h-4', profile.Icon]" />
        <Image
          v-if="profile?.Image"
          :src="profile.Image"
          :alt="`${profile.Name}'s skin avatar`"
          class-names="h-4"
        />
        <span class="block w-80 flex items-center justify-between gap-2">
          <span class="block text-nowrap text-[10px] text-[#cdd6f4] sm:text-[13px] group-disabled:text-[#939ab8]">
            {{ translations?.Messages?.[profile.Name] }}
          </span>
          <span v-if="profile?.Note" class="block text-nowrap text-[10px] text-[#cdd6f4] sm:text-[13px]">
            {{ translations?.Messages?.[profile.Note] }}
          </span>
        </span>
      </button>
    </div>
    <button id="__profile-selector" @click="toggleDropdown" class="h-full w-full flex flex flex-wrap items-center justify-center gap-2 rounded-md px-2 transition-[background-color] sm:flex-nowrap sm:justify-normal focus:bg-[#171721] hover:bg-[#211e2f]">
      <Image
        class-names="h-5 sm:h-6"
        :src="currentProfile?.Skin ?? '/skins/monochrome_steve.png'"
        :alt="`${translations?.Messages?.[currentProfile.Name]}'s skin avatar`"
      />
      <span class="block break-all text-[10px] text-[#cdd6f4] sm:text-[13px]">
        {{
          translations?.Messages?.[
            currentProfile.Name === "launcher.no-default-account"
              ? "launcher.accounts"
              : currentProfile.Name
          ]
        }}
      </span>
    </button>
  </div>
</template>