import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ReactDom from "react-dom";
import VideoItem from "..";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { useState } from "react";
import VIDEOCLIP1 from "../../../assets/video1.mp4";

const videoClip = VIDEOCLIP1;

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<VideoItem videoClip={videoClip} index={1} />, div);
});


it("matches snapshot", () => {
  const tree = renderer
    .create(<VideoItem videoClip={videoClip} index={1} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
