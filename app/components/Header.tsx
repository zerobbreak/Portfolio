import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navItems = [
        { name: "About", path: "/#about", index: "01" },
        { name: "Skills", path: "/#skills", index: "02" },
        { name: "Projects", path: "/#projects", index: "03" },
        { name: "Contact", path: "/#contact", index: "04" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/85 backdrop-blur-md border-b ${scrolled ? "border-border" : "border-transparent"
                }`}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link
                    to="/"
                    className="group flex items-center gap-2 font-mono text-sm font-bold tracking-tight no-underline text-foreground"
                >
                    <span className="text-brand-primary">[</span>
                    <span className="group-hover:text-brand-primary transition-colors">
                        UNATHI.TSHUMA
                    </span>
                    <span className="text-brand-primary">]</span>
                    <span className="inline-block w-[7px] h-[14px] bg-brand-primary animate-pulse ml-0.5" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 font-mono">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `group relative text-[11px] font-medium tracking-[0.15em] uppercase no-underline transition-colors ${isActive
                                    ? "text-brand-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                }`
                            }
                        >
                            <span className="text-brand-primary/60 mr-1.5">
                                {item.index}
                            </span>
                            {item.name}
                            <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand-primary transition-all duration-300 group-hover:w-full" />
                        </NavLink>
                    ))}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 border border-border text-[11px] font-semibold tracking-[0.15em] uppercase text-foreground hover:border-brand-primary hover:text-brand-primary transition-colors no-underline"
                    >
                        [ Resume ]
                    </a>
                    <ThemeToggle />
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <ThemeToggle />
                    <button
                        className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-brand-primary hover:border-brand-primary focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <HiX size={18} /> : <HiMenu size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <div
                className={`md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg transition-all duration-300 ease-in-out font-mono ${isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
            >
                <nav className="flex flex-col p-6 gap-5">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="text-sm font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-brand-primary no-underline"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="text-brand-primary/60 mr-2">
                                {item.index}
                            </span>
                            {item.name}
                        </Link>
                    ))}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block text-center px-5 py-3 border border-border text-xs font-semibold tracking-[0.15em] uppercase text-foreground hover:border-brand-primary hover:text-brand-primary no-underline"
                        onClick={() => setIsOpen(false)}
                    >
                        [ Resume ]
                    </a>
                </nav>
            </div>
        </header>
    );
}
