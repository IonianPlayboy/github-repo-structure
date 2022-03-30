<template>
	<section class="px-4 py-5 text-lg sm:px-6">
		<template v-for="{ name, type, sha } in sortedContents">
			<RouterLink
				v-if="type === 'dir' || isSupported(name)"
				class="flex items-center space-x-3"
				:class="{ 'text-primary-pale': type === 'dir' }"
				:to="`${basePath}/${name.replaceAll('.', '%2E')}`"
				:key="`link-${sha}`"
			>
				<component class="h-5 w-5" :is="getCurrIcon(type)" />
				<span>{{ name }}</span>
			</RouterLink>
			<span
				v-else
				class="flex items-center space-x-3 text-gray-500"
				:key="sha"
			>
				<ArchiveIcon class="h-5 w-5" />
				<span>{{ name }}</span>
			</span>
		</template>
	</section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import type { ContentsItem } from "@/stores/repository";
import { insupportedExtensions } from "@/logic";

import {
	FolderIcon,
	DocumentTextIcon,
	ArchiveIcon,
} from "@heroicons/vue/outline";

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
const isSupported = (name: string) => {
	const extension = name.replace(/.*\.(?=\w+$)/, "");
	return !insupportedExtensions.includes(extension);
};
</script>
