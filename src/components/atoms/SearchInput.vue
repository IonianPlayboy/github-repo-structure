<template>
	<label :for="uniqueId" class="sr-only">{{ label }}</label>
	<input
		:id="uniqueId"
		type="text"
		:value="modelValue"
		@input="updateValue($event)"
		class="block w-full grow rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark"
		:placeholder="placeholder"
		:data-testid="`input${label.replace(' ', '')}`"
	/>
</template>

<script lang="ts">
import { computed } from "vue";

let id = 0;
</script>

<script setup lang="ts">
id++;

const props = defineProps<{
	label: string;
	placeholder: string;
	modelValue: string;
}>();

const emit = defineEmits<{
	(eventName: "update:modelValue", newValue: string): void;
}>();

const uniqueId = computed(() => `${props.label.replace(" ", "_")}${id}`);

const updateValue = (event: Event) => {
	if (!event.target) return;
	const newValue = (event.target as HTMLInputElement).value;
	emit("update:modelValue", newValue);
};
</script>
