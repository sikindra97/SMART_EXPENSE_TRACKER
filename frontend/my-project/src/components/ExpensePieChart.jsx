import { useEffect, useState } from "react";
import API from "../api";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpensePieChart({darkMode}) {

  const [chartData, setChartData] =
    useState([]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData =
    async () => {

      try {

        const res =
          await API.get(
            "/chart/category"
          );

        setChartData(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const data = {

    labels:
      chartData.map(
        item => item.category
      ),

    datasets: [
      {
        label: "Expenses",

        data:
          chartData.map(
            item => item.amount
          ),

        borderWidth: 2,
      },
    ],
  };

  const options = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        position: "bottom",

        labels: {

          boxWidth: 12,

          padding: 15,
        },
      },
    },
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
        Expense By Category
      </h2>

      <div className="h-64 w-full">
        <Pie
          data={data}
          options={options}
        />
      </div>

    </div>
  );
}

export default ExpensePieChart;