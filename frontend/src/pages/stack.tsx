import React from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const StackPage: React.FC = () => {
  const router = useRouter();
  const { language, t } = useLanguage();

  const stackData = {
    main: [
      { name: 'Node.js', icon: '🟢', level: 'Advanced' },
      { name: 'PostgreSQL', icon: '🔵', level: 'Advanced' },
      { name: 'GraphQL', icon: '🟣', level: 'Advanced' },
      { name: 'MongoDB', icon: '🟢', level: 'Intermediate' },
      { name: 'Docker', icon: '🔵', level: 'Intermediate' },
      { name: 'AWS', icon: '🟠', level: 'Intermediate' },
      { name: 'Next.js', icon: '⚫', level: 'Intermediate' }
    ],
    familiar: [
      { name: 'Ruby on Rails', icon: '🔴', level: 'Intermediate' },
      { name: 'Bubble.io', icon: '🟡', level: 'Intermediate' },
      { name: 'React', icon: '🔵', level: 'Intermediate' }
    ],
    tools: [
      { name: 'Git', icon: '🟠' },
      { name: 'VS Code', icon: '🔵' },
      { name: 'Postman', icon: '🟠' },
      { name: 'Swagger', icon: '🟢' },
      { name: 'Jest', icon: '🔴' },
      { name: 'Docker Compose', icon: '🔵' }
    ]
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Basic': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="stack-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        color: 'white'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '700' }}>
          🛠️ Tech Stack
        </h1>
        <LanguageSwitcher />
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gap: '2rem'
      }}>
        
        {/* Main Stack */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            margin: '0 0 1.5rem 0',
            fontSize: '1.8rem',
            color: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🚀 Main Stack
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {stackData.main.map((tech, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{tech.icon}</span>
                  <span style={{ fontWeight: '600', color: '#1f2937' }}>{tech.name}</span>
                </div>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  background: getLevelColor(tech.level)
                }}>
                  {tech.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Familiar Technologies */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            margin: '0 0 1.5rem 0',
            fontSize: '1.8rem',
            color: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📚 Also Familiar With
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {stackData.familiar.map((tech, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{tech.icon}</span>
                  <span style={{ fontWeight: '600', color: '#1f2937' }}>{tech.name}</span>
                </div>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  background: getLevelColor(tech.level)
                }}>
                  {tech.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Technologies */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            margin: '0 0 1.5rem 0',
            fontSize: '1.8rem',
            color: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🛠️ Tools & Technologies
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {stackData.tools.map((tool, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{tool.icon}</span>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            margin: '0 0 1.5rem 0',
            fontSize: '1.8rem',
            color: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📊 Quick Stats
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '0.75rem',
              color: 'white'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {stackData.main.length + stackData.familiar.length}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Technologies</div>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '0.75rem',
              color: 'white'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {stackData.tools.length}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Tools</div>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              borderRadius: '0.75rem',
              color: 'white'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                3+
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Years Experience</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
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
          <button
            onClick={() => router.push('/adventure?completed=true')}
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            🚀 Recruiter Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default StackPage; 