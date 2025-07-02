import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdventureLevel from '../components/AdventureLevel';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchLevels } from '../utils/api';
import { Level } from '../types';
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

  // Preguntas y opciones para cada nivel (puedes personalizarlas luego)
  const levelQuestions = [
    {
      question: "¿Qué es lo más importante al diseñar una API?",
      options: [
        { text: "Que sea fácil de entender y usar", correct: true, explanation: "¡Correcto! Una API clara y predecible es clave para que otros desarrolladores la adopten y la usen bien." },
        { text: "Que tenga muchos endpoints", correct: false, explanation: "No necesariamente. Lo importante es la claridad y consistencia, no la cantidad de endpoints." }
      ],
      explanations: [
        "¡Correcto! Una API clara y predecible es clave para que otros desarrolladores la adopten y la usen bien.",
        "No necesariamente. Lo importante es la claridad y consistencia, no la cantidad de endpoints."
      ]
    },
    {
      question: "¿Qué mejora el rendimiento de una consulta a base de datos?",
      options: [
        { text: "Usar índices en las columnas consultadas", correct: true, explanation: "¡Exacto! Los índices aceleran las búsquedas y mejoran el rendimiento." },
        { text: "Hacer SELECT * siempre", correct: false, explanation: "No es recomendable, ya que puede traer datos innecesarios y ralentizar la consulta." }
      ],
      explanations: [
        "¡Exacto! Los índices aceleran las búsquedas y mejoran el rendimiento.",
        "No es recomendable, ya que puede traer datos innecesarios y ralentizar la consulta."
      ]
    },
    {
      question: "¿Qué ayuda a escalar un backend?",
      options: [
        { text: "Dividir la lógica en módulos claros", correct: true, explanation: "¡Correcto! La modularidad facilita el mantenimiento y la escalabilidad." },
        { text: "Poner toda la lógica en un solo archivo", correct: false, explanation: "Eso complica el mantenimiento y limita la escalabilidad." }
      ],
      explanations: [
        "¡Correcto! La modularidad facilita el mantenimiento y la escalabilidad.",
        "Eso complica el mantenimiento y limita la escalabilidad."
      ]
    },
    {
      question: "¿Qué es esencial para un flujo de trabajo en equipo?",
      options: [
        { text: "Integración continua y buenas prácticas de git", correct: true, explanation: "¡Sí! CI/CD y git ayudan a mantener la calidad y la colaboración." },
        { text: "Hacer todo en producción directamente", correct: false, explanation: "Eso es riesgoso y puede causar errores graves. Mejor usar buenas prácticas y entornos de prueba." }
      ],
      explanations: [
        "¡Sí! CI/CD y git ayudan a mantener la calidad y la colaboración.",
        "Eso es riesgoso y puede causar errores graves. Mejor usar buenas prácticas y entornos de prueba."
      ]
    }
  ];

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

  // Usar los niveles del backend y las preguntas para armar los retos
  const getCurrentLevelData = () => {
    if (dbLevels.length && currentLevel <= dbLevels.length) {
      const dbLevel = dbLevels[currentLevel - 1];
      const q = levelQuestions[currentLevel - 1] || levelQuestions[0];
      return {
        id: dbLevel.id,
        title: dbLevel[`title_${language}`] || dbLevel.title,
        type: "quiz",
        challenge: {
          scenario: q.question,
          options: q.options.map(opt => opt.text),
          correctAnswer: q.options.findIndex(opt => opt.correct),
          explanation: q.options.find(opt => opt.correct)?.explanation || "",
          explanations: q.explanations,
        },
        story: {
          title: dbLevel[`title_${language}`] || dbLevel.title,
          description: dbLevel[`description_${language}`] || dbLevel.description,
          tech: dbLevel.tech
        }
      };
    } else {
      return null;
    }
  };

  const handleLevelComplete = (levelId: number) => {
    setCompletedLevels(prev => new Set(Array.from(prev).concat(levelId)));
    const totalLevels = dbLevels.length;
    if (levelId < totalLevels) {
      setCurrentLevel(levelId + 1);
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
            <div className="finale-actions" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '1.5rem', marginTop: '2.5rem' }}>
              <button 
                className="finale-button cv"
                onClick={() => handleFinaleAction('cv')}
                style={{ width: '10rem', height: '3.2rem', borderRadius: '2rem', fontWeight: 500, fontSize: '1rem', background: '#f7eaff', border: '2px solid #c9a4e6', color: '#7a3fa4', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              >
                <span style={{ fontSize: '1.3rem', marginRight: '0.7rem' }}>📄</span>
                <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>CV</span>
              </button>
              <button 
                className="finale-button linkedin"
                onClick={() => handleFinaleAction('linkedin')}
                style={{ width: '10rem', height: '3.2rem', borderRadius: '2rem', fontWeight: 500, fontSize: '1rem', background: '#eafff7', border: '2px solid #a4e6c9', color: '#3fa47a', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              >
                <span style={{ fontSize: '1.3rem', marginRight: '0.7rem' }}>💼</span>
                <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>LinkedIn</span>
              </button>
              <button 
                className="finale-button repo"
                onClick={() => handleFinaleAction('repo')}
                style={{ width: '10rem', height: '3.2rem', borderRadius: '2rem', fontWeight: 500, fontSize: '1rem', background: '#f7eaff', border: '2px solid #a4b6e6', color: '#3f5fa4', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              >
                <span style={{ fontSize: '1.3rem', marginRight: '0.7rem' }}>🐙</span>
                <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>Repo</span>
              </button>
              <button 
                className="finale-button restart"
                onClick={() => handleFinaleAction('restart')}
                style={{ width: '10rem', height: '3.2rem', borderRadius: '2rem', fontWeight: 500, fontSize: '1rem', background: '#fff7ea', border: '2px solid #e6c9a4', color: '#a47a3f', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              >
                <span style={{ fontSize: '1.3rem', marginRight: '0.7rem' }}>🔄</span>
                <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>Reiniciar</span>
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