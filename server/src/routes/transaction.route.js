import express from "express";
import { addTransaction, getTransactions, deleteTransaction, updateTransaction } from "../controllers/transaction.controller.js";

const transactionRouter = express.Router();

transactionRouter.get("/", getTransactions);
transactionRouter.post("/add", addTransaction);
transactionRouter.patch("/:id", updateTransaction);
transactionRouter.delete("/:id", deleteTransaction);

export default transactionRouter;
