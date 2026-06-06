

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import API from "../api";

import OCRUpload from "../components/OCRUpload";
import VoiceExpense from "../components/VoiceExpense";
import ManualExpense from "../components/ManualExpense";
import Navbar from "../components/Navbar";

import ExpensePieChart from "../components/ExpensePieChart";
import AISuggestions from "../components/AISuggestions";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [showAll, setShowAll] = useState(false);
const [editingExpense, setEditingExpense] = useState(null);
const [darkMode, setDarkMode] = useState(false);


const [editTitle, setEditTitle] = useState("");
const [editAmount, setEditAmount] = useState("");
const [editCategory, setEditCategory] = useState("");

  const navigate = useNavigate();

const fetchExpenses = async () => {
  try {
    const res = await API.get("/expenses");
    setExpenses(res.data);
  } catch (error) {
    console.log(error);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }
};


useEffect(() => {
  fetchExpenses();
}, [navigate]);

useEffect(() => {
  const savedDarkMode =
    localStorage.getItem("darkMode");

  if (savedDarkMode) {
    setDarkMode(
      JSON.parse(savedDarkMode)
    );
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "darkMode",
    JSON.stringify(darkMode)
  );
}, [darkMode]);
const logoutHandler = () => {
  localStorage.removeItem("token");

  setExpenses([]);
  setShowAll(false);

  navigate("/");
};
const handleDelete = async (id) => {
  if (!window.confirm("Delete this expense?"))
    return;

  try {
    await API.delete(`/expenses/${id}`);
    fetchExpenses();
  } catch (error) {
    console.log(error);
  }
};
const handleReset = async () => {
  const confirmReset = window.confirm(
    "Delete all expenses?"
  );

  if (!confirmReset) return;

  try {

    await API.delete(
      "/expenses/reset/all"
    );

    fetchExpenses();

  } catch (error) {
    console.log(error);
  }
};
const exportCSV = () => {
  const csv = [
    ["Title", "Amount", "Category"],
    ...expenses.map((e) => [
      e.title,
      e.amount,
      e.category,
    ]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv",
  });

  const link =
    document.createElement("a");

  link.href =
    URL.createObjectURL(blob);

  link.download =
    "expenses.csv";

  link.click();
};
const handleEdit = (expense) => {
  setEditingExpense(expense);

  setEditTitle(expense.title);
  setEditAmount(expense.amount);
  setEditCategory(expense.category);
};

const saveEdit = async () => {
  try {
    await API.put(
      `/expenses/${editingExpense._id}`,
      {
        title: editTitle,
        amount: editAmount,
        category: editCategory,
      }
    );

    setEditingExpense(null);

    fetchExpenses();

  } catch (error) {
    console.log(error);
  }
};
  const totalExpense = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

const displayedExpenses = showAll
  ? expenses
  : expenses.slice(0, 3);



  return (
    
    <div
  className={
    darkMode
      ? "min-h-screen bg-gray-900 text-white transition-all duration-300"
      : "min-h-screen bg-gray-100 transition-all duration-300"
  }
>

      
<Navbar
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  logoutHandler={logoutHandler}
  handleReset={handleReset}
  exportCSV={exportCSV}
/>
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-6">

        {/* Total Expense */}
  <div
  className={`rounded-3xl shadow-2xl p-8 mb-8 ${
    darkMode
      ? "bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-700 text-white"
      : "bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 text-white"
  }`}
>

          <h2 className="text-xl font-semibold">
            Total Expenses
          </h2>

          <p className="text-5xl font-bold mt-3">
            ₹ {totalExpense}
          </p>

        </div>
        {/* OCR + Voice + Manual */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <OCRUpload
  fetchExpenses={fetchExpenses}
  darkMode={darkMode}
/>

<VoiceExpense
  fetchExpenses={fetchExpenses}
  darkMode={darkMode}
/>

<ManualExpense
  fetchExpenses={fetchExpenses}
  darkMode={darkMode}
/>
        </div>

        {/* Chart + AI Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          <div className="lg:col-span-2">
            <ExpensePieChart
  darkMode={darkMode}
/>
          </div>

          


<AISuggestions
  darkMode={darkMode}
/>

        </div>

        

        {/* Expense History */}
        <div
  className={`rounded-2xl shadow p-6 ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white"
  }`}
>

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-semibold">
              Expense History
            </h2>

            {expenses.length > 3 && (
              <button
                onClick={() =>
                  setShowAll(!showAll)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {showAll
                  ? "Show Less"
                  : "View All"}
              </button>
            )}

          </div>

          {expenses.length === 0 ? (

            <p className="text-gray-500">
              No expenses found
            </p>

          ) : (

            displayedExpenses.map(
              (expense) => (
                <div
                  key={expense._id}
                  className="border-b py-4 flex justify-between items-center"
                >
                  <div>

                    <h3 className="font-semibold text-lg">
                      {expense.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {new Date(
                        expense.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>

                 <div className="flex items-center gap-4">

  <span className="text-green-600 font-bold text-lg">
    ₹ {expense.amount}
  </span>

  <button
    onClick={() => handleEdit(expense)}
    className="text-blue-600 hover:text-blue-800"
  >
    <FaEdit />
  </button>

  <button
    onClick={() => handleDelete(expense._id)}
    className="text-red-600 hover:text-red-800"
  >
    <FaTrash />
  </button>

</div>
       </div>
              )
            )

          )}

{editingExpense && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div
  className={`rounded-2xl p-6 w-full max-w-md shadow-xl ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white"
  }`}
>
      <h2 className="text-2xl font-bold mb-4">
        Edit Expense
      </h2>

      <input
        type="text"
        value={editTitle}
        onChange={(e) =>
          setEditTitle(e.target.value)
        }
        placeholder="Expense Title"
        className={`w-full border p-3 rounded-lg mb-3 ${
  darkMode
    ? "bg-gray-700 text-white border-gray-600"
    : "bg-white text-black border-gray-300"
}`}
      />

      <input
        type="number"
        value={editAmount}
        onChange={(e) =>
          setEditAmount(e.target.value)
        }
        placeholder="Amount"
className={`w-full border p-3 rounded-lg mb-3 ${
  darkMode
    ? "bg-gray-700 text-white border-gray-600"
    : "bg-white text-black border-gray-300"
}`}
      />

      <select
        value={editCategory}
        onChange={(e) =>
          setEditCategory(e.target.value)
        }
        className={`w-full border p-3 rounded-lg mb-4 ${
  darkMode
    ? "bg-gray-700 text-white border-gray-600"
    : "bg-white text-black border-gray-300"
}`}
      >
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Market">Market</option>
        <option value="Others">Others</option>
      </select>

      <div className="flex justify-end gap-3">

        <button
          onClick={() =>
            setEditingExpense(null)
          }
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={saveEdit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}

         
        </div>
        {/* Footer */}
<footer
  className={`mt-10 py-6 text-center border-t ${
    darkMode
      ? "border-gray-700 text-gray-400"
      : "border-gray-300 text-gray-600"
  }`}
>
  <h3 className="font-semibold text-lg">
   Smart Expense Tracker
  </h3>

  <p className="mt-2">
    Track • Analyze • Save Money Smarter
  </p>

  <p className="text-sm mt-2">
    © {new Date().getFullYear()} Smart Expense Tracker.
    All Rights Reserved.
  </p>

  <p className="text-sm mt-1">
    Built with ❤️ using React, Node.js, Express & MongoDB
  </p>
</footer>

      </div>

    </div>
  );
}

export default Dashboard;