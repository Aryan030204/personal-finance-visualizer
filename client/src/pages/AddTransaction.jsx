import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { useState } from "react";

function AddTransaction() {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    category: "Food",
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        amount: formData.amount,
        description: formData.description,
        date: formData.date === "" ? Date.now() : formData.date,
        category: formData.category,
      };

      await axios.post(SERVER_URL + `/add`, payload);

      setFormData({
        amount: "",
        description: "",
        date: "",
        category: "Food",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 gap-[4rem]">
      <h1 className="text-4xl font-bold text-red-500">Add New Transaction</h1>
      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-[3rem] border-2 border-yellow-500 p-10 w-1/2 bg-amber-200 rounded-xl"
      >
        {/* Amount */}
        <div className="flex w-full items-center justify-between p-1">
          <label
            htmlFor="amount"
            className="text-blue-500 text-xl font-semibold"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="border-2 p-1 text-center border-gray-400"
            required
          />
        </div>

        {/* Description */}
        <div className="flex w-full items-center justify-between p-1">
          <label
            htmlFor="description"
            className="text-blue-500 text-xl font-semibold"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border-2 p-1 text-start border-gray-400 overflow-auto"
            placeholder="Enter description"
            required
          />
        </div>

        {/* Date */}
        <div className="flex w-full items-center justify-between p-1">
          <label htmlFor="date" className="text-blue-500 text-xl font-semibold">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border-2 p-1 text-center border-gray-400 bg-white"
          />
        </div>

        {/* Category */}
        <div className="flex w-full items-center justify-between p-1">
          <label
            htmlFor="category"
            className="text-blue-500 text-xl font-semibold"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-gray-100 p-1 font-medium border border-black"
            required
          >
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Health">Health</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="bg-purple-500 w-[6rem] text-center font-bold text-white p-2 self-center text-xl rounded-xl hover:bg-purple-600">
          <button className="cursor-pointer" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransaction;
