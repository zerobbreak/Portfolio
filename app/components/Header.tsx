import { Link, NavLink } from "react-router";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "About", path: "/#about" },
        { name: "Skills", path: "/#skills" },
        { name: "Projects", path: "/#projects" },
        { name: "Contact", path: "/#contact" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold font-sans tracking-tight flex items-center gap-1">
                    <span className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow-lg shadow-indigo-500/30">UT</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-300"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all shadow-md hover:shadow-lg"
                    >
                        Resume
                    </a>
                    <ThemeToggle />
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <button
                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-lg">
                    <nav className="flex flex-col p-4 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block text-center px-5 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            Resume
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
