<template>
	<transition
		enter-from-class="opacity-0"
		enter-active-class="transition ease-out transition-opacity"
		leave-active-class="transition ease-out transition-opacity"
		leave-to-class="opacity-0"
	>
		<ButtonSecondary
			v-if="shouldShow"
			class="fixed bottom-6 right-8 sm:right-10 md:bottom-10 md:right-16"
			big
			el="a"
			href="#"
		>
			Go to top <ArrowSmUpIcon class="ml-0.5 h-6 w-6" />
		</ButtonSecondary>
	</transition>
</template>

<script setup lang="ts">
import ButtonSecondary from "@/components/atoms/ButtonSecondary.vue";
import { ArrowSmUpIcon } from "@heroicons/vue/outline";

defineProps<{
	shouldShow: boolean;
}>();
</script>
