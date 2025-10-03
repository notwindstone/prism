<script setup lang="ts">
import Image from "@/components/base/Image.vue";
import { inject, onMounted, onUnmounted, provide, ref, shallowRef } from "vue";
import { useIntervalFn } from "@vueuse/core";
import { WebTerm } from "web-term-ui";
import LinuxHeader from "@/components/launcher/headers/LinuxHeader.vue";
import {
  DesktopTerminalContextKey,
  TranslationsContextKey,
  TranslationsSelectorContextKey,
} from "@/constants/application.ts";
import type { ContextLauncherType } from "@/types/context-launcher.type.ts";
import DesktopMenu from "@/components/launcher/desktop/DesktopMenu.vue";
import { UAParser } from "ua-parser-js";
import { getPlatformName } from "@/lib/helpers/get-platform-name.ts";
import { executeTerminalCommand } from "@/lib/helpers/execute-terminal-command.ts";
import type { TranslationsSelectorType } from "@/types/translations-selector.type.ts";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";

const { open } = defineProps<{
  "open": () => void;
}>();

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);
const selectTranslations = inject<TranslationsSelectorType>(TranslationsSelectorContextKey);

const { os, browser, engine } = UAParser(navigator.userAgent);
const platform = getPlatformName(os?.name);

const currentDate = ref<Date>(new Date);
const editor = shallowRef<{
  "opened": boolean;
  "quit"  : () => void;
  "save"  : () => void;
}>({
  "opened": false,
  "quit"  : () => {},
  "save"  : () => {},
});

const { pause } = useIntervalFn(() => {
  currentDate.value = new Date;
}, 1000);

const apps = ref<{
  "kde"     : boolean;
  "terminal": boolean;
}>({
  "kde"     : false,
  "terminal": false,
});

const closeTerminal = ref<() => void>(() => {
  apps.value.terminal = false;
});

onUnmounted(pause);
onMounted(() => {
  const term = new WebTerm({
    "title": "Welcome to " +
      "<span class='" +
      "animated-accent-text transition-[color] duration-2000 ease-linear brightness-70 underline" +
      "'>" +
      "Freesm 1.0 LTS" +
      "</span> (GNU/Linux 6.8.0-36-generic x86_64)\n* help",
    "titleHtml": true,
    "container": "#__web-terminal",
    "header"   : "$ ",
    "style"    : {
      "background"         : "transparent",
      "color"              : "#000000",
      "selectionColor"     : "#ffffff",
      "selectionBackground": "#000000",
      "fontSize"           : window.innerWidth <= 640
        ? 11
        : 14,
    },
  });

  closeTerminal.value = () => {
    apps.value.terminal = false;
    setTimeout(() => {
      term.clearTerminal();
      term.display.pushContent("Welcome to " +
        "<span class='" +
        "animated-accent-text transition-[color] duration-2000 ease-linear brightness-70 underline" +
        "'>" +
        "Freesm 1.0 LTS" +
        "</span> (GNU/Linux 6.8.0-36-generic x86_64)\n* help", true);
    }, 300);
  };

  term.on("tab", () => {
    term.insertText("    ");
  });
  term.on("enter", command => executeTerminalCommand({
    command,
    term,
    "platform": platform.toLowerCase(),
    "browser" : browser?.toString?.()?.toLowerCase?.() ?? "unknown",
    "engine"  : engine?.name?.toLowerCase?.() ?? "unknown",
    "close"   : () => apps.value.terminal = false,
    "onEditor": (state: {
      "opened": boolean;
      "quit"  : () => void;
      "save"  : () => void;
    }) => {
      editor.value = state;
    },
    "locale"         : translations?.value?.Info?.Code ?? "en",
    "setTranslations": selectTranslations ?? (() => {}),
  }));
  // for mobile phones
  term.on("input", command => {
    if (!command.endsWith("\n")) {
      return;
    }

    executeTerminalCommand({
      term,
      // since 'command' contains '\n', we need to remove it (it counts as two chars)
      "command" : command.slice(0, -1),
      "platform": platform.toLowerCase(),
      "browser" : browser?.toString?.()?.toLowerCase?.() ?? "unknown",
      "engine"  : engine?.name?.toLowerCase?.() ?? "unknown",
      "close"   : () => apps.value.terminal = false,
      "onEditor": (state: {
        "opened": boolean;
        "quit"  : () => void;
        "save"  : () => void;
      }) => {
        editor.value = state;
      },
      "locale"         : translations?.value?.Info?.Code ?? "en",
      "setTranslations": selectTranslations ?? (() => {}),
    });
  });
});

provide<ContextLauncherType>(DesktopTerminalContextKey, {
  "maximized": ref<boolean>(false),
  "close"    : closeTerminal,
  "title"    : "Terminal",
  "maximize" : () => {},
  "minimize" : () => {},
});
</script>

<template>
  <div>
    <Image
      class-names="absolute left-0 top-0 right-0 bottom-0 brightness-70 h-full w-full object-cover"
      src="/assets/plasma-6.jpeg"
      alt="Plasma 6 default wallpapers"
    />
    <button
      aria-label="Open Freesm Launcher"
      @dblclick="open"
      class="absolute left-2 top-2 h-24 w-24 flex flex-col items-center justify-center gap-2 border border-transparent rounded-md focus:border-white focus:bg-[theme(colors.white/.4)]"
    >
      <Image
        class-names="h-12 w-12 drop-shadow-md"
        src="/favicon.webp"
        alt="Freesm Launcher logo"
      />
      <span class="block max-w-12 text-center text-xs font-semibold leading-none text-shadow-xl">
        Freesm Launcher
      </span>
    </button>
    <div class="absolute bottom-2 left-2 right-2 h-12 flex justify-between rounded-lg bg-[#eff0f1] text-black">
      <div class="h-full flex flex-nowrap items-center gap-0">
        <button
          id="__kde-menu-opener"
          aria-label="Open KDE menu"
          @click="() => apps.kde = !apps.kde"
          :class="[
            'relative grid h-12 w-14 place-items-center',
            'before:absolute before:left-[25%] before:top-0',
            'before:h-1 before:w-[50%] before:content-empty',
            'animated-accent-before-background before:ease-[linear,in-out]',
            'before:transition-[background-color,width] before:duration-[2000ms,300ms]',
            apps.kde ? 'before:visible' : 'before:invisible',
          ]"
        >
          <span class="i-simple-icons-kdeplasma pointer-events-none block h-6 w-6" />
        </button>
        <button
          @click="() => apps.terminal = !apps.terminal"
          :class="[
            'relative grid h-12 w-14 place-items-center',
            'before:absolute before:left-[25%] before:top-0',
            'before:h-1 before:w-[50%] before:content-empty',
            'animated-accent-before-background before:ease-[linear,in-out]',
            'before:transition-[background-color,width] before:duration-[2000ms,300ms]',
            apps.terminal ? 'before:visible' : 'before:invisible',
          ]"
        >
          <span class="i-lucide-terminal block h-8 w-8" />
        </button>
      </div>
      <div class="h-full flex flex-nowrap items-center gap-2">
        <div class="flex flex-col select-text items-center gap-0 px-4">
          <p class="text-sm font-semibold">
            {{ currentDate.toLocaleTimeString() }}
          </p>
          <p class="text-xs">
            {{ currentDate.toLocaleDateString() }}
          </p>
        </div>
      </div>
    </div>
    <Transition css name="slide-fade">
      <div
        v-show="apps.terminal"
        class="absolute left-[5%] top-[20%] h-[60%] w-[90%] flex flex-col gap-0 rounded-md bg-[#eff0f1] sm:left-[calc(50%-272px)] sm:top-[calc(50%-204px)] sm:h-102 sm:w-136"
      >
        <LinuxHeader
          only-close-button
          invert-colors
          :context-key="DesktopTerminalContextKey"
        />
        <div v-show="editor.opened" class="w-full flex flex-nowrap bg-white text-black font-[Menlo,Monaco,'Courier_New',monospace]">
          <button @click="editor.save" class="w-fit px-2 text-[11px] hover:bg-[#eff0f1] sm:text-[14px]">
            Save
          </button>
          <button @click="editor.quit" class="w-fit px-2 text-[11px] hover:bg-[#eff0f1] sm:text-[14px]">
            Quit
          </button>
        </div>
        <div id="__web-terminal" class="h-full" />
      </div>
    </Transition>
    <Transition name="slide-fade">
      <DesktopMenu
        :open="open"
        :close-menu="() => apps.kde = false"
        v-show="apps.kde"
      />
    </Transition>
  </div>
</template>