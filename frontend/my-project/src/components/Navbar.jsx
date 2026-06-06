import {
  FaMoon,
  FaSun,
  FaFileExport,
  FaRedo,
  FaSignOutAlt,
  FaWallet,
} from "react-icons/fa";

function Navbar({
  darkMode,
  setDarkMode,
  logoutHandler,
  handleReset,
  exportCSV,
}) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4">

        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
            <FaWallet className="text-white text-2xl" />
          </div>

          <div>
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Smart Expense Tracker
            </h1>

            <p
              className={`text-sm ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              AI Powered Expense Management
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:scale-105 ${
              darkMode
                ? "bg-yellow-500 text-black"
                : "bg-gray-900 text-white"
            }`}
          >
            {darkMode ? (
              <>
                <FaSun />
                Light
              </>
            ) : (
              <>
                <FaMoon />
                Dark
              </>
            )}
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium bg-emerald-600 text-white shadow-md hover:bg-emerald-700 hover:scale-105 transition-all duration-300"
          >
            <FaFileExport />
            Export
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium bg-amber-500 text-white shadow-md hover:bg-amber-600 hover:scale-105 transition-all duration-300"
          >
            <FaRedo />
            Reset
          </button>

          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium bg-red-500 text-white shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;