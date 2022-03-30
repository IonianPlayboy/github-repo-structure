<template>
	<section
		class="px-4 py-5 text-lg"
		v-if="
			'message' in
			(repositoryStore.contentsForPath(repositoryStore.path) ?? {})
		"
	>
		No node found
	</section>
	<FilesTree
		v-else-if="isDir && contentsArray"
		:contents="contentsArray"
		:base-path="`/repos/${repositoryStore.fullPath}`"
	/>
	<SingleFile
		:file-name="repositoryStore.currNode"
		:contents="contentsObject"
		v-else
	/>
</template>

<script setup lang="ts">
import { useRepositoryStore, type ContentsItem } from "@/stores/repository";
import { computed } from "vue";

import FilesTree from "@/components/FilesTree.vue";
import SingleFile from "@/SingleFile.vue";

const repositoryStore = useRepositoryStore();

const contentsArray = computed(
	() =>
		repositoryStore.contentsForPath(
			repositoryStore.path
		) as Array<ContentsItem>
);

const contentsObject = computed(
	() => repositoryStore.contentsForPath(repositoryStore.path) as ContentsItem
);

const isDir = computed(
	() =>
		"length" in
		(repositoryStore.contentsForPath(repositoryStore.path) ?? {})
);
</script>
