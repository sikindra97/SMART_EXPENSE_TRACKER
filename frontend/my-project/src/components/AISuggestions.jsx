import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function AISuggestions({darkMode}) {

  const navigate = useNavigate();
   const [showLoginMsg, setShowLoginMsg] =useState(false);

  const [data, setData] =
    useState(null);
   

  const getSuggestions =
    async () => {
   const token = localStorage.getItem("token");

   if (!token) {
    setShowLoginMsg(true);
    return;
  }
  setShowLoginMsg(false);
      try {

        const res =
          await API.get(
            "/ai/suggestions"
          );

        setData(
          res.data
        );

      } catch (error) {

        console.log(error);
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
      <button
        onClick={getSuggestions}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg mb-4"
      >
        Get AI Suggestions
      </button>
      
{showLoginMsg && (
  <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded-lg mb-4">
    Please login to use AI Suggestions

    <button
      onClick={() => navigate("/login")}
      className="ml-3 text-blue-600 font-semibold underline"
    >
      Login
    </button>
  </div>
)}
      {data && (
        <div>

          <h3 className="font-bold mb-2">
             Highest Category
          </h3>

          <p className="mb-3">
            {data.highestCategory}
          </p>

          <h3 className="font-bold mb-2">
             Total Spent
          </h3>

          <p className="mb-3">
            ₹ {data.totalSpent}
          </p>

          <h3 className="font-bold mb-2">
             Suggestions
          </h3>

          <ul className="list-disc pl-5">
            {data.suggestions.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

        </div>
      )}

    </div>
  );
}

export default AISuggestions;