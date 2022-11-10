import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ReactDom from "react-dom";
import SettingsMenu from "..";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<SettingsMenu />, div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<SettingsMenu />).toJSON();
  expect(tree).toMatchSnapshot();
});
