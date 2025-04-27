import express from "express";
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  fetchDashboard,
} from "../controllers/transaction.controller.js";

const transactionRouter = express.Router();

transactionRouter.get("/", getTransactions);
transactionRouter.post("/add", addTransaction);
transactionRouter.patch("/:id", updateTransaction);
transactionRouter.delete("/:id", deleteTransaction);
transactionRouter.get("/dashboard", fetchDashboard);
export default transactionRouter;
