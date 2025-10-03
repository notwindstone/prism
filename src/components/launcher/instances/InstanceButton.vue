<script setup lang="ts">
import type { LauncherInstanceType } from "@/types/launcher-instance.type.ts";
import { computed, ref, useTemplateRef } from "vue";
import Image from "@/components/base/Image.vue";
import { useCurrentInstance } from "@/lib/stores/launcher/current-instance.ts";
import { useAllInstances } from "@/lib/stores/launcher/all-instances.ts";
import { onClickOutside } from "@vueuse/core";
import InstanceContextMenu from "@/components/launcher/instances/InstanceContextMenu.vue";
import { UnknownInstance } from "@/constants/launcher.ts";

const { instance } = defineProps<{
  "instance": LauncherInstanceType;
}>();

const renamingValue = ref<string>(instance.Name);

const allInstancesStore = useAllInstances();
const currentInstanceStore = useCurrentInstance();
const currentInstance = computed(
  (): LauncherInstanceType => allInstancesStore
    .instances
    .find(
      searching => searching.Id === currentInstanceStore.id,
    ) ?? UnknownInstance,
);

const isBeingRenamed = computed(
  () => instance.Id === currentInstanceStore.renaming,
);
const isLaunched = computed(
  () => instance.Id === currentInstanceStore.launched,
);
const instanceIconFilters = computed(() => (
  instance.Name === currentInstance.value.Name ? "saturate-[200%] contrast-[20%] brightness-[125%]" : ""
));

const textareaTarget = useTemplateRef<HTMLElement>("textareaTarget");

onClickOutside(textareaTarget, () => {
  if (!isBeingRenamed.value) {
    return;
  }

  currentInstanceStore.setRenaming(undefined);

  if (renamingValue.value.trim() === "") {
    return;
  }

  allInstancesStore.rename(instance.Id, renamingValue.value);
});

function selectInstance() {
  currentInstanceStore.setCurrent(instance.Id);
}
function handleTextareaKeys(event: KeyboardEvent) {
  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();
  currentInstanceStore.setRenaming(undefined);

  if (renamingValue.value.trim() === "") {
    return;
  }

  allInstancesStore.rename(instance.Id, renamingValue.value);
}
function handleDoubleClick() {
  currentInstanceStore.setLaunched(instance.Id);
}
</script>

<template>
  <div class="relative">
    <InstanceContextMenu
      :instance="instance"
      :selectInstance="selectInstance"
    />
    <button
      :id="`__instance-selector-${instance.Id}`"
      @click="selectInstance"
      @dblclick="handleDoubleClick"
      class="h-fit w-25 flex flex-col items-center justify-start gap-2"
    >
      <span
        :class="[
          'i-fluent-play-circle-16-filled absolute right-0 top-0 block h-7 w-7 text-[#dcdff2]',
          isLaunched ? 'visible' : 'invisible',
        ]"
      />
      <Image
        :class-names="`pointer-events-none w-12 h-12 !transition-[opacity,filter] ${instanceIconFilters}`"
        :src="instance.Icon"
        :alt="`${instance.Name}'s instance icon`"
      />
      <textarea
        v-if="isBeingRenamed"
        ref="textareaTarget"
        @keydown="handleTextareaKeys"
        :placeholder="instance.Name"
        v-model="renamingValue"
        class="animated-accent-border w-25 resize-none border bg-[#0c0c13] px-[2px] text-center text-[10px] text-white outline-none transition-[border-color] duration-2000 ease-linear sm:text-[13px] focus:outline-none"
        autofocus
      />
      <span
        v-else
        :class="[
          'w-full break-words text-center text-[10px] text-white sm:text-[13px] relative',
          'animated-accent-before-background before:absolute before:opacity-60',
          'before:left-0 before:top-0 before:right-0 before:bottom-0',
          'before:transition-[background-color] before:duration-2000 before:ease-linear',
          currentInstance.Id === instance.Id
            ? 'before:content-empty'
            : 'bg-[#040407]',
        ]"
      >
        <span class="relative z-10">{{ instance.Name }}</span>
      </span>
    </button>
  </div>
</template>