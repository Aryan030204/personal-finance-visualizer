import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { Edit, Trash2 } from "lucide-react";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
  });

  const [category, setCategory] = useState("All");

  const getTransactions = async () => {
    const res = await axios.get(SERVER_URL + "/");
    setTransactions(res.data.data);
  };

  const handleUpdate = async (id, updatedData) => {
    await axios.patch(SERVER_URL + `/${id}`, updatedData);
    setEditMode(null);
    getTransactions();
  };

  const handleDelete = async (id) => {
    await axios.delete(SERVER_URL + `/${id}`);
    getTransactions();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (editMode) {
      setEditedTransaction((prev) => ({
        ...prev,
        category: selectedCategory,
      }));
    }
  };

  const handleEditClick = (transaction) => {
    setEditMode(transaction._id);
    setEditedTransaction({
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date.split("T")[0],
      category: transaction.category || "Food",
    });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const filteredTransactions =
    category === "All"
      ? transactions
      : transactions.filter((transaction) => transaction.category === category);

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold text-red-500">
        All the Transactions are here
      </h1>

      {/* Category Select */}
      <div className="flex w-full items-center justify-between p-4">
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

      {/* Transactions */}
      {filteredTransactions.length > 0 ? (
        <div className="flex flex-col justify-center items-center gap-[3rem] p-4 w-full">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6 w-full max-w-3xl"
            >
              <div className="flex flex-col md:flex-row items-center md:space-x-6 w-full">
                {/* Amount */}
                <div className="flex items-center space-x-2">
                  {editMode === transaction._id ? (
                    <input
                      type="number"
                      name="amount"
                      value={editedTransaction.amount}
                      onChange={handleChange}
                      className="text-xl text-gray-800 p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    <span className="font-semibold text-xl text-gray-800">
                      ${transaction.amount}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="flex items-center space-x-2">
                  {editMode === transaction._id ? (
                    <input
                      type="text"
                      name="description"
                      value={editedTransaction.description}
                      onChange={handleChange}
                      className="text-gray-600 p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    <span className="text-gray-600">
                      {transaction.description}
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center space-x-2">
                  {editMode === transaction._id ? (
                    <input
                      type="date"
                      name="date"
                      value={editedTransaction.date}
                      onChange={handleChange}
                      className="text-gray-600 p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    <span className="text-gray-500">
                      {transaction.date.split("T")[0]}
                    </span>
                  )}
                </div>

                {/* Category */}
                <div className="flex items-center space-x-2">
                  {editMode === transaction._id ? (
                    <select
                      name="category"
                      value={editedTransaction.category}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded bg-gray-200"
                    >
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Health">Health</option>
                    </select>
                  ) : (
                    <span className="text-gray-700">
                      {transaction.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 items-center">
                {editMode === transaction._id ? (
                  <button
                    onClick={() =>
                      handleUpdate(transaction._id, editedTransaction)
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Done
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(transaction)}
                    className="cursor-pointer"
                  >
                    <Edit color="green" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(transaction._id)}
                  className="cursor-pointer"
                >
                  <Trash2 color="red" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>No transactions made so far...</h1>
      )}
    </div>
  );
}

export default Home;
