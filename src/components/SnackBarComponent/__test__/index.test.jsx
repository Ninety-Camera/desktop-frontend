import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ReactDom from "react-dom";
import SnackBarComponent from "..";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { useState } from "react";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<SnackBarComponent />, div);
});

// it("renders form correctly", () => {
//   //use for props passing
//   const { getByTestId } = render(
//     <SnackBarComponent message="Successfully log in" />
//   );
//   expect(getByTestId("snackBarComponent")).toHaveTextContent(
//     "Successfully log in"
//   );
// });

it("matches snapshot", () => {
  const tree = renderer
    .create(<SnackBarComponent message="Successfully log in" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
