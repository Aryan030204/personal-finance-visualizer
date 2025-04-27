import { Transaction } from "../models/transaction.model.js";

export const addTransaction = async (req, res) => {
  try {
    const { amount, description, date } = req.body;
    const newTransaction = new Transaction({
      amount,
      description,
      date
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
    const { amount, description, date } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(id, {
      amount,
      description,
      date
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
