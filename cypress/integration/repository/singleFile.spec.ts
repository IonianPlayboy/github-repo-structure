// https://docs.cypress.io/api/introduction/api.html

describe("Repository page with single file", () => {
	beforeEach(() => {
		cy.intercept(`/repos/testOwner/testRepo/contents/*`, {
			fixture: "file",
		}).as("getFile");
		cy.visit("/repos/testOwner/testRepo/testFile");
		cy.fixture("file").as("file");
		cy.wait("@getFile");
	});
	it("exists", () => {
		cy.contains("[data-testid=repositoryNav]", "testFile");
		cy.get("[data-testid=alert]").should("not.exist");
		cy.get("[data-testid^=file]").should("exist");
	});
	it("allows to scroll back to top", () => {
		cy.get('[data-testid="repositoryNav"]').should("be.visible");
		cy.get("[data-testid=buttonSecondary]").should("not.exist");

		cy.scrollTo("bottom");
		cy.wait(500);
		cy.get("[data-testid=buttonSecondary]")
			.should("exist")
			.and("have.attr", "href", "#");

		cy.scrollTo("top");
		cy.get("[data-testid=repositoryNav]").should("be.visible");
		cy.get("[data-testid=buttonSecondary]").should("not.exist");
	});
	it("show an alert if the file is empty ", () => {
		cy.intercept(`/repos/testOwner/testRepo/contents/emptyFile`, {
			fixture: "emptyFile",
		}).as("getEmptyFile");
		cy.visit("/repos/testOwner/testRepo/emptyFile");
		cy.wait("@getEmptyFile");

		cy.contains("[data-testid=alert]", "Empty file");
		cy.get("[data-testid^=file]").should("not.exist");
	});
});
