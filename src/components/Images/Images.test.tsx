import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Images from "./Images";

const mockSetImages = jest.fn();
const mockSetPrediction = jest.fn();

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        predict: {
          description: "Detected objects",
          predictions: [
            {
              bbox: {
                x1: 589,
                x2: 1443,
                y1: 92,
                y2: 927,
              },
              label: "orange",
              score: "0.97",
            },
            {
              bbox: {
                x1: -1,
                x2: 1617,
                y1: 25,
                y2: 1193,
              },
              label: "bowl",
              score: "0.29",
            },
            {
              bbox: {
                x1: -3,
                x2: 801,
                y1: 1,
                y2: 204,
              },
              label: "person",
              score: "0.28",
            },
          ],
        },
      }),
  })
) as jest.Mock;

describe("given an Images Tab component", () => {
  it("renders the table and headings", () => {
    render(
      <Images
        images={[]}
        predictions={[]}
        setImages={mockSetImages}
        setPredictions={mockSetPrediction}
      />
    );

    expect(screen.getByText(/filename/i)).toBeDefined();
    expect(screen.getByText(/size/i)).toBeDefined();
    expect(screen.getByText(/uploaded at/i)).toBeDefined();
    expect(screen.getByText(/predict/i)).toBeDefined();
  });

  it("opens the image upload dialog when clicking on the Add Image button", () => {
    render(
      <Images
        images={[]}
        predictions={[]}
        setImages={mockSetImages}
        setPredictions={mockSetPrediction}
      />
    );

    fireEvent.click(screen.getByText(/add image/i));

    expect(screen.getByText(/upload image/i)).toBeDefined();
    expect(screen.getByText(/submit/i)).toBeDefined();
    expect(screen.getByText(/cancel/i)).toBeDefined();
  });

  it("should open the predict dialog when clicking the predict button", async () => {
    render(
      <Images
        images={[
          {
            image:
              "blob:http://localhost:3000/c837db87-f597-45e6-bf3d-7acc5dfaf840",
            filename: "img_1.jpg",
            size: "247.45 KB",
            uploadedAt: new Date(),
          },
        ]}
        predictions={[]}
        setImages={mockSetImages}
        setPredictions={mockSetPrediction}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /predict/i,
      })
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/title/i)).toBeDefined();
    });

    expect(screen.getByLabelText(/description/i)).toBeDefined();
    expect(screen.getByText(/submit/i)).toBeDefined();
    expect(screen.getByText(/cancel/i)).toBeDefined();
  });
});
