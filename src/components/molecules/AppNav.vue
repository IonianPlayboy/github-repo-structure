<template>
	<nav class="flex space-x-4 sm:ml-6">
		<AppNavLink v-for="{ to, content } in links" :to="to" :key="to">
			{{ content }}
		</AppNavLink>
	</nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { routes } from "@/router";
import { storeToRefs } from "pinia";
import { useRepositoryStore } from "@/stores/repository";

import AppNavLink from "@/components/atoms/AppNavLink.vue";

const store = useRepositoryStore();
const { owner, repo } = storeToRefs(store);

const capitalize = (text: string) =>
	`${text.charAt(0).toUpperCase()}${text.slice(1)}`;

const links = computed(() =>
	routes.map(({ name, path }) => ({
		content: capitalize(name),
		to:
			name !== "repository"
				? path
				: !repo.value
				? `/repos`
				: `/repos/${owner.value}/${repo.value}`,
	}))
);
</script>
