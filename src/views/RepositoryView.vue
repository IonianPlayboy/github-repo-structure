<template>
	<MainWrapper>
		<div
			class="mt-8 overflow-hidden bg-gradient-to-b from-gray-800/80 via-slate-800/80 to-gray-800/80 shadow sm:w-10/12 sm:min-w-[640px] sm:rounded-lg"
		>
			<div class="px-4 py-5 sm:px-6">
				<h3
					class="flex items-end text-xl font-medium leading-6 text-gray-100"
				>
					<span class="text-primary-light">{{
						repositoryStore.owner
					}}</span
					><ChevronRightIcon class="h-5 w-5 text-primary" /><span
						class="animate-gradient bg-gradient-to-r from-teal-300 via-indigo-500 to-primary-lighter bg-[length:400%_400%] bg-clip-text text-transparent"
						>{{ repositoryStore.repo }}</span
					>
				</h3>
				<p class="mt-1 max-w-2xl text-sm text-gray-400">
					<!-- TODO: Add something interesting here (with repo request ?) -->
				</p>
			</div>
			<section class="border-t border-slate-700 px-4 py-5 sm:px-6">
				<article
					class="flex items-center"
					v-for="{ name, type, sha } in sortedContents"
					:key="sha"
				>
					<component class="h-4 w-4" :is="getCurrIcon(type)" />
					{{ name }}
				</article>
			</section>
		</div>
	</MainWrapper>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useFetch } from "@vueuse/core";
import { useRepositoryStore, type ContentsItem } from "@/stores/repository";

import {
	ChevronRightIcon,
	FolderIcon,
	DocumentTextIcon,
} from "@heroicons/vue/outline";
// import { ChevronRightIcon as SmallChevronRightIcon } from "@heroicons/vue/solid";
import MainWrapper from "@/components/atoms/MainWrapper.vue";

const repositoryStore = useRepositoryStore();
const route = useRoute();

const getCurrIcon = (type: ContentsItem["type"]) =>
	type === "dir" ? FolderIcon : DocumentTextIcon;

const repositoryUrl = computed(
	() => `https://github.com/${repositoryStore.owner}/${repositoryStore.repo}`
);
const requestUrl = computed(
	() =>
		`${repositoryUrl.value.replace(
			"github.com",
			"api.github.com/repos"
		)}/contents`
);
const { isFetching, error, data, execute } = useFetch<Array<ContentsItem>>(
	requestUrl,
	{
		headers: {
			// NOTE: Required to use the GitHub API
			// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#user-agent-required
			"User-Agent": "IonianPlayboy",
			// NOTE: Strongly recommended to use the GitHub API
			// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#current-version
			Accept: "application/vnd.github.v3+json",
		},
	},
	{
		immediate: false,
	}
).json();

watch(
	route,
	(newRoute, oldRoute) => {
		console.log(newRoute, oldRoute);
		const { owner, repo } = newRoute.params;
		if (typeof owner !== "string" || typeof repo !== "string") return;
		if (owner === oldRoute?.params.owner && repo === oldRoute?.params.repo)
			return;
		repositoryStore.setOwner(owner);
		repositoryStore.setRepositoryName(repo);
		execute();
	},
	{ immediate: true }
);

watch(data, (newData) => {
	if (!newData) return;
	repositoryStore.setRepositoryContents(newData);
});

const sortedContents = computed(() =>
	repositoryStore.contents
		.map(({ _links, ...restOfEl }) => ({
			...restOfEl,
			_links: { ..._links },
		}))
		.sort((a, b) => {
			if (a.type === b.type) return a.name.localeCompare(b.name);
			return a.type === "dir" ? -1 : 1;
		})
);
</script>
