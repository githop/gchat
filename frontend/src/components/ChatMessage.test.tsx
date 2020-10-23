import React from "react";
import { render } from "@testing-library/react";
import { ChatMessage } from "./Chat";

const now = new Date();

const stubData = {
  username: "Adam Test Driver",
  message: "this is a test",
  createdAt: now.toISOString(),
};

describe("<ChatMessage/> component", () => {
  const { getByText } = render(<ChatMessage {...stubData} />);

  const username = getByText(stubData.username);
  const message = getByText(stubData.message);
  const createdAt = getByText(now.toLocaleString());

  it("should have a username", () => {
    expect(username).toHaveTextContent(stubData.username);
  });

  it("should have a message", () => {
    expect(message).toHaveTextContent(stubData.message);
  });

  it("should format the date", () => {
    expect(createdAt).toHaveTextContent(now.toLocaleString());
  });
});
