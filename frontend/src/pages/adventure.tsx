import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import AdventureLevel from '../components/AdventureLevel';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchLevels } from '../utils/api';
import { Level } from '../interfaces/levelInterfaces';
import LanguageSwitcher from '../components/LanguageSwitcher';

const AdventurePage: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [showFinale, setShowFinale] = useState(false);
  const [dbLevels, setDbLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();
  const { language, t } = useLanguage();
 


  useEffect(() => {
    if (router.query.completed === 'true') {
      setIsRecruiterMode(true);
      setShowFinale(true);
    }
  }, [router.query.completed]);

  useEffect(() => {
    if (router.query.completed === 'true') {
      setLoading(false);
      return;
    }

    let loadingTimeout: NodeJS.Timeout;
    setLoading(true);
    setShowLoading(false);
    loadingTimeout = setTimeout(() => setShowLoading(true), 300);

    const loadLevels = async () => {
      try {
        const levels = await fetchLevels(language);
        setDbLevels(levels);
      } catch (error) {
        console.error('Error loading levels:', error);
      } finally {
        setLoading(false);
        clearTimeout(loadingTimeout);
        setShowLoading(false);
      }
    };

    loadLevels();
    return () => clearTimeout(loadingTimeout);
  }, [language, router.query.completed]);

  const getCurrentLevelData = () => {
    if (dbLevels.length && currentLevel <= dbLevels.length) {
      const dbLevel = dbLevels[currentLevel - 1];
      return {
        id: dbLevel.id,
        title: dbLevel.titles,
        type: "quiz",
        challenge: {
          scenario: dbLevel.question,
          options: [
            dbLevel.options.A[language as keyof typeof dbLevel.options.A] || dbLevel.options.A.en,
            dbLevel.options.B[language as keyof typeof dbLevel.options.B] || dbLevel.options.B.en
          ],
          correctAnswer: dbLevel.correct_option === 'A' ? 0 : 1,
          explanation: dbLevel.explanation,
        },
        story: {
          title: dbLevel.titles,
          description: dbLevel.descriptions,
          tech: [], 
        }
      };
    } else {
      return null;
    }
  };

  const handleLevelComplete = () => {
   
    setCompletedLevels(prev => new Set(Array.from(prev).concat(currentLevel)));
    
    if (currentLevel < dbLevels.length) {
      setCurrentLevel(currentLevel + 1);
    } else {
      setShowFinale(true);
    }
  };

  const handleFinaleAction = (action: string) => {
    switch (action) {
      case 'cv':
        window.open('/cv.pdf', '_blank');
        break;
      case 'linkedin':
        window.open('https://linkedin.com/in/stef-dev', '_blank');
        break;
      case 'repo':
        window.open('https://github.com/stef/portfolio-backend', '_blank');
        break;
      case 'restart':
        setCurrentLevel(1);
        setCompletedLevels(new Set());
        setShowFinale(false);
        break;
    }
  };

  const currentLevelData = getCurrentLevelData();
  const totalLevels = dbLevels.length;




  const handleDownloadCV = () => {
    const file = language === 'es' ? '/cv_es.pdf' : '/cv_en.pdf';
    const link = document.createElement('a');
    link.href = file;
    link.download = file.split('/').pop() || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="adventure-container">
      {/* Cabecera siempre visible */}
      <div className="adventure-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: '2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' }}>{t('adventure.title')}</h1>
          <span style={{ margin: 0, fontSize: '1.1rem', color: '#7a3fa4', fontWeight: 500, textAlign: 'center' }}>{t('adventure.level')} {currentLevel} {t('adventure.of')} {totalLevels}</span>
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
      {/* Pantalla final */}
      {!loading && showFinale && (
        <>
        <div className="finale-container">
          <div className="finale-content">
            <h1>🎉 {t('adventure.completed')}</h1>
            <p className="finale-message">
              {t('adventure.finale.message')}
            </p>
            <div className="finale-stats">
              <div className="stat">
                <span className="stat-number">{dbLevels.length}</span>
                <span className="stat-label">{t('adventure.stats.completed')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">{t('adventure.stats.debugging')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">∞</span>
                <span className="stat-label">{t('adventure.stats.possibilities')}</span>
              </div>
            </div>
            <div className="finale-actions" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '1.5rem', marginTop: '2.5rem', position: 'relative' }}>
              {/* Botón CV */}
              <button 
                className="finale-button cv"
                onClick={handleDownloadCV}
                style={{ width: '10rem', height: '3.2rem', borderRadius: '2rem', fontWeight: 500, fontSize: '1rem', background: '#f7eaff', border: '2px solid #c9a4e6', color: '#7a3fa4', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              >
                <span style={{ fontSize: '1.3rem', marginRight: '0.7rem' }}>📄</span>
                <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>CV</span>
              </button>
              {/* LinkedIn */}
              <button 
                className="finale-button linkedin"
                onClick={() => window.open('https://www.linkedin.com/in/stefanyralvli/', '_blank')}
                style={{ width: '10rem', height: '3.2rem', borderRadius: '2rem', fontWeight: 500, fontSize: '1rem', background: '#eafff7', border: '2px solid #a4e6c9', color: '#3fa47a', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              >
                <span style={{ fontSize: '1.3rem', marginRight: '0.7rem' }}>💼</span>
                <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>LinkedIn</span>
              </button>
              {/* Repo */}
              <button 
                className="finale-button repo"
                onClick={() => window.open('https://github.com/stefanyralvgh/MyPortfolio', '_blank')}
                style={{ width: '10rem', height: '3.2rem', borderRadius: '2rem', fontWeight: 500, fontSize: '1rem', background: '#f7eaff', border: '2px solid #a4b6e6', color: '#3f5fa4', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              >
                <span style={{ fontSize: '1.3rem', marginRight: '0.7rem' }}>🐙</span>
                <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>Repo</span>
              </button>
              {/* Reiniciar */}
              <button 
                className="finale-button restart"
                onClick={() => handleFinaleAction('restart')}
                style={{ width: '10rem', height: '3.2rem', borderRadius: '2rem', fontWeight: 500, fontSize: '1rem', background: '#fff7ea', border: '2px solid #e6c9a4', color: '#a47a3f', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              >
                <span style={{ fontSize: '1.3rem' }}>🔄</span>
                {t('adventure.restart')}
              </button>
            </div>
          </div>
        </div>
        <div className="adventure-footer">
          <button 
            className="back-button"
            onClick={() => router.push('/')}
          >
            {t('adventure.back')}
          </button>
        </div>
        </>
      )}
      {/* Flujo normal de niveles */}
      {!loading && !showFinale && (
        <>
          <div className="progress-bar" style={{ marginBottom: '1.5rem' }}>
            <div 
              className="progress-fill" 
              style={{ width: `${(completedLevels.size / totalLevels) * 100}%` }}
            ></div>
          </div>
          {currentLevelData && (
            <AdventureLevel
              level={currentLevelData}
              onComplete={handleLevelComplete}
            />
          )}
          <div className="adventure-footer">
            <button 
              className="back-button"
              onClick={() => router.push('/')}
            >
              {t('adventure.back')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdventurePage; 