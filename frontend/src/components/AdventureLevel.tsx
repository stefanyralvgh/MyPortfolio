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
  const [shuffledOptions, setShuffledOptions] = useState<{ text: string; explanation: string; correct: boolean; }[]>([]);

  // Shuffle helper
  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  useEffect(() => {
    // Mezclar opciones y explicaciones manteniendo el mapeo
    const options = level.challenge.options.map((text, idx) => ({
      text,
      explanation: level.challenge.explanations ? level.challenge.explanations[idx] : '',
      correct: idx === level.challenge.correctAnswer
    }));
    setShuffledOptions(shuffleArray(options));
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(false);
  }, [level]);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setIsCorrect(shuffledOptions[index].correct);
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
            {shuffledOptions.map((option, idx) => (
              <button
                key={idx}
                className="option-button"
                onClick={() => handleOptionClick(idx)}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
        {/* Resultado, explicación e historia personal */}
        {showResult && (
          <div className="result-container" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h4>{isCorrect ? '¡Correcto!' : 'No era esa 😅'}</h4>
            {isCorrect ? null : (
              <p style={{ fontWeight: 500 }}>
                {selectedOption !== null && shuffledOptions[selectedOption]?.explanation}
              </p>
            )}
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