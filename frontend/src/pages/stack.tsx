import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

interface StackItem {
  id: number;
  name: string;
  icon: string;
  level?: string;
}

interface StackData {
  main: StackItem[];
  familiar: StackItem[];
  tools: StackItem[];
}

const StackPage: React.FC = () => {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [stackData, setStackData] = useState<StackData>({ 
    main: [], 
    familiar: [], 
    tools: [] 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStack();
  }, []);

  const fetchStack = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/stack_items`);
      const data = await response.json();
      setStackData({
        main: data.main || [],
        familiar: data.familiar || [],
        tools: data.tools || []
      });
    } catch (error) {
      console.error('Error fetching stack:', error);
      // Mantener arrays vacíos en caso de error
      setStackData({ main: [], familiar: [], tools: [] });
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #181824 0%, #2d193c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f3b1e6',
        fontFamily: 'Courier New, Monaco, Menlo, monospace'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="stack-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #181824 0%, #2d193c 100%)',
      padding: '2rem',
      fontFamily: 'Courier New, Monaco, Menlo, monospace'
    }}>
      {/* Header */}
      <div className="header-bar">
        <h1>{t('stack.title')}</h1>
        <div className="language-switcher-fixed">
          <LanguageSwitcher hideLabel={true} />
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gap: '2rem'
      }}>
        
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
                {(stackData.main?.length || 0) + (stackData.familiar?.length || 0)}
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
                {stackData.tools?.length || 0}
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

        {/* Main Stack */}
        {stackData.main && stackData.main.length > 0 && (
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
              {stackData.main.map((tech) => (
                <div key={tech.id} style={{
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
                  {tech.level && (
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
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Familiar Technologies */}
        {stackData.familiar && stackData.familiar.length > 0 && (
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
              {stackData.familiar.map((tech) => (
                <div key={tech.id} style={{
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
                  {tech.level && (
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
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tools & Technologies */}
        {stackData.tools && stackData.tools.length > 0 && (
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
              {stackData.tools.map((tool) => (
                <div key={tool.id} style={{
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
        )}

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