<template>
	<div
		:class="colorStylesPerType[type].bg"
		class="rounded-md bg-gradient-to-r p-4 shadow-md"
		data-testid="alert"
	>
		<div class="flex">
			<div class="shrink-0">
				<component
					:is="currIcon"
					:class="colorStylesPerType[type].icon"
					class="h-5 w-5"
					aria-hidden="true"
				/>
			</div>
			<div class="ml-3">
				<h3
					:class="colorStylesPerType[type].title"
					class="text-sm font-medium"
				>
					<slot name="title" />
				</h3>
				<div
					v-if="slots?.default"
					:class="colorStylesPerType[type].text"
					class="mt-2 text-sm"
				>
					<p>
						<slot />
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, useSlots } from "vue";
import {
	InformationCircleIcon,
	ExclamationIcon,
	XCircleIcon,
	CheckCircleIcon,
} from "@heroicons/vue/solid";

const props = defineProps<{
	type: "info" | "warning" | "error" | "success" | "disabled";
}>();

const slots = useSlots();

const iconsPerType = {
	info: InformationCircleIcon,
	warning: ExclamationIcon,
	error: XCircleIcon,
	success: CheckCircleIcon,
	disabled: InformationCircleIcon,
} as const;

const colorStylesPerType = {
	info: {
		bg: "from-blue-900/50 to-sky-900/50",
		icon: "text-blue-400",
		title: "text-blue-200",
		text: "text-blue-300",
	},
	warning: {
		bg: "from-yellow-900/50 to-amber-900/50",
		icon: "text-yellow-400",
		title: "text-yellow-200",
		text: "text-yellow-300",
	},
	error: {
		bg: "from-red-900/50 to-rose-900/50",
		icon: "text-red-400",
		title: "text-red-200",
		text: "text-red-300",
	},
	success: {
		bg: "from-green-900/50 to-emerald-900/50",
		icon: "text-green-400",
		title: "text-green-200",
		text: "text-green-300",
	},
	disabled: {
		bg: "from-slate-900/50 to-gray-900/50",
		icon: "text-slate-400",
		title: "text-slate-200",
		text: "text-slate-300",
	},
} as const;

const currIcon = computed(() => iconsPerType[props.type]);
</script>
