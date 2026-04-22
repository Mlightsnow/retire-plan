"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 hover:bg-[var(--gold)]/10 group"
      aria-label="切换主题"
    >
      <Sun className="h-6 w-6 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-[var(--gold)]" />
      <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-[var(--gold-light)]" />
      <span className="sr-only">切换主题</span>
    </button>
  );
}
