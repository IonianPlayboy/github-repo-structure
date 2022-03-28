<template>
	<nav class="flex space-x-4 sm:ml-6">
		<AppNavLink v-for="{ to, content } in links" :to="to" :key="to">
			{{ content }}
		</AppNavLink>
	</nav>
</template>

<script setup lang="ts">
import { routes } from "@/router";
import { useRepositoryStore } from "@/stores/repository";

import AppNavLink from "@/components/atoms/AppNavLink.vue";
import { computed } from "vue";

const repositoryStore = useRepositoryStore();

const capitalize = (text: string) =>
	`${text.charAt(0).toUpperCase()}${text.slice(1)}`;

const links = computed(() =>
	routes.map(({ name, path }) => ({
		content: capitalize(name),
		to:
			name !== "repository"
				? path
				: !repositoryStore.repo
				? `/repos`
				: `/repos/${repositoryStore.owner}/${repositoryStore.repo}`,
	}))
);
</script>
