<script setup lang="ts">
import { useAllInstances } from "@/lib/stores/launcher/all-instances.ts";
import { computed, inject, provide, ref } from "vue";
import { Deleted, UnknownInstance } from "@/constants/launcher.ts";
import type { LauncherInstanceType } from "@/types/launcher-instance.type.ts";
import { LauncherModalContextKey, TranslationsContextKey } from "@/constants/application.ts";
import type { ContextLauncherType } from "@/types/context-launcher.type.ts";
import { useCurrentInstance } from "@/lib/stores/launcher/current-instance.ts";
import LauncherModal from "@/components/launcher/modals/LauncherModal.vue";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);

const allInstances = useAllInstances();
const currentInstanceStore = useCurrentInstance();
const deletingInstance = computed((): LauncherInstanceType | undefined => {
  return allInstances
    .instances
    .find(searching => searching.Deleted === Deleted.Process);
});

function deleteInstance() {
  if (deletingInstance.value === undefined) {
    return;
  }

  currentInstanceStore.setCurrent(UnknownInstance.Id);
  allInstances.delete(deletingInstance.value.Id);
}
function close() {
  allInstances.instances = allInstances
    .instances
    .map(mapping => {
      if (mapping.Id !== deletingInstance.value?.Id) {
        return mapping;
      }

      return {
        ...mapping,
        "Deleted": Deleted.No,
      };
    });
}

const actions = [
  { "name": "launcher.yes", "action": deleteInstance },
  { "name": "launcher.no", "action": close },
] as const;

provide<ContextLauncherType>(LauncherModalContextKey, {
  close,
  "title"    : computed(() => (translations?.value?.Messages?.["launcher.confirm-deletion.title"] ?? "")),
  "maximized": ref<boolean>(false),
  "maximize" : () => {},
  "minimize" : () => {},
});
</script>

<template>
  <LauncherModal
    only-close-button
    :context-key="LauncherModalContextKey"
    :opened="deletingInstance !== undefined"
  >
    <div class="flex flex-col gap-4 rounded-b-md px-[6px] pb-[6px] pt-[2px] text-xs text-[#cdd6f4] sm:px-2 sm:pb-2 sm:text-sm">
      <div class="whitespace-pre-wrap">
        {{
          translations?.Messages?.["launcher.confirm-deletion.description"]
            ?.replace?.("%s", deletingInstance?.Name ?? "")
        }}
      </div>
      <div class="flex items-center justify-end gap-2">
        <button
          v-for="button in actions"
          :key="button.name"
          @click="button.action"
          class="grid h-7 w-14 place-items-center rounded-md bg-[#1e1c2a] transition-[background-color] hover:bg-[#2e283e]"
        >
          {{ translations?.Messages?.[button.name] }}
        </button>
      </div>
    </div>
  </LauncherModal>
</template>