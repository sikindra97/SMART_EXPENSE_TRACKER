const Expense = require("../models/Expense");

const addExpense = async (req, res) => {
  const { title, amount, category } = req.body;

  const expense = await Expense.create({
    title,
    amount,
    category,
    user: req.user,
  });

  res.json(expense);
};

const getExpenses = async (req, res) => {
  const expenses = await Expense.find({
    user: req.user,
  });

  res.json(expenses);
};

// UPDATE EXPENSE
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category,
      },
      {
        returnDocument: "after",
      }
    );

    res.json(expense);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Expense Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const resetExpenses = async (req, res) => {
  try {
    await Expense.deleteMany({
      user: req.user,
    });

    res.json({
      message: "All expenses deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  resetExpenses,
};