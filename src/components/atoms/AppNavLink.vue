<template>
	<RouterLink :to="to" custom v-slot="{ isActive, href, navigate }">
		<a
			:href="href"
			@click.prevent="!disabled && navigate()"
			:class="{
				'cursor-default text-gray-500': disabled,
				'bg-primary-dark text-white': isActive,
				'text-gray-300 transition-colors duration-100 ease-out hover:bg-gray-700 hover:text-white':
					!isActive && !disabled,
				[`${attrs.class}`]: true,
			}"
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
	disabled?: boolean;
}>();

const attrs = useAttrs();
</script>
