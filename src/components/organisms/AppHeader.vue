<template>
	<header
		class="flex h-16 shrink-0 items-center bg-gray-900 px-2 shadow sm:px-6 lg:px-8"
	>
		<AppBranding />
		<AppNav />
	</header>
</template>

<script setup lang="ts">
import AppBranding from "@/components/molecules/AppBranding.vue";
import AppNav from "@/components/molecules/AppNav.vue";
</script>
