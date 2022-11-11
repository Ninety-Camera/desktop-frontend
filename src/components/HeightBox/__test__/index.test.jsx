import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ReactDom from "react-dom";
import HeightBox from "..";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { useState } from "react";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<HeightBox />, div);
});

it("renders form correctly", () => {
  //use for props passing
  const { getByTestId } = render(<HeightBox height={20} />);
  //expect(getByTestId("blackHorizontalBar")).toHaveTextContent("Ninety Camera");
});

it("matches snapshot", () => {
  const tree = renderer.create(<HeightBox height={20} />).toJSON();
  expect(tree).toMatchSnapshot();
});
