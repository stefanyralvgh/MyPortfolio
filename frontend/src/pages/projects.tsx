import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchProjects } from '../utils/api';
import { Project } from '../types';
import LanguageSwitcher from '../components/LanguageSwitcher';

const ProjectsPage: React.FC = () => {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let loadingTimeout: NodeJS.Timeout;
    setLoading(true);
    setShowLoading(false);
    loadingTimeout = setTimeout(() => setShowLoading(true), 300);

    const loadProjects = async () => {
      try {
        const projectsData = await fetchProjects(language);
        console.log('Projects data:', projectsData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
        clearTimeout(loadingTimeout);
        setShowLoading(false);
      }
    };

    loadProjects();
    return () => clearTimeout(loadingTimeout);
  }, [language]);

  const handleProjectClick = (link: string) => {
    if (link && typeof link === 'string') {
      const isDisabled = link.includes('Not available') || 
                        link.includes('No disponible') || 
                        link.includes('Pas de lien') || 
                        link.includes('RIP') || 
                        link.includes('Indisponible');
      
      if (!isDisabled) {
        if (link.includes('http')) {
          window.open(link, '_blank');
        } else {
          window.open(`https://${link}`, '_blank');
        }
      }
    }
  };

  return (
    <div className="projects-container">
      {/* Header */}
      <div className="projects-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: '2.5rem', color: '#e75480', textShadow: '0 0 10px rgba(231, 84, 128, 0.5)' }}>
            🚀 {t('projects.title')}
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.1rem', color: '#f3b1e6', textAlign: 'center' }}>
            {t('projects.subtitle')}
          </p>
        </div>
        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', marginRight: '0.5rem' }}>
          <LanguageSwitcher hideLabel={true} />
        </div>
      </div>

      {/* Loading */}
      {showLoading && loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-role">{project.role}</span>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="tech-stack">

                {project.tech && typeof project.tech === 'string' ? 
                  project.tech.split(', ').map((tech, index) => (
                    <span key={index} className="tech-tag">{tech.trim()}</span>
                  ))
                  : 
                  <span className="tech-tag">{project.tech || 'Tech stack not available'}</span>
                }
              </div>
              
              <div className="project-status">
                <span className="status-badge">{project.status}</span>
              </div>
              
              <div className="project-links">
                <button 
                  className="project-link"
                  onClick={() => handleProjectClick(project.link || '')}
                  disabled={false}
                >
                  🔗 {project.link || 'Link not available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back Button */}
      <div className="projects-footer">
        <button 
          className="back-button"
          onClick={() => router.push('/')}
        >
          {t('projects.back')}
        </button>
      </div>
    </div>
  );
};

export default ProjectsPage; 