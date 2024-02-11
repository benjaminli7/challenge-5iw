import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import CustomButton from "../../src/components/commons/CustomButton";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

it("renders button text correctly", () => {
  act(() => {
    const root = createRoot(container);
    root.render(<CustomButton>Click me</CustomButton>);
  });

  expect(container.textContent).toBe("Click me");
});

it("disables button when isSubmitting is true", () => {
  act(() => {
    const root = createRoot(container);
    root.render(<CustomButton isSubmitting={true}>Click me</CustomButton>);
  });

  const button = container.querySelector("button");
  expect(button.disabled).toBe(true);
});

it("enables button when isSubmitting is false", () => {
  act(() => {
    const root = createRoot(container);
    root.render(<CustomButton isSubmitting={false}>Click me</CustomButton>);
  });

  const button = container.querySelector("button");
  expect(button.disabled).toBe(false);
});
