<template>
	<MainWrapper>
		<div
			class="mt-8 overflow-hidden bg-gradient-to-b from-gray-800/80 via-slate-800/80 to-gray-800/80 shadow sm:w-10/12 sm:min-w-[640px] sm:rounded-lg"
		>
			<div class="px-4 py-5 sm:px-6">
				<h3
					class="flex flex-wrap items-end whitespace-nowrap border-b border-slate-700 pb-5 text-xl font-medium leading-6 text-gray-100"
				>
					<span class="text-primary">{{ repositoryStore.owner }}</span
					><span class="mx-1 text-primary-dark">/</span
					><RouterLink
						:to="`/repos/${repositoryStore.owner}/${repositoryStore.repo}`"
						:class="{
							'animate-gradient from-teal-300 via-indigo-500 to-primary-lighter':
								!repositoryStore.nodes.length,
							'from-primary-light to-primary-dark':
								repositoryStore.nodes.length,
						}"
						class="bg-gradient-to-r bg-[length:400%_400%] bg-clip-text text-transparent"
						>{{ repositoryStore.repo }}</RouterLink
					><template
						v-for="(item, i) in repositoryStore.nodes"
						:key="`node_${item}`"
					>
						<ChevronRightIcon
							class="h-5 w-5 text-primary"
						/><RouterLink
							:to="`/repos/${repositoryStore.owner}/${
								repositoryStore.repo
							}/${repositoryStore.nodes
								.slice(0, i + 1)
								.join('/')}`"
							:class="{
								'animate-gradient from-teal-300 via-indigo-500 to-primary-lighter':
									i === repositoryStore.nodes.length - 1,
								'from-primary-light to-primary-dark':
									i !== repositoryStore.nodes.length - 1,
							}"
							class="bg-gradient-to-r bg-[length:400%_400%] bg-clip-text text-transparent"
							>{{ item }}</RouterLink
						>
					</template>
				</h3>
			</div>
			<RouterView test="lol" />
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

const repositoryStore = useRepositoryStore();
const route = useRoute();

const repositoryUrl = computed(
	() => `https://github.com/${repositoryStore.owner}/${repositoryStore.repo}`
);
const requestUrl = computed(
	() =>
		`${repositoryUrl.value.replace(
			"github.com",
			"api.github.com/repos"
		)}/contents${repositoryStore.path ? "/" + repositoryStore.path : ""}`
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

const updateRepositoryInfos = ({
	owner,
	repo,
	nodes,
}: {
	owner: string;
	repo: string;
	nodes: Array<string>;
}) => {
	repositoryStore.setOwner(owner);
	repositoryStore.setRepositoryName(repo);

	const path = nodes ? `/${nodes.join("/")}` : "/";
	repositoryStore.setPath(path);
	if (!repositoryStore.contentsForPath(path)) execute();
};

if (!repositoryStore.currentContents)
	updateRepositoryInfos(
		route.params as {
			owner: string;
			repo: string;
			nodes: Array<string>;
		}
	);

onBeforeRouteUpdate((to) => {
	const { owner, repo, nodes } = to.params;
	console.log(owner, repo, nodes);
	if (
		typeof owner !== "string" ||
		typeof repo !== "string" ||
		typeof nodes === "string"
	)
		return;
	updateRepositoryInfos({ owner, repo, nodes });
});

watch(data, (newData) => {
	if (!newData) return;
	repositoryStore.setContentsForPath({
		contents: newData,
		path: repositoryStore.path,
	});
});
</script>
