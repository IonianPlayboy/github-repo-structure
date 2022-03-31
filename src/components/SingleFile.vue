<template>
	<AlertUi v-if="!isSupported" type="warning">
		<template #title> File format not supported</template>

		We can not display the content of a file with the
		<span class="bg-orange-800/20 px-1 font-mono">
			.{{ currExtension }}
		</span>
		extension at the moment.
	</AlertUi>
	<div
		v-else-if="currHTML"
		v-html="currHTML"
		class="overflow-auto rounded bg-[#22272e] px-8 py-4 text-sm shadow md:text-base"
	></div>
	<div
		class="overflow-auto whitespace-pre rounded bg-[#22272e] px-8 py-4 font-mono text-sm shadow md:text-base"
		v-else
	>
		{{ currText }}
	</div>
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

import AlertUi from "@/components/AlertUi.vue";

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
