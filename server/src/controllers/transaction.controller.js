import { Transaction } from "../models/transaction.model.js";

export const addTransaction = async (req, res) => {
  try {
    const { amount, description, date, category } = req.body;
    const newTransaction = new Transaction({
      amount,
      description,
      date,
      category,
    });

    await newTransaction.save();
    res.status(201).json({
      success: true,
      data: newTransaction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, date, category } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(id, {
      amount,
      description,
      date,
      category,
    });
    res.status(200).json({
      success: true,
      message: "transaction updated successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      message: "transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchDashboard = async (req, res) => {
  try {
    const totalExpenses = await Transaction.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    const recentTransactions = await Transaction.find()
      .sort({ date: -1 })
      .limit(5);

    res.json({
      totalExpenses: totalExpenses[0]?.totalAmount || 0,
      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
