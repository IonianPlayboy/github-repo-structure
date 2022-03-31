<template>
	<component
		:is="el"
		v-bind="{ ...(el === 'button' ? { type: 'button' } : {}) }"
		class="mx-auto mt-8 inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-cyan-100 to-sky-200 px-4 py-2 text-base font-medium text-primary shadow transition hover:border-primary-darker hover:bg-cyan-200 hover:from-cyan-200 hover:to-teal-200 hover:text-primary-dark hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
	>
		<slot />
	</component>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		el?: "button" | "a";
	}>(),
	{ el: "button" }
);
</script>
