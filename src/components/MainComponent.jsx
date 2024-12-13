import React,{useState,useEffect} from "react";
import { fetchTransactions } from "../services/api";
import TotalRewards from "./TotalRewardTable";
import UserMonthlyReward from "./MonthlyRewardTable"
import TransactionsTable from "./TransactionsTable";
import Loader from "./Loader";
  
  const Main = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
        fetchTransactions()
            .then((data) => {
            setTransactions(data);
            setLoading(false);
            })
            .catch((error) => {
            setError(error);
            setLoading(false);
            });
    },[]);
  
    return (
      <div className="app">
        {loading && <Loader/>}
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
  