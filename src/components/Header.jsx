import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo1-studio.png";

const Header = () => {
  const { pathname } = useLocation();
  //   const [darkMode, setDarkMode] = useState(
  //     localStorage.getItem("theme") === "dark"
  //   );
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") return true;
    if (savedTheme === "light") return false;

    // Fallback to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const showAdminLink = import.meta.env.VITE_SHOW_ADMIN === "true";

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="bg-neutral-100 dark:bg-neutral-950 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-6 w-auto mb-[2px]" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Tech Tutorials Hub
          </span>
        </Link>

        <nav className="space-x-4 text-sm font-medium ml-auto flex items-center">
          <Link
            to="/"
            className={`hover:text-blue-600 ${
              pathname === "/"
                ? "text-blue-600"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Home
          </Link>
          {showAdminLink && (
            <Link
              to="/admin"
              className={`hover:text-blue-600 ${
                pathname === "/admin"
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Admin
            </Link>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 text-xs px-2 py-1 border rounded text-gray-600 dark:text-gray-300 border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
