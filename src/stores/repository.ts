import { defineStore } from "pinia";

export const useRepositoryStore = defineStore({
	id: "repository",
	state: () => ({
		contents: [] as Array<unknown>,
		owner: "",
		repo: "",
	}),
	actions: {
		setRepositoryContents(newData: Array<unknown>) {
			this.contents = newData;
		},
		setOwner(newOwner: string) {
			this.owner = newOwner;
		},
		setRepositoryName(newRepo: string) {
			this.repo = newRepo;
		},
	},
});
