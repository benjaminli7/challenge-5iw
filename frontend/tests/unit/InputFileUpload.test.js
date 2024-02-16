import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import InputFileUpload from "@/components/commons/InputFileUpload";
import "@testing-library/jest-dom";

describe("InputFileUpload Component", () => {
  const mockHandleImageUpload = jest.fn();
  const mockHandleDialogClose = jest.fn();

  beforeEach(() => {
    render(
      <InputFileUpload
        ressource="testResource"
        handleImageUpload={mockHandleImageUpload}
        handleDialogClose={mockHandleDialogClose}
        type="testType"
      />
    );
  });

  test("calls handleImageUpload on submit with the selected file", () => {
    // Assuming you have a way to select files for upload in your component,
    // you would simulate that here, and then click the submit button.
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const input = screen.getByLabelText(/upload/i);
    fireEvent.change(input, { target: { files: [file] } });

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    expect(mockHandleImageUpload).toHaveBeenCalledWith(
      file,
      expect.any(Function), // setFile is a function, so we check for any function here.
      "testResource",
      mockHandleDialogClose,
      "testType"
    );
  });
});
