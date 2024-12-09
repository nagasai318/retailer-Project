// src/services/api.js
export const fetchTransactions = async () => {
    return fetch("/api/transactions").then((res) => res.json());
  };
  //FOr Testing Purposes