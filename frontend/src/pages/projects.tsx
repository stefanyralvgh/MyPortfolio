import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import LoadingSpinner from '../components/LoadingSpinner';
import { ProjectDisplay } from '../interfaces/projectInterfaces';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const ProjectsPage: React.FC = () => {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState<ProjectDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects?language=${language}`);
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


  const isValidLink = (link: string) => {
    return typeof link === 'string' && (link.startsWith('http://') || link.startsWith('https://'));
  };


  const sortedProjects = [...projects].sort((a, b) => {
    return (isValidLink(b.link) ? 1 : 0) - (isValidLink(a.link) ? 1 : 0);
  });

  const noddNote = {
    es: 'Puede estar temporalmente fuera de línea mientras se hacen pruebas.',
    en: 'Currently undergoing changes and will be turned off when not in use.',
    fr: 'Actuellement en maintenance, il sera éteint lorsqu\'il n\'est pas utilisé.'
  };

  return (
    <div className="projects-container">
      <div className="header-bar">
        <h1>{language === 'es' ? 'Mis Proyectos' : language === 'fr' ? 'Mes Projets' : 'My Projects'}</h1>
        <div className="language-switcher-fixed">
          <LanguageSwitcher hideLabel={true} />
        </div>
      </div>
      <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '1.1rem', color: '#7a3fa4', fontWeight: 500, textAlign: 'center' }}>
        {language === 'es'
          ? 'Aquí tienes algunos de los proyectos en los que he trabajado'
          : language === 'fr'
          ? 'Voici quelques-uns des projets sur lesquels j\'ai travaillé'
          : 'Here are some of the projects I\'ve worked on'}
      </p>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p style={{ color: '#e75480' }}>Error: {error}</p>
      ) : (
        <div className="projects-grid">
          {sortedProjects.map((project) => {
            const isDevOrOffline =
              project.link.includes('Dev link only') || project.link.includes('App offline') || project.link.includes('RIP') || project.link.includes('coming soon to a screen near you');
            return (
              <div key={project.id} className="project-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
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
                </div>
                <div className="project-links" style={{ marginTop: 'auto', position: 'relative' }}>
                  {isValidLink(project.link) ? (
                    project.link.includes('getnodd.com') ? (
                      <div style={{ position: 'relative', width: '100%' }}>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="view-project-button"
                          style={{
                            width: '100%',
                            display: 'block',
                            padding: '0.5rem 1.2rem',
                            background: 'transparent',
                            color: '#666',
                            border: '2px solid #cccccc',
                            borderRadius: '1.2rem',
                            textDecoration: 'none',
                            fontWeight: 600,
                            marginTop: '0.5rem',
                            transition: 'background 0.2s, color 0.2s',
                            position: 'relative'
                          }}
                          onMouseEnter={e => {
                            const tooltip = e.currentTarget.nextSibling as HTMLElement;
                            if (tooltip) tooltip.style.opacity = '1';
                          }}
                          onMouseLeave={e => {
                            const tooltip = e.currentTarget.nextSibling as HTMLElement;
                            if (tooltip) tooltip.style.opacity = '0';
                          }}
                        >
                          🌐 {language === 'es' ? 'Ver Proyecto' : language === 'fr' ? 'Voir le Projet' : 'View Project'}
                        </a>
                        <span
                          style={{
                            opacity: 0,
                            pointerEvents: 'none',
                            transition: 'opacity 0.2s',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            bottom: '120%',
                            background: '#222',
                            color: '#fff',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.7rem',
                            fontSize: '0.95rem',
                            whiteSpace: 'pre-line',
                            zIndex: 10,
                            maxWidth: '260px',
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                          }}
                        >
                          {noddNote[language] || noddNote['en']}
                        </span>
                      </div>
                    ) : (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-project-button"
                        style={{
                          width: '100%',
                          display: 'block',
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
                    )
                  ) : (
                    <button
                      className="view-project-button"
                      style={{
                        width: '100%',
                        display: 'block',
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
      )}
      <div className="projects-footer" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <button 
          className="back-button"
          onClick={() => router.push('/')}
        >
          {t('adventure.back')}
        </button>
      </div>
    </div>
  );
};

export default ProjectsPage; 