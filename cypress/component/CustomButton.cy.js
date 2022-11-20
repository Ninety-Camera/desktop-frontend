const { default: CustomButton } = require("../../src/components/Custombutton");

describe("CustomButton.cy.js", () => {
  it("playground", () => {
    cy.mount(<CustomButton color="red" phrase="Custom" hoverColor="blue" />);
    cy.get("button").should("have.text", "Custom");
  });
});
