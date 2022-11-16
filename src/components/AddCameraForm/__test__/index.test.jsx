import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ReactDom from "react-dom";
import AddCameraForm from "..";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("Add camera form renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<AddCameraForm />, div);
});

// it("renders form correctly", ()=> { //use for props passing
//   const {getByTestId} = render(<AddCameraForm/>);
//   expect(getByTestId("addCameraForm")).toHaveTextContent("text");
// })

it("matches snapshot", () => {
  const tree = renderer.create(<AddCameraForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
