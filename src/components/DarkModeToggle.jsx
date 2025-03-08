import React, { useState, useEffect } from "react";
import "./../styles/DarkMode.css";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <button 
      className={`toggle-btn ${isDarkMode ? "dark" : "light"}`} 
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default DarkModeToggle;
