
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Protected Route
function PrivateRoute({ children }) {
  const token =
    localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Route */}
       <Route
  path="/dashboard"
  element={<Dashboard />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;