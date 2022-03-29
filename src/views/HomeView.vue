<template>
	<MainWrapper centered>
		<section>
			<h1
				class="text-4xl font-extrabold tracking-tight text-gray-100 sm:text-5xl md:text-6xl"
			>
				<span class="text-shadow-emphasis-primary">Visualize your</span>
				<span
					class="animate-gradient bg-gradient-to-r from-teal-300 via-indigo-500 to-primary-lighter bg-[length:400%_400%] bg-clip-text text-transparent"
				>
					repository
				</span>
			</h1>
			<SearchUrlForm
				:loading="isFetching"
				@url-submitted="searchRepository($event)"
			/>
			<AlertUi class="mt-6" type="error" v-if="error">
				<template #title>
					An error occured while fetching the repository
				</template>
				<template #default>
					{{ error }}
				</template>
			</AlertUi>
		</section>
	</MainWrapper>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { useRepositoryStore, type ContentsItem } from "@/stores/repository";

import MainWrapper from "@/components/atoms/MainWrapper.vue";
import SearchUrlForm from "@/components/molecules/UrlSearchForm.vue";
import AlertUi from "@/components/AlertUi.vue";
import { useRouter } from "vue-router";

const repositoryStore = useRepositoryStore();

const repositoryUrl = ref("");

watch(repositoryUrl, (newValue) => {
	const [owner, repo] = newValue
		.replace("https://github.com/", "")
		.split("/");
	repositoryStore.setOwner(owner);
	repositoryStore.setRepositoryName(repo);
});

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
			Authorization: import.meta.env.VITE_GITHUB_API_AUTH as string,
		},
	},
	{
		immediate: false,
	}
).json();

watch(data, (newData) => {
	if (!newData) return;
	repositoryStore.setContentsForPath({ contents: newData, path: "/" });
});

const router = useRouter();

const searchRepository = async (respositoryUrl: string) => {
	repositoryUrl.value = respositoryUrl;
	await execute();
	router.push(`/repos/${repositoryStore.owner}/${repositoryStore.repo}`);
};
</script>
