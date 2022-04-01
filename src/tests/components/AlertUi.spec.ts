import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import AlertUi from "@/components/AlertUi.vue";

describe("AlertUi", () => {
	it("renders properly", () => {
		const wrapper = mount(AlertUi, {
			props: { type: "info" },
			slots: {
				default: "Hello",
			},
		});
		expect(wrapper.text()).toContain("Hello");
		expect(wrapper.html()).toMatchSnapshot();
	});
	it("accepts a title and a text content", () => {
		const wrapper = mount(AlertUi, {
			props: { type: "info" },
			slots: {
				title: "Title !",
				default: "Hello this is text.",
			},
		});
		expect(wrapper.text()).toContain("Title !");
		expect(wrapper.text()).toContain("Hello this is text.");
		expect(wrapper.html()).toMatchSnapshot();
	});
	it("changes its styling according to its type", () => {
		const wrapperInfo = mount(AlertUi, {
			props: { type: "info" },
			slots: {
				default: "Hello bis",
			},
		});
		expect(
			wrapperInfo
				.classes()
				.some((className) => className.includes("blue"))
		).toBe(true);
		expect(wrapperInfo.html()).toMatchSnapshot();

		const wrapperError = mount(AlertUi, {
			props: { type: "error" },
			slots: {
				default: "Hello",
			},
		});
		expect(
			wrapperError
				.classes()
				.some((className) => className.includes("red"))
		).toBe(true);
		expect(wrapperError.html()).toMatchSnapshot();
	});
});
