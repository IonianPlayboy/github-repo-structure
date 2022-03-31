<template>
	<component
		:is="el"
		v-bind="{ ...(el === 'button' ? { type: 'button' } : {}) }"
		:class="{
			'px-6 py-3 text-lg shadow-md hover:shadow-lg': big,
			'px-4 py-2 text-base shadow hover:shadow-md': !big,
		}"
		class="mx-auto mt-8 inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-cyan-100 to-sky-200 font-medium text-primary transition hover:border-primary-darker hover:bg-cyan-200 hover:from-cyan-200 hover:to-teal-200 hover:text-primary-dark focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
	>
		<slot />
	</component>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		el?: "button" | "a";
		big?: boolean;
	}>(),
	{ el: "button" }
);
</script>
