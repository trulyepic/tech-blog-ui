import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo1-studio.png";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  //   const [darkMode, setDarkMode] = useState(
  //     localStorage.getItem("theme") === "dark"
  //   );
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    } catch (err) {
      console.warn("Could not access localStorage:", err);
    }
  }, []);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;

    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") return true;
      if (savedTheme === "light") return false;
    } catch (e) {
      console.warn("Theme storage not accessible", e);
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // const [user, setUser] = useState(() => {
  //   if (typeof window === "undefined") return null;

  //   try {
  //     const stored = window.localStorage.getItem("user");
  //     return stored ? JSON.parse(stored) : null;
  //   } catch (err) {
  //     console.warn("Could not access localStorage:", err);
  //     return null;
  //   }
  // });

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (err) {
        console.warn("Unable to save theme to localStorage (dark):", err);
      }
    } else {
      root.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch (err) {
        console.warn("Unable to save theme to localStorage (light):", err);
      }
    }
  }, [darkMode]);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  //   const showAdminLink = import.meta.env.VITE_SHOW_ADMIN === "true";

  return (
    <header className="bg-neutral-100 dark:bg-neutral-950 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-6 w-auto mb-[2px]" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Code Sprig
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
          {user && (
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

          {!user ? (
            <>
              <Link
                to="/login"
                className={`hover:text-blue-600 ${
                  pathname === "/login"
                    ? "text-blue-600"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`hover:text-blue-600 ${
                  pathname === "/register"
                    ? "text-blue-600"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-xs px-2 py-1 border rounded text-gray-600 dark:text-gray-300 border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Logout
            </button>
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
