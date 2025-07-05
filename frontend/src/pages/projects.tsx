import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';

interface Project {
  id: number;
  title: string;
  role: string;
  tech: string;
  description: string;
  status: string;
  link: string;
  created_at: string;
  updated_at: string;
}

const ProjectsPage: React.FC = () => {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/projects?language=${language}`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [language]);

  if (loading) {
    return (
      <div className="projects-container">
        <div className="projects-header">
          <h1>🚀 {language === 'es' ? 'Mis Proyectos' : language === 'fr' ? 'Mes Projets' : 'My Projects'}</h1>
          <p>{language === 'es' ? 'Cargando proyectos...' : language === 'fr' ? 'Chargement des projets...' : 'Loading projects...'}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-container">
        <div className="projects-header">
          <h1>🚀 {language === 'es' ? 'Mis Proyectos' : language === 'fr' ? 'Mes Projets' : 'My Projects'}</h1>
          <p style={{ color: '#e75480' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>🚀 {language === 'es' ? 'Mis Proyectos' : language === 'fr' ? 'Mes Projets' : 'My Projects'}</h1>
        <p>{language === 'es' ? 'Aquí tienes algunos de los proyectos en los que he trabajado' : language === 'fr' ? 'Voici quelques-uns des projets sur lesquels j\'ai travaillé' : 'Here are some of the projects I\'ve worked on'}</p>
        <button 
          className="back-button"
          onClick={() => router.push('/')}
        >
          ← {language === 'es' ? 'Volver al Terminal' : language === 'fr' ? 'Retour au Terminal' : 'Back to Terminal'}
        </button>
      </div>
      
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p className="project-role">{project.role}</p>
            <p className="project-description">{project.description}</p>
            <div className="project-status">
              <span className={`status-badge ${project.status.includes('✅') ? 'success' : project.status.includes('💀') ? 'error' : 'warning'}`}>
                {project.status}
              </span>
            </div>
            <div className="tech-stack">
              <h4>{language === 'es' ? 'Tecnologías:' : language === 'fr' ? 'Technologies:' : 'Technologies:'}</h4>
              <p>{project.tech}</p>
            </div>
            <div className="project-links">
              {project.link && !project.link.includes('Not available') && !project.link.includes('No disponible') && !project.link.includes('Indisponible') && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  🌐 {language === 'es' ? 'Ver Proyecto' : language === 'fr' ? 'Voir le Projet' : 'View Project'}
                </a>
              )}
              <span className="project-link-placeholder">
                {project.link}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage; 