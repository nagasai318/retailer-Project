import React from "react";
import { processTotalRewards } from "../utils/dataProcessor";

// Component for Total Rewards Table
const TotalRewards = ({ transactions }) => {
  const totalRewards = processTotalRewards(transactions);

  return (
    <div>
      <h2>Total Rewards</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {totalRewards.map((reward) => (
            <tr key={reward.customerName}>
              <td>{reward.customerName}</td>
              <td>{reward.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalRewards;
