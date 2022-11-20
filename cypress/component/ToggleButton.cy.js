const { default: ToggleBtn } = require("../../src/components/ToggleBtn");

describe("ToggleButton.cy.js", () => {
  it("playground", () => {
    cy.mount(<ToggleBtn loading={false} />);
    cy.get("button").should("have.text", "Start Monitoring");
  });
});
