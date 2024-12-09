// components/UserMonthlyRewards.js
import React from "react";

const UserMonthlyRewards = ({ groupedData }) => (
  <div>
    <h2>User Monthly Rewards</h2>
    {Object.entries(groupedData).map(([monthYear, transactions]) => (
      <div key={monthYear}>
        <h3>{monthYear}</h3>
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Transaction ID</th>
              <th>Amount Spent</th>
              <th>Transaction Date</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.transactionId}>
                <td>{txn.customerId || "N/A"}</td>
                <td>{txn.customerName || "N/A"}</td>
                <td>{txn.transactionId || "N/A"}</td>
                <td>${txn.price ? txn.price.toFixed(2) : "0.00"}</td>
                <td>{txn.purchaseDate || "Invalid Date"}</td>
                <td>{txn.rewardPoints || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

export default UserMonthlyRewards;
