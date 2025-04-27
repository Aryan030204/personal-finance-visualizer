import React, { useState } from "react";
import Chart from "../components/Chart";

const MonthlyChart = () => {
  const [category, setCategory] = useState("All");

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };

  return (
    <div className="flex flex-col p-10 gap-[5rem] items-center justify-center w-full">
      <div className="w-full text-center">
        <h1 className="text-4xl font-bold text-red-500">
          Your Monthly Expense Chart
        </h1>
      </div>

      {/* Category Dropdown */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-fit items-center justify-between p-3 gap-5 bg-gray-300 rounded-xl my-5">
          <label htmlFor="Category">Category</label>
          <select
            name="categories"
            className="border p-1 border-black bg-gray-200"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="flex justify-center items-center">
        <Chart category={category} />
      </div>
    </div>
  );
};

export default MonthlyChart;
