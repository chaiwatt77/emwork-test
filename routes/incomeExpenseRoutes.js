import { addIncomeExpense, editIncomeExpense, getAllData, removeIncomeExpense } from "../controllers/incomeExpenseController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { Router } from "express";
const incomeExpense = Router();

incomeExpense.get('/', isLoggedIn, getAllData)
incomeExpense.post('/', isLoggedIn, addIncomeExpense)
incomeExpense.put('/:id', isLoggedIn, editIncomeExpense)
incomeExpense.delete('/:id', isLoggedIn, removeIncomeExpense)

export default incomeExpense;
