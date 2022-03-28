import { defineStore } from "pinia";

export interface ContentsItem {
	_links: {
		git: string;
		html: string;
		self: string;
	};
	download_url: string;
	git_url: string;
	html_url: string;
	name: string;
	path: string;
	sha: string;
	size: number;
	type: "file" | "dir";
	url: string;
}

export const useRepositoryStore = defineStore({
	id: "repository",
	state: () => ({
		contents: [] as Array<ContentsItem>,
		owner: "",
		repo: "",
	}),
	actions: {
		setRepositoryContents(newData: Array<ContentsItem>) {
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
