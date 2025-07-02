import React, { useState, useEffect } from 'react';

interface Challenge {
  scenario: string;
  error?: string;
  brokenUrl?: string;
  query?: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanations?: string[];
}

interface Story {
  title: string;
  description: string;
  tech: string[];
}

interface AdventureLevelProps {
  level: {
    id: number;
    title: string;
    type: string;
    challenge: Challenge;
    story: Story;
  };
  onComplete: (levelId: number) => void;
}

const AdventureLevel: React.FC<AdventureLevelProps> = ({ level, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setIsCorrect(index === level.challenge.correctAnswer);
    setShowResult(true);
  };

  const handleContinue = () => {
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(false);
    onComplete(level.id);
  };

  return (
    <div className="adventure-level">
      <div className="level-header">
        <h2>Nivel {level.id}: {level.title}</h2>
      </div>
      <div className="level-content">
        {/* Pregunta del reto */}
        <div className="challenge-narrative">
          <h3>📝 {level.challenge.scenario}</h3>
          {level.challenge.error && (
            <div className="error-message">
              <code>{level.challenge.error}</code>
            </div>
          )}
          {level.challenge.brokenUrl && (
            <div className="broken-url">
              <code>{level.challenge.brokenUrl}</code>
            </div>
          )}
          {level.challenge.query && (
            <div className="slow-query">
              <code>{level.challenge.query}</code>
            </div>
          )}
          {level.challenge.code && (
            <div className="code-snippet">
              <pre><code>{level.challenge.code}</code></pre>
            </div>
          )}
        </div>
        {/* Opciones tipo botón en fila horizontal, cuadradas y simétricas */}
        {!showResult && (
          <div className="options-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
            {level.challenge.options.map((option, idx) => (
              <button
                key={idx}
                className="option-button"
                onClick={() => handleOptionClick(idx)}
                style={{
                  width: '8rem',
                  height: '8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  borderRadius: '1.2rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                  background: '#f7eaff',
                  border: '2px solid #c9a4e6',
                  color: '#7a3fa4',
                  cursor: 'pointer',
                  transition: 'background 0.2s, border 0.2s',
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        {/* Resultado, explicación e historia personal */}
        {showResult && (
          <div className="result-container" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h4>{isCorrect ? '¡Correcto!' : 'No era esa 😅'}</h4>
            <p style={{ fontWeight: 500 }}>
              {selectedOption !== null && level.challenge.explanations && level.challenge.explanations[selectedOption]}
            </p>
            <div className="story-content" style={{ marginTop: '1.5rem' }}>
              <h4>Historia personal:</h4>
              <p>{level.story.description}</p>
            </div>
            <button className="continue-button" onClick={handleContinue} style={{ marginTop: '2rem' }}>
              Siguiente reto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdventureLevel; 