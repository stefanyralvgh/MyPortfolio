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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setIsCorrect(answerIndex === level.challenge.correctAnswer);
    setShowResult(true);
  };

  const handleContinue = () => {
    if (showResult && !showExplanation) {
      setShowExplanation(true);
    } else if (showExplanation && !showStory) {
      setShowStory(true);
    } else if (showStory) {
      onComplete(level.id);
    }
  };

  const renderChallenge = () => {
    switch (level.type) {
      case 'debug':
        return (
          <div className="challenge-content debug">
            <div className="scenario">
              <h3>🐛 {level.challenge.scenario}</h3>
              <div className="error-message">
                <code>{level.challenge.error}</code>
              </div>
            </div>
          </div>
        );
      
      case 'api':
        return (
          <div className="challenge-content api">
            <div className="scenario">
              <h3>🔗 {level.challenge.scenario}</h3>
              <div className="broken-url">
                <code>{level.challenge.brokenUrl}</code>
              </div>
            </div>
          </div>
        );
      
      case 'database':
        return (
          <div className="challenge-content database">
            <div className="scenario">
              <h3>🗄️ {level.challenge.scenario}</h3>
              <div className="slow-query">
                <code>{level.challenge.query}</code>
              </div>
            </div>
          </div>
        );
      
      case 'code_review':
        return (
          <div className="challenge-content code-review">
            <div className="scenario">
              <h3>🔍 {level.challenge.scenario}</h3>
              <div className="code-snippet">
                <pre><code>{level.challenge.code}</code></pre>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderOptions = () => {
    return (
      <div className="options-container">
        <h4>¿Cuál es la solución correcta?</h4>
        <div className="options-grid">
          {level.challenge.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === index 
                  ? isCorrect 
                    ? 'correct' 
                    : 'incorrect'
                  : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!showResult) return null;

    return (
      <div className={`result-container ${isCorrect ? 'success' : 'error'}`}>
        <div className="result-icon">
          {isCorrect ? '✅' : '❌'}
        </div>
        <div className="result-message">
          <h3>{isCorrect ? '¡Correcto!' : 'Incorrecto'}</h3>
          <p>{isCorrect ? 'Excelente debugging skills!' : 'No te preocupes, aprenderemos juntos.'}</p>
        </div>
        <button className="continue-button" onClick={handleContinue}>
          Continuar
        </button>
      </div>
    );
  };

  const renderExplanation = () => {
    if (!showExplanation) return null;

    return (
      <div className="explanation-container">
        <h3>💡 Explicación</h3>
        <p>{level.challenge.explanation}</p>
        <button className="continue-button" onClick={handleContinue}>
          Ver mi historia
        </button>
      </div>
    );
  };

  const renderStory = () => {
    if (!showStory) return null;

    return (
      <div className="story-container">
        <div className="story-header">
          <h2>🎉 ¡Nivel Desbloqueado!</h2>
          <h3>{level.story.title}</h3>
        </div>
        
        <div className="story-content">
          <p>{level.story.description}</p>
          
          <div className="tech-stack">
            <h4>Tecnologías utilizadas:</h4>
            <div className="tech-tags">
              {level.story.tech.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <button className="continue-button" onClick={handleContinue}>
          {level.id < 4 ? 'Siguiente Nivel' : 'Completar Aventura'}
        </button>
      </div>
    );
  };

  return (
    <div className="adventure-level">
      <div className="level-header">
        <h2>Nivel {level.id}: {level.title}</h2>
      </div>
      
      <div className="level-content">
        {!showResult && (
          <>
            {renderChallenge()}
            {renderOptions()}
          </>
        )}
        
        {renderResult()}
        {renderExplanation()}
        {renderStory()}
      </div>
    </div>
  );
};

export default AdventureLevel; 