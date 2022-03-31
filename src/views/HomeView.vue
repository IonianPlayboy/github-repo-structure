<template>
	<MainWrapper centered>
		<section class="flex flex-col">
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
			<SearchForm
				:mode="inputMode"
				:loading="isFetching"
				@url-changed="error = null"
				@url-submitted="searchRepository($event)"
				@mode-switched="
					inputMode = inputMode === 'url' ? 'owner/repo' : 'url'
				"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFetch } from "@vueuse/core";
import { useRepositoryStore, type ContentsItem } from "@/stores/repository";

import MainWrapper from "@/components/atoms/MainWrapper.vue";
import SearchForm from "@/components/organisms/SearchForm.vue";
import AlertUi from "@/components/AlertUi.vue";

const store = useRepositoryStore();

const { setOwner, setRepositoryName, setContentsForPath, setPath } = store;

const requestUrl = ref("");
const inputMode = ref<"url" | "owner/repo">("url");

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

const router = useRouter();

const searchRepository = async ({
	owner: newOwner,
	repo: newRepo,
}: {
	owner: string;
	repo: string;
}) => {
	requestUrl.value = `https://api.github.com/repos/${newOwner}/${newRepo}/contents`;
	await execute();

	if (error.value || !data.value) return;
	setOwner(newOwner);
	setRepositoryName(newRepo);
	setContentsForPath({ contents: data.value, path: "/" });
	setPath("/");
	router.push(`/repos/${newOwner}/${newRepo}`);
};
</script>
