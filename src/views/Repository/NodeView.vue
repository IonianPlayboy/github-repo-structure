<template>
	<section class="px-4 py-5 text-lg" v-if="'message' in (contents ?? {})">
		No node found
	</section>
	<FilesTree
		v-else-if="Array.isArray(contents)"
		:contents="contents"
		:base-path="`/repos/${fullPath}`"
	/>
	<SingleFile :file-name="currNode" :contents="contents" v-else />
</template>

<script setup lang="ts">
import type { ContentsItem } from "@/stores/repository";

import FilesTree from "@/components/FilesTree.vue";
import SingleFile from "@/components/SingleFile.vue";

defineProps<{
	owner: string;
	repo: string;
	contents: ContentsItem | Array<ContentsItem>;
	fullPath: string;
	currNode: string;
}>();
</script>
