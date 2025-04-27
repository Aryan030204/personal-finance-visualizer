import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalExpenses: 0,
    recentTransactions: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      const response = await axios.get(SERVER_URL + "/dashboard");
      console.log(response);

      setDashboardData(response.data);
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col w-full items-center justify-center p-10">
      <h1 className="text-6xl font-bold text-red-500 mb-[5rem]">Dashboard</h1>
      <div className="summary-cards flex flex-col gap-[2rem] p-5">
        <div className="flex flex-col items-center gap-2 text-2xl border-2 border-green-500 bg-green-100 rounded-xl p-4">
          <h3 className="text-blue-500 font-semibold">Total Expenses</h3>
          <p>${dashboardData.totalExpenses}.00</p>
        </div>
        <div className="flex flex-col self-center border-2 border-green-500 bg-green-100 rounded-xl p-4">
          <h3 className="font-semibold text-2xl text-blue-500">
            Most Recent Transactions
          </h3>
          <ul className="text-center my-2 text-xl font-semibold">
            {dashboardData.recentTransactions.map((transaction, idx) => (
              <li key={idx}>
                {transaction.description} - ${transaction.amount}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
