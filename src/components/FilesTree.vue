<template>
	<section class="px-4 pb-5 text-lg sm:px-6">
		<RouterLink
			class="flex items-center space-x-3"
			v-for="{ name, type, sha } in sortedContents"
			:class="{ 'text-primary-pale': type === 'dir' }"
			:to="`${basePath}/${name.replaceAll('.', '%2E')}`"
			:key="sha"
		>
			<component class="h-5 w-5" :is="getCurrIcon(type)" />
			<span>{{ name }}</span>
		</RouterLink>
	</section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import type { ContentsItem } from "@/stores/repository";

import { FolderIcon, DocumentTextIcon } from "@heroicons/vue/outline";

const props = defineProps<{
	basePath: string;
	contents: Array<ContentsItem>;
}>();

const sortedContents = computed(() =>
	props.contents
		.map(({ _links, ...restOfEl }) => ({
			...restOfEl,
			_links: { ..._links },
		}))
		.sort((a, b) => {
			if (a.type === b.type) return a.name.localeCompare(b.name);
			return a.type === "dir" ? -1 : 1;
		})
);

const getCurrIcon = (type: ContentsItem["type"]) =>
	type === "dir" ? FolderIcon : DocumentTextIcon;
</script>
