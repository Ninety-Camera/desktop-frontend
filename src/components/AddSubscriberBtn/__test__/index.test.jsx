import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ReactDom from "react-dom";
import RemoveSubscriberBtn from "..";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { useState } from "react";

// const [users, setUsers] = useState([
//   { email: "user1@mail.com", role: "owner" },
//   { email: "user2@mail.com", role: "additional" },
//   { email: "user3@mail.com", role: "additional" },
//   { email: "user4@mail.com", role: "additional" },
// ]);

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<RemoveSubscriberBtn />, div);
});

// it("renders form correctly", () => {
//   //use for props passing
//   const { getByTestId } = render(<AddSubscriberBtn />);
//   expect(getByTestId("addSubscriberBtn")).toHaveTextContent("text");
// });

it("matches snapshot", () => {
  const tree = renderer.create(<RemoveSubscriberBtn />).toJSON();
  expect(tree).toMatchSnapshot();
});
