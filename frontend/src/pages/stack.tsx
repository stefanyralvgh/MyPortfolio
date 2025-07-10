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
        { name: 'Express', icon: '🟢', level: 'Advanced' },
        { name: 'PostgreSQL', icon: '🔵', level: 'Advanced' },
        { name: 'TypeScript', icon: '🔵', level: 'Advanced' },
        { name: 'GraphQL', icon: '🟣', level: 'Basic' },
        { name: 'MongoDB', icon: '🟢', level: 'Intermediate' },
        { name: 'Docker', icon: '🔵', level: 'Intermediate' },
        { name: 'AWS', icon: '🟠', level: 'Intermediate' },
        { name: 'Next.js', icon: '⚫', level: 'Intermediate' }
      ],
    familiar: [
      { name: 'Ruby on Rails', icon: '🔴', level: 'Basic' },
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

  const getLevelTranslation = (level: string) => {
    switch (level) {
      case 'Advanced': return t('stack.level.advanced');
      case 'Intermediate': return t('stack.level.intermediate');
      case 'Basic': return t('stack.level.basic');
      default: return level;
    }
  };

  return (
    <div className="stack-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #181824 0%, #2d193c 100%)',
      padding: '2rem',
      fontFamily: 'Courier New, Monaco, Menlo, monospace'
    }}>
      {/* Header */}
      <div className="stack-header">
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '700', color: '#e75480' }}>
           {t('stack.title')}
        </h1>
        <div className="language-switcher"><LanguageSwitcher hideLabel={true} /></div>
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
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
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
             {t('stack.main')}
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
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(243, 177, 230, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{tech.icon}</span>
                  <span style={{ fontWeight: '600', color: '#f3b1e6' }}>{tech.name}</span>
                </div>
                <span className="stack-level-tag" style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  background: getLevelColor(tech.level)
                }}>
                  {getLevelTranslation(tech.level)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Familiar Technologies */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
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
             {t('stack.familiar')}
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
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(243, 177, 230, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{tech.icon}</span>
                  <span style={{ fontWeight: '600', color: '#f3b1e6' }}>{tech.name}</span>
                </div>
                <span className="stack-level-tag" style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  background: getLevelColor(tech.level)
                }}>
                  {getLevelTranslation(tech.level)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Technologies */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
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
             {t('stack.tools')}
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
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(243, 177, 230, 0.2)'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{tool.icon}</span>
                <span style={{ fontWeight: '600', color: '#f3b1e6' }}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
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
             {t('stack.stats')}
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
                {stackData.main.length + stackData.familiar.length}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>{t('stack.technologies')}</div>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'rgba(243, 177, 230, 0.2)',
              borderRadius: '0.75rem',
              color: '#f3b1e6',
              border: '1px solid #f3b1e6'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#f3b1e6' }}>
                {stackData.tools.length}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>{t('stack.tools.label')}</div>
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
                2+
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>{t('stack.experience')}</div>
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
            className="back-button"
            onClick={() => router.push('/recruiter')}
            style={{
              background: 'rgba(243, 177, 230, 0.2)',
              color: '#f3b1e6',
              border: '2px solid #f3b1e6'
            }}
          >
            {t('stack.recruiter.mode')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StackPage; 