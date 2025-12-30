import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Portfolio<span className="text-pink-500">.</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex space-x-6">
          <a
            href="https://github.com/zerobbreak"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/unathi-tshuma-7a30a523b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
