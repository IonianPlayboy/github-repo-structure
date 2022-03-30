<template>
	<MainWrapper>
		<div
			class="mt-8 overflow-hidden bg-gradient-to-b from-gray-800/80 via-slate-800/80 to-gray-800/80 shadow sm:w-10/12 sm:min-w-[640px] sm:rounded-lg"
		>
			<div class="px-4 py-5 sm:px-6">
				<h3
					class="flex flex-wrap items-end whitespace-nowrap border-b border-slate-700 pb-5 text-xl font-medium leading-6 text-gray-100"
				>
					<span class="text-primary">{{ owner }}</span
					><span class="mx-1 text-primary-dark">/</span
					><RouterLink
						:to="`/repos/${owner}/${repo}`"
						:class="{
							'animate-gradient from-teal-300 via-indigo-500 to-primary-lighter':
								!nodes.length,
							'from-primary-light to-primary-dark': nodes.length,
						}"
						class="bg-gradient-to-r bg-[length:400%_400%] bg-clip-text text-transparent"
						>{{ repo }}</RouterLink
					><template v-for="(item, i) in nodes" :key="`node_${item}`">
						<ChevronRightIcon
							class="h-5 w-5 text-primary"
						/><RouterLink
							:to="`/repos/${owner}/${repo}/${nodes
								.slice(0, i + 1)
								.join('/')}`"
							:class="{
								'animate-gradient from-teal-300 via-indigo-500 to-primary-lighter':
									i === nodes.length - 1,
								'from-primary-light to-primary-dark':
									i !== nodes.length - 1,
							}"
							class="bg-gradient-to-r bg-[length:400%_400%] bg-clip-text text-transparent"
							>{{ item }}</RouterLink
						>
					</template>
				</h3>
			</div>
			<RouterView
				:owner="owner"
				:repo="repo"
				:contents="currentContents"
				:full-path="fullPath"
				:curr-node="currNode"
			/>
		</div>
	</MainWrapper>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import {
	onBeforeRouteUpdate,
	RouterLink,
	RouterView,
	useRoute,
} from "vue-router";
import { useFetch } from "@vueuse/core";
import { useRepositoryStore, type ContentsItem } from "@/stores/repository";

import { ChevronRightIcon } from "@heroicons/vue/outline";
import MainWrapper from "@/components/atoms/MainWrapper.vue";
import { storeToRefs } from "pinia";

const store = useRepositoryStore();
const { owner, repo, path, nodes, currentContents, fullPath, currNode } =
	storeToRefs(store);
const {
	setOwner,
	setRepositoryName,
	setPath,
	contentsForPath,
	setContentsForPath,
} = store;
const route = useRoute();

const repositoryUrl = computed(
	() => `https://github.com/${owner.value}/${repo.value}`
);
const requestUrl = computed(
	() =>
		`${repositoryUrl.value.replace(
			"github.com",
			"api.github.com/repos"
		)}/contents${path.value ? "/" + path.value : ""}`
);
const { isFetching, error, data, execute } = useFetch(
	requestUrl,
	{
		headers: {
			// NOTE: Required to use the GitHub API
			// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#user-agent-required
			"User-Agent": "IonianPlayboy",
			// NOTE: Strongly recommended to use the GitHub API
			// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#current-version
			Accept: "application/vnd.github.v3+json",
			Authorization: import.meta.env.VITE_GITHUB_API_AUTH as string,
		},
	},
	{
		immediate: false,
	}
).json<Array<ContentsItem>>();

const updateRepositoryInfos = (
	newOwner: string,
	newRepo: string,
	newNodes: Array<string>
) => {
	setOwner(newOwner);
	setRepositoryName(newRepo);

	const newPath = newNodes ? `/${newNodes.join("/")}` : "/";
	setPath(newPath);
	if (!contentsForPath(newPath)) execute();
};

if (!currentContents.value)
	updateRepositoryInfos(
		route.params.owner as string,
		route.params.repo as string,
		route.params.nodes as Array<string>
	);

onBeforeRouteUpdate((to) => {
	const { owner: newOwner, repo: newRepo, nodes: newNodes } = to.params;
	if (
		typeof newOwner !== "string" ||
		typeof newRepo !== "string" ||
		typeof newNodes === "string"
	)
		return;
	updateRepositoryInfos(newOwner, newRepo, newNodes);
});

watch(data, (newData) => {
	if (!newData) return;
	setContentsForPath({
		contents: newData,
		path: path.value,
	});
});
</script>
