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
		contentsPerPath: {} as Record<
			string,
			Array<ContentsItem> | ContentsItem
		>,
		owner: "",
		repo: "",
		path: "",
	}),
	getters: {
		fullPath: (state) => `${state.owner}/${state.repo}${state.path}`,
		nodes: (state) => state.path.split("/").filter((node) => !!node),
		contentsForPath: (state) => (path: string) =>
			state.contentsPerPath[path],
		currentContents: (state) => state.contentsPerPath[state.path],
	},
	actions: {
		setContentsForPath({
			contents,
			path,
		}: {
			contents: Array<ContentsItem>;
			path: string;
		}) {
			this.contentsPerPath[path] = contents;
		},
		setOwner(newOwner: string) {
			this.owner = newOwner;
		},
		setRepositoryName(newRepo: string) {
			this.repo = newRepo;
		},
		setPath(newPath: string) {
			this.path = newPath;
		},
	},
});
