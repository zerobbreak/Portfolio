import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-video overflow-hidden relative">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 z-10" />
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6 flex flex-col h-full">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
          {description}
        </p>

        <div className="mt-auto flex gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
          >
            <FaGithub size={16} />
            Code
          </a>

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium text-sm shadow-md hover:shadow-lg"
            >
              <FaExternalLinkAlt size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

