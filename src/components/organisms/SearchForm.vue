<template>
	<keep-alive>
		<SearchFormUrl
			v-if="mode === 'url'"
			:loading="loading"
			@url-changed="emit('urlChanged')"
			@url-submitted="emit('urlSubmitted', $event)"
		/>
		<SearchFormOwnerRepo
			v-else
			:loading="loading"
			@url-changed="emit('urlChanged')"
			@url-submitted="emit('urlSubmitted', $event)"
		/>
	</keep-alive>
	<ButtonSecondary @click="emit('modeSwitched')">
		<SwitchHorizontalIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
		Switch input mode
	</ButtonSecondary>
</template>

<script setup lang="ts">
import SearchFormUrl from "@/components/molecules/SearchFormUrl.vue";
import SearchFormOwnerRepo from "@/components/molecules/SearchFormOwnerRepo.vue";
import ButtonSecondary from "@/components/atoms/ButtonSecondary.vue";
import { SwitchHorizontalIcon } from "@heroicons/vue/outline";

defineProps<{
	mode: "url" | "owner/repo";
	loading: boolean;
}>();

const emit = defineEmits<{
	(
		eventName: "urlSubmitted",
		newValue: {
			owner: string;
			repo: string;
		}
	): void;
	(eventName: "urlChanged"): void;
	(eventName: "modeSwitched"): void;
}>();
</script>
