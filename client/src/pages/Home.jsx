import { useEffect, useState } from "react";
import API from "../services/api";
import Board from "../components/Board";

function Home() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await API.get("/boards");
        setBoards(res.data);

        if (res.data.length > 0) {
          setSelectedBoard(res.data[0].id);
        }
      } catch (err) {
        setError("Failed to load boards ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  // 🌙 Dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* 🔷 HEADER */}
      <div
        className="
          p-4 backdrop-blur-md bg-white/60 dark:bg-gray-900/60 
          border-b border-white/40 dark:border-gray-700 shadow-sm
          flex flex-col md:flex-row 
          md:items-center md:justify-between 
          gap-3
        "
      >
        {/* 🟦 Boards (scrollable) */}
        <div className="flex gap-3 overflow-x-auto">
          {boards.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBoard(b.id)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap
                transition-all duration-200
                ${
                  selectedBoard === b.id
                    ? "bg-blue-600 text-white shadow-md scale-[1.05]"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
                }
              `}
            >
              {b.title}
            </button>
          ))}
        </div>

        {/* 🔍 Search + Toggle */}
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          {/* 🔍 Search */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full sm:w-60 px-4 py-2 rounded-xl
              bg-white dark:bg-gray-800
              border border-gray-300 dark:border-gray-600
              text-sm text-gray-800 dark:text-gray-200
              placeholder-gray-400
              outline-none
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
              transition
            "
          />

          {/* 🌙 Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
              px-3 py-2 rounded-lg 
              bg-gray-200 dark:bg-gray-700 
              text-sm
              w-full sm:w-auto
            "
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* 🔹 CONTENT */}
      <div className="p-4 md:p-6">
        {loading && (
          <div className="text-gray-500 dark:text-gray-400">Loading...</div>
        )}

        {error && (
          <div className="text-red-500 bg-red-100 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        {!loading && selectedBoard && (
          <Board boardId={selectedBoard} search={search} />
        )}
      </div>
    </div>
  );
}

export default Home;
