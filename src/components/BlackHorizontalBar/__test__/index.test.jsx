import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ReactDom from "react-dom";
import BlackHorizontalBar from "..";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { useState } from "react";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<BlackHorizontalBar />, div);
});

it("renders form correctly", () => {
  //use for props passing
  const { getByTestId } = render(
    <BlackHorizontalBar title="Ninety Camera" buttonText="Register" />
  );
  expect(getByTestId("blackHorizontalBar")).toHaveTextContent("Ninety Camera");
});

it("matches snapshot", () => {
  const tree = renderer
    .create(<BlackHorizontalBar title="Ninety Camera" buttonText="Register" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
