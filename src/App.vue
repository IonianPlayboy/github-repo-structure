<template>
	<Head>
		<html class="h-full scroll-smooth" />
		<body
			class="h-full bg-gradient-to-b from-slate-900 via-gray-800 to-gray-900 font-body text-gray-300"
		/>
		<title>Github Repo Structure</title>
	</Head>
	<AppHeader />
	<RouterView />
</template>

<script setup lang="ts">
import { Head } from "@vueuse/head";
import { RouterView } from "vue-router";
import AppHeader from "@/components/organisms/AppHeader.vue";
</script>
