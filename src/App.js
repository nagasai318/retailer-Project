// App.js
import React, { useEffect, useState } from "react";
import UserMonthlyRewards from "./components/MonthlyRewardTable";
import TotalRewards from "./components/TotalRewardTable";
import AllTransactions from "./components/TransactionsTable";
import { processTransactions } from "./utils/dataProcessor";
import { transactionsData } from "./data/transactions";
import Loader from "./components/Loader/Loader";
import "./App.css"

const App = () => {
  const [groupedData, setGroupedData] = useState({});
  const [totalRewards, setTotalRewards] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      //simulate API call
      setTimeout(() => {
        try{
          const { groupedByMonth, totalRewards } = processTransactions(transactionsData);
          console.log("Processed Data:", groupedByMonth, totalRewards); // Debug processed data
          setGroupedData(groupedByMonth);
          setTotalRewards(totalRewards);
          setTransactions(transactionsData);
          setLoading(false);
        }
        catch(err){
          setError("Error Fetching Data");
          setLoading(false);
        }
      },1000)

  }, []);

  if (loading) return <div><Loader/></div>;
  if (error) return <div>{error}</div>;
  

  return (
    <div>
      <UserMonthlyRewards groupedData={groupedData} />
      <TotalRewards totalRewards={totalRewards} />
      <AllTransactions transactions={transactions} />
    </div>
  );
};

export default App;
