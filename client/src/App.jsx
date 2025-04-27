import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import MonthlyChart from "./pages/MonthlyChart";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/monthly-chart" element={<MonthlyChart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
