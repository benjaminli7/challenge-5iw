import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputFileUpload from "@/components/commons/InputFileUpload"; // Adjust the import path as per your project structure
import "@testing-library/jest-dom/extend-expect";

describe("InputFileUpload", () => {
  test("renders the upload button correctly", () => {
    render(<InputFileUpload />);
    const uploadButton = screen.getByRole("button", {
      name: /Ajouter une image/i,
    });
    expect(uploadButton).toBeInTheDocument();
  });

  test("triggers file selection when file input changes", () => {
    render(<InputFileUpload />);
    const uploadButton = screen.getByRole("button", {
      name: /Ajouter une image/i,
    });
    const fileInput = screen.getByLabelText("Ajouter une image");

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    Object.defineProperty(fileInput, "files", {
      value: [file],
    });

    userEvent.click(uploadButton); // Simulate a click to trigger the file selection

    expect(fileInput.files[0]).toStrictEqual(file);
  });
});
