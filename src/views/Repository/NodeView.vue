<template>
	<section class="px-4 py-5 text-lg sm:px-6">
		<template v-if="loading">Loading...</template>
		<template v-else-if="error === 'Not Found'">
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
		</template>
		<template v-else-if="error">
			<AlertUi type="error">
				<template #title>
					An error occured while fetching the repository
				</template>
				<template #default>
					{{ error }}
				</template>
			</AlertUi>
		</template>

		<FilesTree
			v-else-if="Array.isArray(contents)"
			:contents="contents"
			:base-path="`/repos/${fullPath}`"
		/>
		<SingleFile :file-name="currNode" :contents="contents" v-else />
	</section>
</template>

<script setup lang="ts">
import type { ContentsItem } from "@/stores/repository";

import FilesTree from "@/components/FilesTree.vue";
import SingleFile from "@/components/SingleFile.vue";
import AlertUi from "@/components/AlertUi.vue";

defineProps<{
	error: any;
	loading: boolean;
	owner: string;
	repo: string;
	contents: ContentsItem | Array<ContentsItem>;
	fullPath: string;
	currNode: string;
}>();
</script>
