import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function ManualExpense({ fetchExpenses, darkMode }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const navigate = useNavigate();
   const [showLoginMsg, setShowLoginMsg] =useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
      const token = localStorage.getItem("token");

   if (!token) {
    setShowLoginMsg(true);
    return;
  }
  setShowLoginMsg(false);
    try {
      await API.post("/expenses", {
        title,
        amount,
        category,
      });

      alert("Expense Added Successfully");

      setTitle("");
      setAmount("");
      setCategory("Food");

      fetchExpenses();

    } catch (error) {
      console.log(error);
      alert("Failed to add expense");
    }
  };

  return (
   <div
  className={`p-6 rounded-2xl shadow ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white text-black"
  }`}
>
      <h2 className="text-xl font-semibold mb-4">
        Manual Expense Entry
      </h2>
   {showLoginMsg && (
  <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded-lg mb-4 flex justify-between items-center">
    <span>
     Please login to add expenses
    </span>

    <button
      onClick={() => navigate("/login")}
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
    >
      Login
    </button>
  </div>
)}

      <form
        onSubmit={submitHandler}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
         className={`w-full border p-3 rounded-lg ${
  darkMode
    ? "bg-gray-700 text-white border-gray-600"
    : "bg-white text-black border-gray-300"
}`}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className={`w-full border p-3 rounded-lg ${
  darkMode
    ? "bg-gray-700 text-white border-gray-600"
    : "bg-white text-black border-gray-300"
}`}
          required
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        className={`w-full border p-3 rounded-lg ${
  darkMode
    ? "bg-gray-700 text-white border-gray-600"
    : "bg-white text-black border-gray-300"
}`}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Market</option>
          <option>Others</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ManualExpense;