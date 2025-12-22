import React from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const RecruiterPage: React.FC = () => {
  const router = useRouter();
  const { language, t } = useLanguage();

  const recruiterData = {
    intro: {
      es: "¡Hola! Soy Stef, desarrolladora backend con mentalidad de producto, fuertes habilidades en diseño de APIs y un profundo interés en arquitectura escalable. Busco equipos remotos internacionales construyendo cosas significativas.",
      en: "Hi! I'm Stef, a backend developer with a product mindset, strong API design skills, and a deep interest in scalable architecture. Looking for fully remote, international teams building meaningful stuff.",
      fr: "Salut ! Je suis Stef, développeuse backend avec une mentalité produit, de solides compétences en conception d'API et un vif intérêt pour l'architecture évolutive. Je recherche des équipes internationales à distance construisant des choses significatives."
    },
    mainStack: {
      es: "Stack principal: Node.js, PostgreSQL, GraphQL, MongoDB, Docker, AWS, Next.js",
      en: "Main stack: Node.js, PostgreSQL, GraphQL, MongoDB, Docker, AWS, Next.js",
      fr: "Stack principal : Node.js, PostgreSQL, GraphQL, MongoDB, Docker, AWS, Next.js"
    },
    familiar: {
      es: "También familiarizada con: Ruby on Rails, Bubble.io, React",
      en: "Also familiar with: Ruby on Rails, Bubble.io, React",
      fr: "Aussi familière avec : Ruby on Rails, Bubble.io, React"
    },
    projects: [
      {
        name: "Aidactic",
        description: {
          es: "Backend REST + GraphQL, MongoDB, S3, API dockerizada, documentación Swagger",
          en: "REST + GraphQL backend, MongoDB, S3, Dockerized API, Swagger docs",
          fr: "Backend REST + GraphQL, MongoDB, S3, API dockerisée, documentation Swagger"
        }
      },
      {
        name: "Nodd",
        description: {
          es: "Distribución de audio con AWS Lambda + S3, PostgreSQL, Express",
          en: "Audio distribution with AWS Lambda + S3, PostgreSQL, Express",
          fr: "Distribution audio avec AWS Lambda + S3, PostgreSQL, Express"
        }
      },
      {
        name: "Diidoo",
        description: {
          es: "Bubble.io + integración Wompi, flujos de trabajo complejos",
          en: "Bubble.io + Wompi integration, complex workflows",
          fr: "Bubble.io + intégration Wompi, flux de travail complexes"
        }
      },
      {
        name: "Refugio Henry",
        description: {
          es: "Backend Node + Google Auth + MercadoPago",
          en: "Node backend + Google Auth + MercadoPago",
          fr: "Backend Node + Google Auth + MercadoPago"
        }
      }
    ]
  };

  const handleDownloadCV = async (lang: 'es' | 'en') => {
    try {
      // Obtener el profile que tiene las URLs de los CVs
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/profile`);
      const profileData = await response.json();
      
      const cvUrl = profileData.cv_urls?.[lang];
      
      if (cvUrl) {
        window.open(cvUrl, '_blank');
      } else {
        alert(language === 'es' 
          ? 'CV no disponible en este idioma' 
          : language === 'fr'
          ? 'CV non disponible dans cette langue'
          : 'CV not available in this language'
        );
      }
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Error al descargar el CV');
    }
  };

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
            {recruiterData.intro[language]}
          </p>
        </div>

   
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
            <p style={{
              fontSize: '1.1rem',
              margin: 0,
              fontWeight: '600',
              color: '#e75480'
            }}>
              {recruiterData.mainStack[language]}
            </p>
            <p style={{
              fontSize: '1rem',
              margin: 0,
              color: '#f3b1e6'
            }}>
              {recruiterData.familiar[language]}
            </p>
          </div>
        </div>

  
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
            {recruiterData.projects.map((project, index) => (
              <div key={index} style={{
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
                      {project.name}
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: '#f3b1e6',
                      lineHeight: '1.5'
                    }}>
                      {project.description[language]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

     
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
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'rgba(231, 84, 128, 0.2)',
              borderRadius: '0.75rem',
              color: '#f3b1e6',
              border: '1px solid #e75480'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#e75480' }}>
                2+
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                {language === 'es' ? 'Años de experiencia' : language === 'fr' ? "Années d'expérience" : 'Years Experience'}
              </div>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'rgba(231, 84, 128, 0.1)',
              borderRadius: '0.75rem',
              color: '#f3b1e6',
              border: '1px solid rgba(231, 84, 128, 0.3)'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#e75480' }}>
                100%
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                {language === 'es' ? 'Remoto' : language === 'fr' ? 'Télétravail' : 'Remote'}
              </div>
            </div>
          </div>
        </div>

     
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
              onClick={() => window.open('https://github.com/stefanyralvgh/MyPortfolio', '_blank')}
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
              onClick={() => window.open('https://www.linkedin.com/in/stefanyralvli/', '_blank')}
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