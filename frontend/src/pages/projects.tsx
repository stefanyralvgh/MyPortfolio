import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

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

  // Función para saber si el link es válido
  const isValidLink = (link: string) => {
    if (!link) return false;
    const invalids = [
      'Not available',
      'No disponible',
      'Indisponible',
      'App offline',
      'RIP',
      'Dev link only',
      'coming soon to a screen near you'
    ];
    return !invalids.some(inv => link.includes(inv));
  };

  // Ordenar proyectos: primero los que tienen link válido
  const sortedProjects = [...projects].sort((a, b) => {
    return (isValidLink(b.link) ? 1 : 0) - (isValidLink(a.link) ? 1 : 0);
  });

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
      <div className="projects-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: '2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' }}>🚀 {language === 'es' ? 'Mis Proyectos' : language === 'fr' ? 'Mes Projets' : 'My Projects'}</h1>
          <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '1.1rem', color: '#7a3fa4', fontWeight: 500, textAlign: 'center' }}>{language === 'es' ? 'Aquí tienes algunos de los proyectos en los que he trabajado' : language === 'fr' ? 'Voici quelques-uns des projets sur lesquels j\'ai travaillé' : 'Here are some of the projects I\'ve worked on'}</p>
        </div>
        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', marginRight: '0.5rem' }}>
          <LanguageSwitcher hideLabel={true} />
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button 
          className="back-button"
          onClick={() => router.push('/')}
        >
          {t('adventure.back')}
        </button>
      </div>
      
      <div className="projects-grid">
        {sortedProjects.map((project) => {
          const isDevOrOffline =
            project.link.includes('Dev link only') || project.link.includes('App offline') || project.link.includes('RIP') || project.link.includes('coming soon to a screen near you');
          return (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p className="project-role">{project.role}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-status">
                <span className={`status-badge ${project.status.includes('✅') ? 'success' : project.status.includes('💀') ? 'error' : 'warning'}`}>{project.status}</span>
              </div>
              <div className="tech-stack">
                <h4>{language === 'es' ? 'Tecnologías:' : language === 'fr' ? 'Technologies:' : 'Technologies:'}</h4>
                <p>{project.tech}</p>
              </div>
              <div className="project-links">
                {isValidLink(project.link) ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-button"
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1.2rem',
                      background: 'transparent',
                      color: '#666',
                      border: '2px solid #cccccc',
                      borderRadius: '1.2rem',
                      textDecoration: 'none',
                      fontWeight: 600,
                      marginTop: '0.5rem',
                      transition: 'background 0.2s, color 0.2s'
                    }}
                  >
                    🌐 {language === 'es' ? 'Ver Proyecto' : language === 'fr' ? 'Voir le Projet' : 'View Project'}
                  </a>
                ) : (
                  <button
                    className="view-project-button"
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1.2rem',
                      background: 'transparent',
                      color: '#666',
                      border: '2px solid #cccccc',
                      borderRadius: '1.2rem',
                      textDecoration: 'none',
                      fontWeight: 600,
                      marginTop: '0.5rem',
                      cursor: 'not-allowed',
                      opacity: 0.7
                    }}
                    disabled
                  >
                    🌐 {project.link}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsPage; 