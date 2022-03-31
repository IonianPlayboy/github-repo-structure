<template>
	<MainWrapper>
		<div
			class="mt-8 w-full overflow-hidden bg-gradient-to-b from-gray-800/80 via-slate-800/80 to-gray-800/80 shadow sm:w-10/12 sm:min-w-[616px] sm:rounded-lg"
		>
			<RepositoryNav ref="respositoryNav" />
			<RouterView
				:error="error"
				:loading="isFetching"
				:owner="owner"
				:repo="repo"
				:contents="currentContents"
				:full-path="fullPath"
				:curr-node="currNode"
			/>
		</div>
		<transition
			enter-from-class="opacity-0"
			enter-active-class="transition ease-out transition-opacity"
			leave-active-class="transition ease-out transition-opacity"
			leave-to-class="opacity-0"
		>
			<ButtonSecondary
				v-if="!navIsVisible && !isFetching"
				class="fixed bottom-6 right-6"
				el="a"
				href="#"
			>
				Go to top <ArrowSmUpIcon class="ml-1 h-5 w-5" />
			</ButtonSecondary>
		</transition>
	</MainWrapper>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { onBeforeRouteUpdate, RouterView, useRoute } from "vue-router";
import { useElementVisibility, useFetch } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useRepositoryStore, type ContentsItem } from "@/stores/repository";

import MainWrapper from "@/components/atoms/MainWrapper.vue";
import RepositoryNav from "@/components/RepositoryNav.vue";
import ButtonSecondary from "@/components/atoms/ButtonSecondary.vue";
import { ArrowSmUpIcon } from "@heroicons/vue/outline";

const store = useRepositoryStore();
const { owner, repo, path, currentContents, fullPath, currNode } =
	storeToRefs(store);
const {
	setOwner,
	setRepositoryName,
	setPath,
	contentsForPath,
	setContentsForPath,
} = store;
const route = useRoute();

const requestUrl = computed(
	() =>
		`https://api.github.com/repos/${owner.value}/${repo.value}/contents${path.value}`
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
	if (typeof newOwner !== "string" || typeof newRepo !== "string") return;
	const currNodes = typeof newNodes !== "string" ? newNodes : [];
	updateRepositoryInfos(newOwner, newRepo, currNodes);
});

watch(data, (newData) => {
	if (!newData) return;
	setContentsForPath({
		contents: newData,
		path: path.value,
	});
});

const respositoryNav = ref<null | InstanceType<typeof RepositoryNav>>(null);
const navElement = computed(() => respositoryNav.value?.$el);

const navIsVisible = useElementVisibility(navElement);
</script>
