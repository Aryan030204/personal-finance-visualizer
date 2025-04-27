import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import MonthlyChart from "./pages/MonthlyChart";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/monthly-chart" element={<MonthlyChart />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
