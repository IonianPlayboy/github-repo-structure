// https://docs.cypress.io/api/introduction/api.html

describe("Home page", () => {
	beforeEach(() => {
		cy.visit("/");
	});
	it("exists", () => {
		cy.contains("h1", "Visualize your repository");
		cy.get("[data-testid=buttonPrimary]").should("be.disabled");
		cy.get("[data-testid=buttonSecondary]").should("be.enabled");
	});
	it("shows an error if the repository is not valid", () => {
		cy.get("input").type("testUrl");
		cy.get("[data-testid=buttonPrimary]").click();
		cy.contains("[data-testid=alert]", "error");
		cy.get("[data-testid=buttonSecondary]").click();
		cy.get("[data-testid=inputOwner]").type("testOwner");
		cy.get("[data-testid=alert]").should("not.exist");
		cy.get("[data-testid=inputRepository]").type("testRepo");
		cy.get("[data-testid=buttonPrimary]").click();
		cy.contains("[data-testid=alert]", "error");
	});
	it("get the correct repository with the given url", () => {
		cy.intercept("/repos/**/contents", {
			fixture: "repository",
		}).as("getRepository");

		cy.get("input").clear().type("testOwner/testRepo");
		cy.get("[data-testid=buttonPrimary]").click();
		cy.wait(["@getRepository"]);

		cy.url().should("include", "/repos/testOwner/testRepo");
		cy.get("[data-testid=alert]").should("not.exist");
	});
	it("get the correct repository with the given owner/repo", () => {
		cy.intercept("/repos/**/contents", {
			fixture: "repository",
		}).as("getRepository");

		cy.get("[data-testid=buttonSecondary]").click();
		cy.get("[data-testid=inputOwner]").clear().type("testOwner");
		cy.get("[data-testid=inputRepository]").clear().type("testRepo");
		cy.get("[data-testid=buttonPrimary]").click();
		cy.wait(["@getRepository"]);

		cy.url().should("include", "/repos/testOwner/testRepo");
		cy.get("[data-testid=alert]").should("not.exist");
	});
});
