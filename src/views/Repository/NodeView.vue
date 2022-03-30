<template>
	<section class="px-4 py-5 text-lg" v-if="'message' in (contents ?? {})">
		No node found
	</section>
	<FilesTree
		v-else-if="isDir && contents"
		:contents="contents"
		:base-path="`/repos/${repositoryStore.fullPath}`"
	/>
	<section class="px-4 py-5 text-lg" v-else>
		{{ repositoryStore.path }}
	</section>
</template>

<script setup lang="ts">
import { useRepositoryStore, type ContentsItem } from "@/stores/repository";
import { computed } from "vue";

import FilesTree from "@/components/FilesTree.vue";

const repositoryStore = useRepositoryStore();

const contents = computed(
	() =>
		repositoryStore.contentsForPath(
			repositoryStore.path
		) as Array<ContentsItem>
);

const isDir = computed(() => "length" in (contents.value ?? {}));
</script>
