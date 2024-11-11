"use client";

import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed h-[25px] top-0 right-[25%] sm:right-[50%] p-1 pb-7 bg-gray-500 text-white dark:bg-neutral-300 dark:text-black rounded z-50"
    >
      {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
