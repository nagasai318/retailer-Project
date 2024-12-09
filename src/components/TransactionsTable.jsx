// components/AllTransactions.js
import React from "react";

const AllTransactions = ({ transactions }) => (
  <div>
    <h2>All Transactions</h2>
    <table>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Customer ID</th>
          <th>Customer Name</th>
          <th>Purchase Date</th>
          <th>Product Purchased</th>
          <th>Price</th>
          <th>Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((txn) => (
          <tr key={txn.transactionId}>
            <td>{txn.transactionId}</td>
            <td>{txn.customerId}</td>
            <td>{txn.customerName}</td>
            <td>{txn.purchaseDate}</td>
            <td>{txn.product}</td>
            <td>${txn.price.toFixed(2)}</td>
            <td>{txn.rewardPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AllTransactions;
