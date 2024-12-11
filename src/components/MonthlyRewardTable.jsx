import React from "react";
import { processMonthlyRewards,groupRewardsByMonth } from "../utils/dataProcessor";

const UserMonthlyRewardsByMonth = ({ transactions }) => {
  // Group data by month and year
  const groupedRewards = groupRewardsByMonth(processMonthlyRewards(transactions));

  return (
    <div>
      <h2>User Monthly Rewards</h2>
      {Object.keys(groupedRewards).map((key) => {
        const [month, year] = key.split("-");
        const rewards = groupedRewards[key];
        return (
          <div key={key}>
            <h3>
              Rewards for {month} {year}
            </h3>
            <table border="1">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Reward Points</th>
                </tr>
              </thead>
              <tbody>
                {rewards.map((reward) => (
                  <tr key={`${reward.customerId}-${month}-${year}`}>
                    <td>{reward.customerId}</td>
                    <td>{reward.name}</td>
                    <td>{reward.month}</td>
                    <td>{reward.year}</td>
                    <td>{reward.rewardPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};


export default UserMonthlyRewardsByMonth;
