// components/TotalRewards.js
import React from "react";

const TotalRewards = ({ totalRewards }) => (
  <div>
    <h2>Total Rewards</h2>
    <table>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Total Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(totalRewards).map(([customerName, points]) => (
          <tr key={customerName}>
            <td>{customerName}</td>
            <td>{points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TotalRewards;
