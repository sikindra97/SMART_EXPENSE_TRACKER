// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../api";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post(
//         "/auth/login",
//         formData
//       );

//       console.log(res.data);

//       localStorage.setItem(
//         "token",
//         res.data.token
//       );
//       console.log("Login Response:", res.data);
// console.log(
//   "Saved Token:",
//   localStorage.getItem("token")
// );

//       alert("Login Successful");

//       navigate("/dashboard", {
//         replace: true,
//       });

//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//         "Login Failed"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">

//       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

//         <h1 className="text-3xl font-bold text-center mb-2">
//           Smart Expense Tracker
//         </h1>

//         <p className="text-center text-gray-500 mb-6">
//           Welcome Back 👋
//         </p>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4"
//         >

//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full border p-3 rounded-lg"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full border p-3 rounded-lg"
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//           >
//             Login
//           </button>

//         </form>

//         <p className="text-center mt-4">
//           Don't have an account?{" "}
//           <Link
//             to="/register"
//             className="text-blue-600 font-semibold"
//           >
//             Register
//           </Link>
//         </p>

//       </div>

//     </div>
//   );
// }

// export default Login;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        formData
      );

      console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );
      console.log("Login Response:", res.data);
console.log(
  "Saved Token:",
  localStorage.getItem("token")
);

      alert("Login Successful");

     window.location.href = "/dashboard";

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Smart Expense Tracker
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Welcome Back 👋
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;