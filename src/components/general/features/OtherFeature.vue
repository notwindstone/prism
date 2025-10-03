<script setup lang="ts">
import Image from "@/components/base/Image.vue";
import { useCurrentInstance } from "@/lib/stores/launcher/current-instance.ts";
import { computed } from "vue";
import { useAllInstances } from "@/lib/stores/launcher/all-instances.ts";
import { useInterval } from "@vueuse/core";

const currentInstanceStore = useCurrentInstance();
const allInstancesStore = useAllInstances();
const currentInstance = computed(
  (): { "Version": string } => allInstancesStore
    .instances
    .find(
      searching => searching.Id === currentInstanceStore.launched,
    ) ?? { "Version": "" },
);

const { "counter": seconds, pause, resume, isActive } = useInterval(1000, {
  "controls": true,
});
const playtime = computed(() => {
  const minutes = Math.floor(seconds.value / 60);
  const secondsRemaining = seconds.value % 60;
  const formattedSeconds = secondsRemaining < 10
    ? `0${secondsRemaining}`
    : secondsRemaining;

  return { minutes, formattedSeconds };
});

function toggle() {
  if (isActive.value) {
    pause();

    return;
  }

  resume();
}
</script>

<template>
  <div class="w-full flex flex-1 rounded-md bg-catppuccin-900 p-4 lg:w-auto">
    <div class="w-full flex flex-col gap-4 rounded-md bg-[#16161f] p-4">
      <div class="w-full flex items-center justify-between">
        <p class="font-semibold leading-none sm:text-lg">
          Playing
        </p>
        <button
          aria-label="Toggle Discord RPC"
          @click="toggle"
        >
          <span :class="['block size-4 sm:size-5', isActive ? 'i-lucide-pause' : 'i-lucide-play']" />
        </button>
      </div>
      <div class="flex flex-nowrap gap-4">
        <Image
          class-names="size-20 sm:size-22"
          src="/favicon.webp"
          alt=""
        />
        <div class="w-full flex flex-col justify-between">
          <div class="flex flex-col">
            <p class="select-text text-lg font-semibold sm:text-xl">
              FreesmLauncher
            </p>
            <p class="select-text sm:text-lg">
              {{ `Minecraft ${currentInstance.Version}`?.trim?.() }}
            </p>
          </div>
          <div class="flex flex-nowrap items-center gap-2">
            <div class="i-lucide-gamepad-2 animated-accent-text size-5 transition-[color] duration-2000 ease-linear sm:size-6" />
            <p class="animated-accent-text select-text font-semibold transition-[color] duration-2000 ease-linear sm:text-lg">
              {{ playtime.minutes }}:{{ playtime.formattedSeconds }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>