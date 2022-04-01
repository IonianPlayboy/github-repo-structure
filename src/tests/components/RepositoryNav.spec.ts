import { describe, it, expect, fn, vi, beforeEach } from "vitest";

import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import RepositoryNav from "@/components/RepositoryNav.vue";

describe("RepositoryNav", () => {
	beforeEach(() => {
		vi.mock("vue-router", () => ({
			RouterLink: {
				template: "<a :href='to'><slot /></a>",
				props: ["to"],
			},
		}));
	});
	it("renders properly", () => {
		const testingPinia = createTestingPinia({
			initialState: {
				repository: {
					owner: "aa",
					repo: "aa",
				},
			},
			createSpy: fn,
		});
		const wrapper = mount(RepositoryNav, {
			global: {
				plugins: [testingPinia],
			},
		});

		expect(wrapper.text()).toContain("aa / aa");
		expect(wrapper.html()).toMatchSnapshot();
	});
	it("only shows one link when no path is set", () => {
		const testingPinia = createTestingPinia({
			initialState: {
				repository: {
					owner: "testOwner",
					repo: "testRepo",
				},
			},
			createSpy: fn,
		});
		const wrapper = mount(RepositoryNav, {
			global: {
				plugins: [testingPinia],
			},
		});

		const links = wrapper.findAll("a");
		expect(links).toHaveLength(1);
		const [rootLink] = links;

		expect(rootLink.text()).toContain("testOwner / testRepo");
		expect(rootLink.attributes()).toMatchObject({
			href: "/repos/testOwner/testRepo",
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
	it("shows one link per node when a path is set", () => {
		const testingPiniaA = createTestingPinia({
			initialState: {
				repository: {
					owner: "testOwner",
					repo: "testRepo",
					path: "testPath",
				},
			},
			createSpy: fn,
		});
		const wrapperA = mount(RepositoryNav, {
			global: {
				plugins: [testingPiniaA],
			},
		});

		const linksA = wrapperA.findAll("a");
		expect(linksA).toHaveLength(2);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_, nodeLink] = linksA;

		expect(nodeLink.text()).toContain("testPath");
		expect(nodeLink.attributes()).toMatchObject({
			href: "/repos/testOwner/testRepo/testPath",
		});
		expect(wrapperA.html()).toMatchSnapshot();

		const testingPiniaB = createTestingPinia({
			initialState: {
				repository: {
					owner: "testOwner",
					repo: "testRepo",
					path: "test/path",
				},
			},
			createSpy: fn,
		});
		const wrapperB = mount(RepositoryNav, {
			global: {
				plugins: [testingPiniaB],
			},
		});
		const links = wrapperB.findAll("a");
		expect(links).toHaveLength(3);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [__, firstLink, secondLink] = links;

		expect(firstLink.text()).toContain("test");
		expect(firstLink.attributes()).toMatchObject({
			href: "/repos/testOwner/testRepo/test",
		});
		expect(secondLink.text()).toContain("path");
		expect(secondLink.attributes()).toMatchObject({
			href: "/repos/testOwner/testRepo/test/path",
		});
		expect(wrapperB.html()).toMatchSnapshot();
	});
});
