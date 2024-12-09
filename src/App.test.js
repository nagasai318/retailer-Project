import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";
import { fetchTransactions } from "./services/api";

jest.mock("./services/api");

const mockData = [
  {
    customerId: "C001",
    customerName: "Nagasai",
    transactionId: 1,
    purchaseDate: "2023-12-21",
    product: "Laptop",
    price: 120,
    rewardPoints: 90,
  },
  {
    customerId: "C002",
    customerName: "John Doe",
    transactionId: 2,
    purchaseDate: "2024-01-15",
    product: "Headphones",
    price: 75,
    rewardPoints: 25,
  },
];

describe("App Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading indicator while fetching data", async () => {
    fetchTransactions.mockResolvedValueOnce(mockData);
    render(<App />);

    expect(screen.getByText(/Fetching Data/i)).toBeInTheDocument();
    await waitFor(() => expect(fetchTransactions).toHaveBeenCalled());
  });

  test("renders customer name after fetching data", async () => {
    fetchTransactions.mockResolvedValueOnce(mockData);
    render(<App />);

    expect(await screen.findByText("Nagasai")).toBeInTheDocument();
  });

  test("renders product details correctly", async () => {
    fetchTransactions.mockResolvedValueOnce(mockData);
    render(<App />);

    expect(await screen.findByText(/Laptop/i)).toBeInTheDocument();
    expect(await screen.findByText(/Headphones/i)).toBeInTheDocument();
  });

  test("renders reward points correctly", async () => {
    fetchTransactions.mockResolvedValueOnce(mockData);
    render(<App />);

    expect(await screen.findByText(/90/i)).toBeInTheDocument();
    expect(await screen.findByText(/25/i)).toBeInTheDocument();
  });

  test("handles API errors gracefully", async () => {
    fetchTransactions.mockRejectedValueOnce(new Error("Failed to fetch"));
    render(<App />);

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  test("sorts transactions by date", async () => {
    fetchTransactions.mockResolvedValueOnce(mockData);
    render(<App />);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveTextContent("2023-12-21");
    });
    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows[2]).toHaveTextContent("2024-01-15");
    });
  });
});
