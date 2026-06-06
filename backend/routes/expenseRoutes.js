const express = require("express");

const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  resetExpenses,
} = require("../controllers/expenseController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ADD EXPENSE
router.post("/", protect, addExpense);

// GET ALL EXPENSES
router.get("/", protect, getExpenses);

// RESET ALL EXPENSES
// IMPORTANT: Keep this ABOVE "/:id"
router.delete(
  "/reset/all",
  protect,
  resetExpenses
);

// UPDATE EXPENSE
router.put(
  "/:id",
  protect,
  updateExpense
);

// DELETE SINGLE EXPENSE
router.delete(
  "/:id",
  protect,
  deleteExpense
);

module.exports = router;