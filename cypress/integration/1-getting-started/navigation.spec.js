describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("Should navigate to Tuseday", () => {
    cy.visit("/");
    cy.contains("li", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");

  });

});