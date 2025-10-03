<script setup lang="ts">
import { FreesmIssues, TranslationsContextKey } from "@/constants/application.ts";
import { inject, ref } from "vue";
import Image from "@/components/base/Image.vue";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);

const maximized = ref<{
  "Link": string;
  "Text": string;
} | undefined>(undefined);
</script>

<template>
  <div class="mx-auto my-12 max-w-240 flex flex-col gap-4 px-4">
    <template v-for="issue in FreesmIssues" :key="issue.Name">
      <p class="select-text text-xl text-white font-semibold sm:text-3xl">
        {{ translations?.Messages?.[issue.Name] }}
      </p>
      <div
        v-if="issue.Images.length > 0"
        class="grid cols-1 gap-4 sm:cols-2"
      >
        <Image
          @click="maximized = image"
          v-for="image in issue.Images"
          :key="image.Text"
          :src="image.Link"
          :alt="image.Text"
          class-names="h-full object-cover rounded-md cursor-zoom-in !transition-[opacity,filter] hover:brightness-70"
        />
      </div>
      <div
        v-html="translations?.Messages?.[issue.Description]"
        class="select-text whitespace-pre-wrap pb-4 text-justify text-gray-300 sm:text-lg"
      ></div>
    </template>
    <Teleport to="body">
      <div
        @click="maximized = undefined"
        v-if="maximized !== undefined"
        class="fixed bottom-0 left-0 right-0 top-0 z-60000 flex items-center justify-center p-8 bg-[theme(colors.black/.7)]"
      >
        <Image
          class-names="select-none max-h-full cursor-zoom-out"
          :src="maximized?.Link"
          :alt="maximized?.Text"
        />
      </div>
    </Teleport>
  </div>
</template>