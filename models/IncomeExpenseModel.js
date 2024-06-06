import mongoose from 'mongoose';

const { Schema } = mongoose;

const IncomeExpenseSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  last_update: { type: Date, default: Date.now }
});

const incomeExpense = mongoose.model("incomeExpense", IncomeExpenseSchema, "income_expense");
export default incomeExpense;
