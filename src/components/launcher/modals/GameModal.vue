<script setup lang="ts">
import { LauncherModalEmbedContextKey } from "@/constants/application.ts";
import LauncherModal from "@/components/launcher/modals/LauncherModal.vue";
import { useCurrentInstance } from "@/lib/stores/launcher/current-instance.ts";
import { computed, provide, ref } from "vue";
import { EaglerCraftID, EaglerCraftNewestID, EaglerCraftNewID } from "@/constants/launcher.ts";
import type { ContextLauncherType } from "@/types/context-launcher.type.ts";
import { useAllInstances } from "@/lib/stores/launcher/all-instances.ts";

const allInstances = useAllInstances();
const currentInstanceStore = useCurrentInstance();
const areEmbeds = computed(
  (): boolean => (
    currentInstanceStore.launched === EaglerCraftID ||
    currentInstanceStore.launched === EaglerCraftNewID ||
    currentInstanceStore.launched === EaglerCraftNewestID
  ));
const currentEmbed = computed((): string => {
  switch (currentInstanceStore.launched) {
    case EaglerCraftID: {
      return "https://sd592g.github.io/zj684od4lfg/";
    }
    case EaglerCraftNewID: {
      return "https://eaglercraft.org/";
    }
    case EaglerCraftNewestID: {
      return "https://autopilot-tesla.github.io/eaglercraftx1-8.github.io/eagler-files/1.12/Main/index.html";
    }
    default: {
      return "";
    }
  }
});

const maximized = ref<boolean>(false);

function close() {
  currentInstanceStore.setLaunched(undefined);
}

provide<ContextLauncherType>(LauncherModalEmbedContextKey, {
  close,
  "title": computed(() => (
    allInstances
      .instances
      .find(searching => searching.Id === currentInstanceStore.launched)
      ?.Name ?? "Embedded Minecraft"
  )),
  "maximized": maximized,
  "maximize" : () => {
    maximized.value = !maximized.value;
  },
  "minimize": close,
});
</script>

<template>
  <!-- We dynamically render it so that embeds will not load before necessary -->
  <LauncherModal
    v-if="areEmbeds"
    :maximized="maximized"
    :context-key="LauncherModalEmbedContextKey"
    opened
  >
    <iframe
      :class="[
        !maximized && 'aspect-video max-w-[calc(100vw-128px)] w-256'
      ]"
      width="100%"
      height="100%"
      :src="currentEmbed"
    />
  </LauncherModal>
</template>