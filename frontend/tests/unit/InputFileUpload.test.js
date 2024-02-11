import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputFileUpload from "../../src/components/commons/InputFileUpload";
import "@testing-library/jest-dom/extend-expect";

describe("InputFileUpload", () => {
  test("renders the upload button correctly", () => {
    render(<InputFileUpload />);
    const uploadButton = screen.getByRole("button", { name: /Upload Image/i });
    expect(uploadButton).toBeInTheDocument();
  });

  test("triggers file selection when file input changes", () => {
    render(<InputFileUpload />);
    const uploadButton = screen.getByRole("button", { name: /Upload Image/i });
    const fileInput = screen.getByLabelText("Upload Image");

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    userEvent.upload(fileInput, file);

    expect(fileInput.files[0]).toStrictEqual(file);
  });
});
