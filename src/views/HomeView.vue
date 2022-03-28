<template>
	<main
		class="relative flex w-full grow flex-col items-center bg-topograpy-pattern px-6 pt-8 bg-blend-multiply sm:justify-center sm:pt-0"
	>
		<section>
			<h1
				class="text-4xl font-extrabold tracking-tight text-gray-100 sm:text-5xl md:text-6xl"
			>
				<span class="text-shadow-emphasis-primary">Visualize your</span>
				<span
					class="animate-gradient bg-gradient-to-r from-teal-300 via-indigo-500 to-primary-lighter bg-[length:400%_400%] bg-clip-text text-transparent"
				>
					repository
				</span>
			</h1>
			<SearchUrlForm @url-submitted="searchRepository($event)" />
		</section>
	</main>
</template>

<script setup lang="ts">
import SearchUrlForm from "@/components/molecules/UrlSearchForm.vue";

const searchRepository = (respositoryUrl: string) =>
	console.log("repository url : ", respositoryUrl);
</script>
