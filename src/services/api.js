import  mockTransactions  from "../data/transactions";

export const fetchTransactions = async () => {
  return new Promise((resolve, reject) => {
      if (mockTransactions) {
        resolve(mockTransactions);
      } else {
        reject("Error fetching transactions");
      }
  });
}