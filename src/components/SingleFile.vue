<template>
	<section class="px-4 py-5 text-sm sm:px-6 md:text-base">
		<div
			class="whitespace-pre bg-[#22272e] px-8 py-4 font-mono"
			v-if="!isSupported"
		>
			An error occurred. :c
		</div>
		<div
			v-else-if="currHTML"
			v-html="currHTML"
			class="overflow-auto rounded bg-[#22272e] px-8 py-4"
		></div>
		<div
			class="overflow-auto whitespace-pre rounded bg-[#22272e] px-8 py-4 font-mono"
			v-else-if="currText"
		>
			{{ currText }}
		</div>
		<div class="bg-[#22272e] px-8 py-4 font-mono" v-else>Loading...</div>
	</section>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import type { ContentsItem } from "@/stores/repository";
import {
	getHighlighter,
	setWasm,
	setCDN,
	type Lang,
	BUNDLED_LANGUAGES,
} from "shiki";
import { insupportedExtensions } from "@/logic";

const props = defineProps<{
	fileName: string;
	contents: ContentsItem;
}>();

const currText = computed(() => atob(props.contents?.content ?? ""));
const currExtension = computed(
	() => props.fileName?.replace(/.*\.(?=\w+$)/, "") ?? ""
);
const isSupported = computed(
	() => !insupportedExtensions.includes(currExtension.value)
);

watchEffect(() => console.log(currText.value));

const currHTML = ref("");

// NOTE: Necessary to make shiki work
// example => https://github.com/shikijs/shiki-playground

setWasm("/shiki/dist/onigasm.wasm");
setCDN("/shiki/");

const isCompatibleWithShiki = computed(() =>
	BUNDLED_LANGUAGES.some(
		({ id, scopeName }) =>
			id === currExtension.value ||
			scopeName.replace(/.*\.(?=\w+$)/, "") === currExtension.value
	)
);

watch(
	currText,
	async (newText) => {
		if (!newText || !isCompatibleWithShiki.value) return;
		const highlighter = await getHighlighter({
			theme: "github-dark-dimmed",
			langs: [currExtension.value as Lang],
		});
		currHTML.value = highlighter.codeToHtml(newText, {
			lang: currExtension.value as Lang,
		});
	},
	{ immediate: true }
);
</script>
