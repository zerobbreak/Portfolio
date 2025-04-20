// import { Github, ExternalLink } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
}

export default function ProjectCard({ title, description, image, technologies, githubUrl, liveUrl }: ProjectCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-emerald-500 transition-all duration-300 flex flex-col md:flex-row">
      <div className="md:w-2/5 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="md:w-3/5 p-6 flex flex-col">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span key={index} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>

        <p className="text-gray-400 mb-6 flex-grow">{description}</p>

        <div className="flex gap-4 mt-auto">
          <a
            href={githubUrl}
            target="_blank"
            className="flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
          >
            {/* <Github size={18} /> */}
            Code
          </a>

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              className="flex items-center gap-2 text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md transition-colors"
            >
              {/* <ExternalLink size={18} /> */}
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

