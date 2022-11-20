describe("empty spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Sign Up").click();
    cy.get('[id="firstName"]')
      .type("Test Name")
      .should("have.value", "Test Name");
    cy.get('[id="lastName"]')
      .type("Test Name Last")
      .should("have.value", "Test Name Last");
    cy.get('[id="email"]')
      .type("testemail@gmail.com")
      .should("have.value", "testemail@gmail.com");
    cy.get('[id="password"]')
      .type("TestPass1@")
      .should("have.value", "TestPass1@");
    cy.get('[id="confirmPassword"]')
      .type("TestPass1@")
      .should("have.value", "TestPass1@");
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });
});
