import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { useState } from "react";

function AddTransaction() {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
  });

  const handleAdd = async () => {
    if (formData.date == "") {
      await axios.post(SERVER_URL + `/add`, {
        amount: formData.amount,
        description: formData.description,
        date: Date.now(),
      });
    } else {
      await axios.post(SERVER_URL + `/add`, {
        amount: formData.amount,
        description: formData.description,
        date: formData.date,
      });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 gap-[4rem]">
      <h1 className="text-4xl font-bold text-red-500">Add New Transaction</h1>
      <form className="flex flex-col gap-[3rem] border-2 border-yellow-500 p-10 w-1/2 bg-amber-200 rounded-xl">
        <div className="flex w-full items-center justify-between p-1">
          <label
            htmlFor="Amount"
            className="text-blue-500 text-xl font-semibold"
          >
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="enter amount"
            className="border-2 p-1 text-center border-gray-400"
          />
        </div>
        <div className="flex w-full items-center justify-between p-1">
          <label
            htmlFor="Description"
            className="text-blue-500 text-xl font-semibold"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border-2 p-1 text-start border-gray-400 overflow-auto"
            placeholder="enter description"
          />
        </div>
        <div className="flex w-full items-center justify-between p-1">
          <label htmlFor="Date" className="text-blue-500 text-xl font-semibold">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border-2 p-1 text-center border-gray-400 bg-white"
          />
        </div>
        <div className="bg-purple-500 w-[6rem] text-center font-bold text-white p-2 self-center text-xl rounded-xl hover:bg-purple-600">
          <button className="cursor-pointer" onClick={() => handleAdd()}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransaction;
