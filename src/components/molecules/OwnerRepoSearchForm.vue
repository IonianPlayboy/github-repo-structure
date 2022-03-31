<template>
	<form
		@submit.prevent="submitUrl()"
		class="mt-12 w-full sm:mx-auto sm:flex sm:max-w-xl"
	>
		<div
			class="flex min-w-0 flex-1 flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-2"
		>
			<SearchInput
				label="Owner"
				placeholder="Repository owner"
				v-model="currRepositoryOwner"
			/>
			<span class="hidden text-xl text-primary-pale sm:inline">/</span>
			<SearchInput
				label="Repository"
				placeholder="Repository name"
				v-model="currRepositoryRepo"
			/>
		</div>
		<ButtonPrimary
			:disabled="!currRepositoryOwner || !currRepositoryRepo"
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

const currRepositoryOwner = ref("");
const currRepositoryRepo = ref("");

defineProps<{ loading?: boolean }>();

const emit = defineEmits<{
	(
		eventName: "urlSubmitted",
		newValue: { owner: string; repo: string }
	): void;
	(eventName: "urlChanged"): void;
}>();

const submitUrl = () => {
	emit("urlSubmitted", {
		owner: currRepositoryOwner.value,
		repo: currRepositoryRepo.value,
	});
};

watch([currRepositoryOwner, currRepositoryRepo], () => emit("urlChanged"));
</script>
