import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center p-4 border-b border-black backdrop-blur  dark:bg-black/30">
      <h1 className="font-bold">Task Manager</h1>

      <button
        onClick={toggleTheme}
        className="px-3 py-1 border rounded"
      >
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
}
