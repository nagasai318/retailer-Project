import React from "react";
import { calculateRewardPoints } from "../utils/dataProcessor";

// Component for Transactions Table
const TransactionsTable = ({ transactions }) => {
  return (
    <div>
      <h2>All Transactions</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th>Purchase Date</th>
            <th>Product Purchased</th>
            <th>Price</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td>{transaction.transactionId}</td>
              <td>{transaction.customerName}</td>
              <td>{transaction.transactionDate}</td>
              <td>{transaction.productPurchased}</td>
              <td>${transaction.amountSpent.toFixed(2)}</td>
              <td>{calculateRewardPoints(transaction.amountSpent)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
