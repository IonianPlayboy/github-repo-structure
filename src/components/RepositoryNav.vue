<template>
	<h3
		class="flex flex-wrap items-end whitespace-nowrap border-b border-slate-700 px-4 py-5 text-xl font-medium leading-6 text-gray-100 sm:px-6"
		data-testid="repositoryNav"
	>
		<RouterLink :to="baseRoute" data-testid="repository-root">
			<span class="text-primary">
				{{ owner }}
			</span>
			<span class="mx-1 text-primary-dark"> / </span>
			<span
				:class="{
					'animate-gradient from-teal-300 via-indigo-500 to-primary-lighter':
						!nodes.length,
					'from-primary-light to-primary-dark': nodes.length,
				}"
				class="bg-gradient-to-r bg-[length:400%_400%] bg-clip-text text-transparent"
			>
				{{ repo }}
			</span>
		</RouterLink>
		<template v-for="(item, i) in nodes" :key="`node_${item}`">
			<ChevronRightIcon class="h-5 w-5 text-primary" />
			<RouterLink
				:to="getRouteForIndex(i)"
				:class="{
					'animate-gradient from-teal-300 via-indigo-500 to-primary-lighter':
						i === nodes.length - 1,
					'from-primary-light to-primary-dark':
						i !== nodes.length - 1,
				}"
				class="bg-gradient-to-r bg-[length:400%_400%] bg-clip-text text-transparent"
				:data-testid="`repository-${item}`"
			>
				{{ item }}
			</RouterLink>
		</template>
	</h3>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRepositoryStore } from "@/stores/repository";

import { RouterLink } from "vue-router";
import { ChevronRightIcon } from "@heroicons/vue/outline";
import { computed } from "vue";

const store = useRepositoryStore();
const { owner, repo, nodes } = storeToRefs(store);

const baseRoute = computed(() => `/repos/${owner.value}/${repo.value}`);

const getRouteForIndex = (index: number) =>
	`${baseRoute.value}/${nodes.value.slice(0, index + 1).join("/")}`;
</script>
