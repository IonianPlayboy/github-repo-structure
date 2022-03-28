<template>
	<form
		@submit.prevent="emit('urlSubmitted', currRepositoryUrl)"
		class="mt-12 sm:mx-auto sm:flex sm:max-w-lg"
	>
		<div class="min-w-0 flex-1">
			<SearchInput label="Repository link" v-model="currRepositoryUrl" />
		</div>
		<SearchSubmitButton class="mt-4 sm:mt-0 sm:ml-3" />
	</form>
</template>

<script setup lang="ts">
import { ref } from "vue";

import SearchInput from "@/components/atoms/SearchInput.vue";
import SearchSubmitButton from "@/components/atoms/SearchSubmitButton.vue";

const currRepositoryUrl = ref("");

const emit = defineEmits<{
	(eventName: "urlSubmitted", newValue: string): void;
}>();
</script>
