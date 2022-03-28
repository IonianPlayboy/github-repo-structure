<template>
	<button
		:disabled="disabled || loading"
		:class="{
			'opacity-75 brightness-125 saturate-50 filter': loading,
			'bg-gray-400 bg-none opacity-75': disabled,
		}"
		type="submit"
		class="block w-full animate-gradient rounded-md border border-transparent bg-gradient-to-r from-teal-300 via-indigo-500 to-primary-lighter bg-[length:400%_400%] px-5 py-3 text-base font-medium text-white shadow transition hover:border-gray-500 hover:contrast-125 hover:filter focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark sm:w-auto sm:px-10"
	>
		<template v-if="!loading"> Validate </template>
		<template v-else>
			<SpinnerIcon class="h-5 w-5 animate-spin" />
		</template>
	</button>
</template>

<script lang="ts" setup>
import SpinnerIcon from "@/components/atoms/SpinnerIcon.vue";

defineProps<{
	disabled?: boolean;
	loading?: boolean;
}>();
</script>
