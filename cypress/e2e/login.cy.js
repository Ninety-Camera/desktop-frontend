describe("empty spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Sign In").click();
    cy.get('[id="Email"]')
      .type("test@gmail.com")
      .should("have.value", "test@gmail.com");
    cy.get('[id="Password"]')
      .type("TestPassword1@")
      .should("have.value", "TestPassword1@");
    cy.contains("Sign In").click();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });
});
