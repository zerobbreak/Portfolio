import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { HiArrowUp } from "react-icons/hi";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-10 relative">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 font-mono">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            System Online
          </div>
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Unathi Tshuma — end of transmission_
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/zerobbreak"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-brand-primary hover:border-brand-primary transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/unathi-tshuma-7a30a523b/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-brand-primary hover:border-brand-primary transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={16} />
          </a>
          <a
            href="mailto:utshuma6@gmail.com"
            className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-brand-primary hover:border-brand-primary transition-colors"
            aria-label="Email"
          >
            <BiMailSend size={16} />
          </a>
          <a
            href="#top"
            className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-brand-primary hover:border-brand-primary transition-colors"
            aria-label="Back to top"
          >
            <HiArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
