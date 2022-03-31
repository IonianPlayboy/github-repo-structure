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
			<keep-alive>
				<UrlSearchForm
					v-if="inputMode === 'url'"
					:loading="isFetching"
					@url-changed="error = null"
					@url-submitted="searchRepository($event)"
				/>
				<OwnerRepoSearchForm
					v-else
					:loading="isFetching"
					@url-changed="error = null"
					@url-submitted="searchRepository($event)"
				/>
			</keep-alive>
			<SwitchButton
				@click="inputMode = inputMode === 'url' ? 'owner/repo' : 'url'"
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
import { computed, nextTick, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useFetch } from "@vueuse/core";
import { useRepositoryStore, type ContentsItem } from "@/stores/repository";

import MainWrapper from "@/components/atoms/MainWrapper.vue";
import UrlSearchForm from "@/components/molecules/UrlSearchForm.vue";
import OwnerRepoSearchForm from "@/components/molecules/OwnerRepoSearchForm.vue";
import SwitchButton from "@/components/atoms/SwitchButton.vue";
import AlertUi from "@/components/AlertUi.vue";

const store = useRepositoryStore();

const currOwner = ref("");
const currRepo = ref("");

const { setOwner, setRepositoryName, setContentsForPath } = store;

const inputMode = ref<"url" | "owner/repo">("url");

const requestUrl = computed(
	() =>
		`https://api.github.com/repos/${currOwner.value}/${currRepo.value}/contents`
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

watch(data, (newData) => {
	if (!newData) return;
	setContentsForPath({ contents: newData, path: "/" });
});

const router = useRouter();

const searchRepository = async ({
	owner: newOwner,
	repo: newRepo,
}: {
	owner: string;
	repo: string;
}) => {
	currOwner.value = newOwner;
	currRepo.value = newRepo;
	await execute();

	if (error.value) return;
	setOwner(newOwner);
	setRepositoryName(newRepo);
	router.push(`/repos/${currOwner.value}/${currRepo.value}`);
};
</script>
