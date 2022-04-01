// https://docs.cypress.io/api/introduction/api.html

describe("Repository page with files tree", () => {
	beforeEach(() => {
		cy.intercept("/repos/testOwner/testRepo/contents", {
			fixture: "repository",
		}).as("getRepository");
		cy.visit("/repos/testOwner/testRepo");
		cy.fixture("repository").as("repository");
		cy.wait("@getRepository");
	});
	it("exists", () => {
		cy.contains("[data-testid=repositoryNav]", "testOwner / testRepo");
		cy.get<Array<Record<string, string>>>("@repository").then(
			(repositoryContents) => {
				cy.get("[data-testid=dir]")
					.should("exist")
					.should(
						"have.length",
						repositoryContents.filter(({ type }) => type === "dir")
							.length
					);
				cy.get("[data-testid=file]")
					.should("exist")
					.should(
						"have.length",
						repositoryContents.filter(({ type }) => type === "file")
							.length
					);
			}
		);
	});
	it("shows a warning when displaying the content of an empty folder", () => {
		cy.get("[data-testid=dir]").first().click();
		cy.contains("[data-testid=alert]", "No file or folder found");
		cy.get<Array<Record<string, string>>>("@repository").then(
			(repository) => {
				const currNode =
					repository.find(({ type }) => type === "dir")?.name ?? "";
				cy.contains("[data-testid=repositoryNav]", `${currNode}`);
			}
		);
	});
	it("shows the content of a folder when it is clicked", () => {
		cy.get<Array<Record<string, string>>>("@repository").then(
			(repository) => {
				const currNode =
					repository.find(({ type }) => type === "dir")?.name ?? "";
				cy.intercept(`/repos/testOwner/testRepo/contents/${currNode}`, {
					fixture: "repository",
				}).as("getFolder");
				cy.get("[data-testid=dir]").first().click();
				cy.wait("@getFolder");
				cy.contains("[data-testid=repositoryNav]", `${currNode}`);
				cy.get("[data-testid=alert]").should("not.exist");
				cy.get<Array<Record<string, string>>>("@repository").then(
					(repositoryContents) => {
						cy.get("[data-testid=dir]")
							.should("exist")
							.should(
								"have.length",
								repositoryContents.filter(
									({ type }) => type === "dir"
								).length
							);
						cy.get("[data-testid=file]")
							.should("exist")
							.should(
								"have.length",
								repositoryContents.filter(
									({ type }) => type === "file"
								).length
							);
					}
				);
			}
		);
	});
	it("shows the content of a file when it is clicked", () => {
		cy.get<Array<Record<string, string>>>("@repository").then(
			(repository) => {
				const currNode =
					repository.find(({ type }) => type === "file")?.name ?? "";
				cy.intercept(`/repos/testOwner/testRepo/contents/${currNode}`, {
					fixture: "file",
				}).as("getFile");
				cy.get("[data-testid=file]").first().click();
				cy.wait("@getFile");
				cy.contains("[data-testid=repositoryNav]", currNode);
				cy.get("[data-testid=alert]").should("not.exist");
			}
		);
	});
});
