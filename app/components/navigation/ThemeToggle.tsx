'use client';

import { Sun, Moon } from 'lucide-react';
import { useState } from 'react';

export default function ThemeToggle() {
  // Use lazy initialization to load theme from localStorage
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme === 'dark' : true;
    }
    return true;
  });

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    // TODO: Apply theme to document
    console.log('Theme toggled to:', newTheme ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-bg-secondary hover:bg-bg-card text-text-secondary hover:text-text-primary flex items-center justify-center transition-all"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
