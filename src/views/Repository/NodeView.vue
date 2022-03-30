<template>
	<section class="px-4 py-5 text-lg" v-if="loading">Loading...</section>
	<section
		class="px-4 py-5 text-lg"
		v-else-if="'message' in (contents ?? {})"
	>
		<div class="px-8 py-4">
			<AlertUi type="warning">
				<template #title> No file or folder found</template>

				We could not find a file or a folder corresponding to
				<span class="bg-orange-800/20 px-1 font-mono">
					{{ currNode }}
				</span>
				<p class="mt-1 text-xs text-yellow-500">
					(full path :
					<span class="bg-orange-800/20 px-1 font-mono"
						>{{ fullPath }}
					</span>
					)
				</p>
			</AlertUi>
		</div>
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
import AlertUi from "@/components/AlertUi.vue";

defineProps<{
	loading: boolean;
	owner: string;
	repo: string;
	contents: ContentsItem | Array<ContentsItem>;
	fullPath: string;
	currNode: string;
}>();
</script>
