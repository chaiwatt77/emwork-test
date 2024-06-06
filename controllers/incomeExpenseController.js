import incomeExpense from "../models/IncomeExpenseModel.js";

export const getAllData = async (req, res) => {
  try {
    const { year, month } = req.query;
    const userAuthId = req.userAuthId;
    
    let query = {
      user_id: userAuthId
    };

    if (year && month) {
      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      query.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const result = await incomeExpense.find(query);

    const allIncome = result.reduce((acc, cur) => {
      if (cur.type === 'income') {
        return acc + cur.amount;
      }
      return acc;
    }, 0);

    const allExpense = result.reduce((acc, cur) => {
      if (cur.type === 'expense') {
        return acc + cur.amount;
      }
      return acc;
    }, 0);

    const balance = allIncome - allExpense;

    return res.status(201).json({
      data: result,
      summary: { allIncome, allExpense, balance },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const addIncomeExpense = async (req, res) => {
  try {
    const { type, title, amount, date } = req.body;

    if (!type || !title || !amount || !date ) {
      return res.status(400).json({
        error: "Missing required fields.",
      });
    }

    if(type !== "income" && type !== "expense"){
      return res.status(400).json({
        error: "Type must be income or expense",
      });
    }

    let created_at = new Date();

    const formattedAmount = Number(amount).toFixed(2);
    const incomeExpenseDetail = { ...req.body, amount: formattedAmount };

    const result = new incomeExpense({
      ...incomeExpenseDetail,
      created_at,
      latest_update: created_at,
    });
    await result.save();

    return res.status(201).json({
      message: "Data has been created successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const editIncomeExpense = async (req, res) => {
  try {
    const { type, title, amount, date } = req.body;

    if (!type || !title || !amount || !date ) {
      return res.status(400).json({
        error: "Missing required fields.",
      });
    }

    if(type !== "income" && type !== "expense"){
      return res.status(400).json({
        error: "Type must be Income or Expense",
      });
    }

    const incomeExpenseDetail = await incomeExpense.findById(req.params.id);
    if (!incomeExpenseDetail) {
      return res.status(404).json({ message: "Data not found" });
    }

    incomeExpenseDetail.set({...incomeExpenseDetail, ...req.body});
    incomeExpenseDetail.last_update = new Date();
    const result = await incomeExpenseDetail.save();


    return res.json({
      message: "Data has been updated successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const removeIncomeExpense = async (req, res) => {
  try {

    const incomeExpenseDetail = await incomeExpense.findById(req.params.id);
    if (!incomeExpenseDetail) {
      return res.status(404).json({ message: "Product not found" });
    }
    await incomeExpenseDetail.deleteOne();

    return res.json({
      message: "Data has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
