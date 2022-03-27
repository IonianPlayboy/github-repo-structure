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
			<form
				@submit.prevent="searchRepository()"
				class="mt-12 sm:mx-auto sm:flex sm:max-w-lg"
			>
				<div class="min-w-0 flex-1">
					<label for="cta-repo" class="sr-only"
						>Repository link</label
					>
					<input
						id="cta-repo"
						type="text"
						class="block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark"
						placeholder="Enter the repository url"
					/>
				</div>
				<div class="mt-4 sm:mt-0 sm:ml-3">
					<button
						type="submit"
						class="block w-full animate-gradient rounded-md border border-transparent bg-gradient-to-r from-teal-300 via-indigo-500 to-primary-lighter bg-[length:400%_400%] px-5 py-3 text-base font-medium text-white shadow hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark sm:px-10"
					>
						Validate
					</button>
				</div>
			</form>
		</section>
	</main>
</template>

<script setup lang="ts">
const searchRepository = () => console.log("fired !");
</script>
