import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ReactDom from "react-dom";
import Camera from "../camera";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { useState } from "react";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<Camera />, div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<Camera />).toJSON();
  expect(tree).toMatchSnapshot();
});

it