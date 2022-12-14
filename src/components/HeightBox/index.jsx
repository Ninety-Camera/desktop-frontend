import React from "react";

export default function HeightBox(props) {
  const { height } = props;
  return <div data-testid="heightBox" style={{ height: height }} />;
}
