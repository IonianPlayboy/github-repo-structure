<template>
	<RouterLink :to="to" custom v-slot="{ isActive, href, navigate }">
		<a
			:href="href"
			@click="navigate"
			:class="[
				isActive
					? 'bg-gray-900 text-white'
					: 'text-gray-300 transition-colors duration-100 ease-out hover:bg-gray-700 hover:text-white',
				attrs.class,
			]"
			class="rounded-md px-3 py-2 text-sm font-medium"
		>
			<slot />
		</a>
	</RouterLink>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";
import { RouterLink } from "vue-router";

defineProps<{
	to: string;
}>();

const attrs = useAttrs();
</script>
