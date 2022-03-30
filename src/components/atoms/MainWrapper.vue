<template>
	<main
		:class="{
			'pt-8 sm:justify-center sm:pt-0': centered,
		}"
		class="relative flex w-full grow flex-col items-center bg-topograpy-pattern pb-8 sm:px-6"
	>
		<slot />
	</main>
</template>

<script setup lang="ts">
defineProps<{
	centered?: boolean;
}>();
</script>
