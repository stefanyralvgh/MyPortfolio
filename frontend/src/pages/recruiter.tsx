import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

interface Profile {
  subtitle: { [key: string]: string };
  main_stack?: { [key: string]: string };
  familiar?: { [key: string]: string };
  quick_stats?: {
    years_experience?: string;
    remote?: string;
  };
  cv_urls?: {
    es?: string;
    en?: string;
  };
  social_links?: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

interface Project {
  id: number;
  title: string;
  tech: string;
}

const RecruiterPage: React.FC = () => {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [language]);

  const fetchData = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      // Fetch profile
      const profileRes = await fetch(`${API_URL}/profile`);
      const profileData = await profileRes.json();
      setProfile(profileData);
      
      // Fetch projects
      const projectsRes = await fetch(`${API_URL}/projects?language=${language}`);
      const projectsData = await projectsRes.json();
      setProjects(projectsData.slice(0, 4)); // Solo primeros 4 proyectos
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCV = (lang: 'es' | 'en') => {
    if (profile?.cv_urls?.[lang]) {
      window.open(profile.cv_urls[lang], '_blank');
    } else {
      alert(
        language === 'es'
          ? 'CV no disponible en este idioma'
          : language === 'fr'
          ? 'CV non disponible dans cette langue'
          : 'CV not available in this language'
      );
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #181824 0%, #2d193c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f3b1e6',
        fontFamily: 'Courier New, Monaco, Menlo, monospace',
      }}>
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #181824 0%, #2d193c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f3b1e6',
        fontFamily: 'Courier New, Monaco, Menlo, monospace',
      }}>
        Error loading data
      </div>
    );
  }

  return (
    <div className="recruiter-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #181824 0%, #2d193c 100%)',
      padding: '2rem',
      fontFamily: 'Courier New, Monaco, Menlo, monospace',
      color: '#f3b1e6'
    }}>

      <div className="header-bar">
        <h1>{t('recruiter.mode')}</h1>
        <div className="language-switcher-fixed">
          <LanguageSwitcher hideLabel={true} />
        </div>
      </div>

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'grid',
        gap: '2.5rem'
      }}>
        
        {/* Intro */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '1rem',
          padding: '2.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          color: '#f3b1e6',
          border: '1px solid rgba(243, 177, 230, 0.2)'
        }}>
          <p style={{
            fontSize: '1.3rem',
            lineHeight: '1.6',
            margin: 0,
            fontWeight: '500',
            textAlign: 'center',
            color: '#f3b1e6'
          }}>
            {profile.subtitle?.[language] || profile.subtitle?.en || ''}
          </p>
        </div>

        {/* Tech Stack */}
        {(profile.main_stack || profile.familiar) && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '1rem',
            padding: '2.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            color: '#f3b1e6',
            border: '1px solid rgba(243, 177, 230, 0.2)'
          }}>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              fontSize: '1.8rem',
              color: '#f3b1e6',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {t('recruiter.tech_stack')}
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {profile.main_stack && (
                <p style={{
                  fontSize: '1.1rem',
                  margin: 0,
                  fontWeight: '600',
                  color: '#e75480'
                }}>
                  {profile.main_stack[language] || profile.main_stack.en}
                </p>
              )}
              {profile.familiar && (
                <p style={{
                  fontSize: '1rem',
                  margin: 0,
                  color: '#f3b1e6'
                }}>
                  {profile.familiar[language] || profile.familiar.en}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Key Projects - Desde API de projects */}
        {projects.length > 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '1rem',
            padding: '2.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            color: '#f3b1e6',
            border: '1px solid rgba(243, 177, 230, 0.2)'
          }}>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              fontSize: '1.8rem',
              color: '#f3b1e6',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {t('recruiter.key_projects')}
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {projects.map((project) => (
                <div key={project.id} style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(243, 177, 230, 0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}>
                    <span style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#e75480',
                      minWidth: 'fit-content'
                    }}>
                      •
                    </span>
                    <div>
                      <h3 style={{
                        margin: '0 0 0.5rem 0',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#f3b1e6'
                      }}>
                        {project.title}
                      </h3>
                      <p style={{
                        margin: 0,
                        fontSize: '1rem',
                        color: '#f3b1e6',
                        lineHeight: '1.5'
                      }}>
                        {project.tech}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {profile.quick_stats && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '1rem',
            padding: '2.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            color: '#f3b1e6',
            border: '1px solid rgba(243, 177, 230, 0.2)'
          }}>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              fontSize: '1.8rem',
              color: '#f3b1e6',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {t('recruiter.quick_stats')}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              {profile.quick_stats.years_experience && (
                <div style={{
                  textAlign: 'center',
                  padding: '1.5rem',
                  background: 'rgba(231, 84, 128, 0.2)',
                  borderRadius: '0.75rem',
                  color: '#f3b1e6',
                  border: '1px solid #e75480'
                }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#e75480' }}>
                    {profile.quick_stats.years_experience}
                  </div>
                  <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                    {language === 'es' ? 'Años de experiencia' : language === 'fr' ? "Années d'expérience" : 'Years Experience'}
                  </div>
                </div>
              )}
              {profile.quick_stats.remote && (
                <div style={{
                  textAlign: 'center',
                  padding: '1.5rem',
                  background: 'rgba(231, 84, 128, 0.1)',
                  borderRadius: '0.75rem',
                  color: '#f3b1e6',
                  border: '1px solid rgba(231, 84, 128, 0.3)'
                }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#e75480' }}>
                    {profile.quick_stats.remote}
                  </div>
                  <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                    {language === 'es' ? 'Remoto' : language === 'fr' ? 'Télétravail' : 'Remote'}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '1rem',
          padding: '2.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          color: '#f3b1e6',
          border: '1px solid rgba(243, 177, 230, 0.2)'
        }}>
          <h2 style={{
            margin: '0 0 1.5rem 0',
            fontSize: '1.8rem',
            color: '#f3b1e6',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🔗 {t('recruiter.quick_links')}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <button
              className="back-button"
              onClick={() => window.open(profile.social_links?.github || 'https://github.com/stefanyralvgh/MyPortfolio', '_blank')}
              style={{
                background: 'rgba(231, 84, 128, 0.2)',
                color: '#f3b1e6',
                border: '2px solid #e75480'
              }}
            >
              <span>🐙</span> {t('recruiter.github')}
            </button>
            <button
              className="back-button"
              onClick={() => window.open(profile.social_links?.linkedin || 'https://www.linkedin.com/in/stefanyralvli/', '_blank')}
              style={{
                background: 'rgba(243, 177, 230, 0.2)',
                color: '#f3b1e6',
                border: '2px solid #f3b1e6'
              }}
            >
              <span>💼</span> {t('recruiter.linkedin')}
            </button>
            <button
              className="back-button"
              onClick={() => handleDownloadCV(language === 'es' ? 'es' : 'en')}
              style={{
                background: 'rgba(231, 84, 128, 0.1)',
                color: '#f3b1e6',
                border: '2px solid rgba(231, 84, 128, 0.3)'
              }}
            >
              <span>📄</span> {t('recruiter.download_cv')}
            </button>
            <button
              className="back-button"
              onClick={() => router.push('/stack')}
              style={{
                background: 'rgba(243, 177, 230, 0.1)',
                color: '#f3b1e6',
                border: '2px solid rgba(243, 177, 230, 0.3)'
              }}
            >
              <span>🛠️</span> {t('recruiter.view_stack')}
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <button
            className="back-button"
            onClick={() => router.push('/')}
          >
            {t('adventure.back')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage;