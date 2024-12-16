import React, { useState, useEffect } from "react";
import { fetchTransactions } from "../services/api";
import TotalRewards from "../components/TotalRewardTable";
import UserMonthlyReward from "../components/MonthlyRewardTable";
import TransactionsTable from "../components/TransactionsTable";
import Loader from "../components/Loader";

const Main = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTransactions();
        const result = await response?.json();
        setTransactions(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      {loading && <Loader />}
      {error && <h4>Error: {error}</h4>}
      {!loading && !error && (
        <>
          <UserMonthlyReward transactions={transactions} />
          <TotalRewards transactions={transactions} />
          <TransactionsTable transactions={transactions} />
        </>
      )}
    </div>
  );
};

export default Main;
