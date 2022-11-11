import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ReactDom from "react-dom";
import VideoArea from "..";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { useState } from "react";
import VIDEOCLIP1 from "../../../assets/video1.mp4";

const videoList = [
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
  { sourcePath: VIDEOCLIP1, date: "20/02/2022", hour: "12:00" },
];

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<VideoArea videosList={videoList} alignment={"row"} />, div);
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
    .create(<VideoArea videosList={videoList} alignment={"row"} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
