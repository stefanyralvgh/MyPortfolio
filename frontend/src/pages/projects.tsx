import React from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';

const ProjectsPage: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: 'Interactive Portfolio',
      description: 'Portfolio interactivo estilo terminal con Ruby on Rails backend y Next.js frontend. Incluye sistema de niveles, multilenguaje y animaciones.',
      tech: ['Ruby on Rails', 'Next.js', 'TypeScript', 'PostgreSQL'],
      github: '#',
      live: '#'
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      description: 'Plataforma completa de e-commerce con sistema de pagos, gestión de inventario y panel administrativo.',
      tech: ['Ruby on Rails', 'PostgreSQL', 'Redis', 'Stripe API'],
      github: '#',
      live: '#'
    },
    {
      id: 3,
      title: 'Healthcare Management System',
      description: 'Sistema de gestión para clínicas dentales con citas, historiales médicos y reportes.',
      tech: ['Ruby on Rails', 'PostgreSQL', 'Bootstrap', 'Chart.js'],
      github: '#',
      live: '#'
    },
    {
      id: 4,
      title: 'API REST Service',
      description: 'API RESTful para aplicación móvil con autenticación JWT, rate limiting y documentación automática.',
      tech: ['Ruby on Rails', 'PostgreSQL', 'JWT', 'Swagger'],
      github: '#',
      live: '#'
    }
  ];

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>🚀 My Projects</h1>
        <p>Here are some of the projects I've worked on</p>
        <button 
          className="back-button"
          onClick={() => router.push('/')}
        >
          ← Back to Terminal
        </button>
      </div>
      
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-stack">
              {project.tech.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                🐙 GitHub
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                🌐 Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage; 