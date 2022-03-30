<template>
	<section class="overflow-x-scroll px-4 py-5 text-lg sm:px-6">
		<div
			v-if="currHTML"
			v-html="currHTML"
			class="overflow-x-auto bg-[#22272e] px-8 py-4 text-base"
		></div>
		<div
			class="whitespace-pre bg-[#22272e] px-8 py-4 font-mono text-base"
			v-else-if="currText"
		>
			{{ currText }}
		</div>
		<div
			class="whitespace-pre bg-[#22272e] px-8 py-4 font-mono text-base"
			v-else
		>
			Loading...
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import type { ContentsItem } from "@/stores/repository";
import { getHighlighter, setWasm, setCDN, type Lang } from "shiki";

const props = defineProps<{
	fileName: string;
	contents: ContentsItem;
}>();

const currText = computed(() => atob(props.contents?.content ?? ""));
const currExtension = computed(() => {
	const splitedName = props.fileName.split(".");
	return splitedName[splitedName.length - 1];
});

watchEffect(() => console.log(currText.value));

const currHTML = ref("");

// NOTE: Necessary to make shiki work
// example => https://github.com/shikijs/shiki-playground

setWasm("/shiki/dist/onigasm.wasm");
setCDN("/shiki/");

watch(
	currText,
	async (newText) => {
		if (!newText) return;
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
