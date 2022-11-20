const {
  default: RecordVideoItem,
} = require("../../src/components/RecordVideoItem");

describe("RecordVideoItem.cy.js", () => {
  it("playground", () => {
    cy.mount(<RecordVideoItem id="1" date="2020-12-10" />);
    cy.get("button").should("have.text", "Open Video");
  });
});
