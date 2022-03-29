<template>
	<FilesTree
		v-if="contents"
		:base-path="
			encodeURI(`/repos/${repositoryStore.owner}/${repositoryStore.repo}`)
		"
		:contents="contents"
	/>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRepositoryStore, type ContentsItem } from "@/stores/repository";

import FilesTree from "@/components/FilesTree.vue";

const repositoryStore = useRepositoryStore();

const contents = computed(
	() => repositoryStore.contentsForPath("/") as Array<ContentsItem>
);
</script>
