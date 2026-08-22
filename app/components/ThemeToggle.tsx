import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi";

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        // Check system preference or saved theme
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

        const initialTheme = savedTheme || systemTheme;
        setTheme(initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-brand-primary hover:border-brand-primary transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary"
            aria-label="Toggle dark mode"
        >
            {theme === "light" ? <HiMoon size={16} /> : <HiSun size={16} />}
        </button>
    );
}
