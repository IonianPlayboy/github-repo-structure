<template>
	<Head>
		<body class="min-h-screen bg-gray-900 font-body text-gray-300" />
	</Head>
	<AppHeader />
	<RouterView />
</template>

<script setup lang="ts">
import { Head } from "@vueuse/head";
import { RouterView } from "vue-router";
import AppHeader from "@/components/organisms/AppHeader.vue";
</script>
