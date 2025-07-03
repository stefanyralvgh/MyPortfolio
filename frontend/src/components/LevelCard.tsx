import React, { useContext } from 'react';
import { Level } from '../types';
import { LanguageContext } from '../contexts/LanguageContext';

interface LevelCardProps {
  level: Level;
  onUnlock?: (levelId: number) => void;
  isUnlocked?: boolean;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, onUnlock, isUnlocked = false }) => {
  const { language } = useContext(LanguageContext);
  const handleUnlock = () => {
    if (onUnlock) {
      onUnlock(level.id);
    }
  };

  return (
    <div className={`level-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
      <div className="level-header">
        <h3>{level.titles[language]}</h3>
        <span className={`status ${isUnlocked ? 'unlocked' : 'locked'}`}>
          {isUnlocked ? '✅ Desbloqueado' : '🔒 Bloqueado'}
        </span>
      </div>
      
      <p className="description">{level.descriptions[language]}</p>
      
      <div className="tech-stack">
        <strong>Tecnologías:</strong>
        <div className="tech-tags">
          {level.tech.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {!isUnlocked && onUnlock && (
        <button 
          className="unlock-button"
          onClick={handleUnlock}
        >
          Desbloquear Nivel
        </button>
      )}
      
      {isUnlocked && (
        <div className="unlocked-message">
          ¡Nivel completado! 🎉
        </div>
      )}
    </div>
  );
};

export default LevelCard;