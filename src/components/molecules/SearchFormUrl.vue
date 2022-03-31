<template>
	<form
		@submit.prevent="submitUrl()"
		class="mt-12 w-full sm:mx-auto sm:flex sm:max-w-lg"
	>
		<div class="min-w-0 flex-1">
			<SearchInput
				label="Repository link"
				placeholder="Enter the repository url"
				v-model="currRepositoryUrl"
			/>
		</div>
		<ButtonPrimary
			:disabled="!currRepositoryUrl"
			:loading="loading"
			class="mt-4 w-full sm:mt-0 sm:ml-3 sm:w-auto"
		>
			Validate
		</ButtonPrimary>
	</form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import SearchInput from "@/components/atoms/SearchInput.vue";
import ButtonPrimary from "@/components/atoms/ButtonPrimary.vue";

const currRepositoryUrl = ref("");

defineProps<{ loading?: boolean }>();

const emit = defineEmits<{
	(
		eventName: "urlSubmitted",
		newValue: { owner: string; repo: string }
	): void;
	(eventName: "urlChanged"): void;
}>();

const submitUrl = () => {
	const [newOwner, newRepo] = currRepositoryUrl.value
		.replace("https://github.com/", "")
		.split("/");
	emit("urlSubmitted", {
		owner: newOwner,
		repo: newRepo,
	});
};

watch(currRepositoryUrl, () => emit("urlChanged"));
</script>
