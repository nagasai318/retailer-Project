// utils/dataProcessor.js
import { groupBy } from "lodash";

export const processTransactions = (data) => {
  const cleanedData = data.map((transaction) => ({
    ...transaction,
    price: transaction.price || 0, // Fallback for price
    rewardPoints: transaction.rewardPoints || 0, // Fallback for reward points
    purchaseDate: isNaN(new Date(transaction.purchaseDate)) ? "Invalid Date" : transaction.purchaseDate, // Handle invalid dates
  }));

  // Group transactions by Month-Year
  const groupedByMonth = groupBy(cleanedData, (transaction) =>
    new Date(transaction.purchaseDate).toLocaleString("default", { month: "long", year: "numeric" })
  );

  // Calculate total rewards for each user
  const totalRewards = cleanedData.reduce((acc, curr) => {
    acc[curr.customerName] = (acc[curr.customerName] || 0) + curr.rewardPoints;
    return acc;
  }, {});

  return { groupedByMonth, totalRewards };
};
