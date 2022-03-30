<template>
	<FilesTree
		v-if="contents"
		:base-path="`/repos/${owner}/${repo}`.replace('.', '%2E')"
		:contents="contents"
	/>
</template>

<script setup lang="ts">
import type { ContentsItem } from "@/stores/repository";

import FilesTree from "@/components/FilesTree.vue";

defineProps<{
	owner: string;
	repo: string;
	contents: Array<ContentsItem>;
}>();
</script>
