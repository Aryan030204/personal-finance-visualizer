import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const Chart = ({ category }) => {
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(SERVER_URL + "/");
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const processTransactions = () => {
      const monthlyExpenses = {};

      const filteredTransactions = category === "All"
        ? transactions
        : transactions.filter((t) => t.category === category);

      filteredTransactions.forEach((transaction) => {
        const date = new Date(transaction.date);
        const month = `${date.getMonth() + 1}-${date.getFullYear()}`;
        const amount = transaction.amount;

        if (monthlyExpenses[month]) {
          monthlyExpenses[month] += amount;
        } else {
          monthlyExpenses[month] = amount;
        }
      });

      const chartData = Object.keys(monthlyExpenses).map((month) => ({
        date: month,
        amount: monthlyExpenses[month],
      }));

      setData(chartData);
    };

    if (transactions.length > 0) {
      processTransactions();
    }
  }, [transactions, category]); 

  return (
    <div className="chart-container flex items-center justify-center">
      {data.length > 0 ? (
        <ResponsiveContainer width={500} height={500}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-xl font-semibold text-gray-600">No data available for selected category.</p>
      )}
    </div>
  );
};

export default Chart;
