import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { AdventureLevelProps} from '../interfaces/commonInterfaces'



const AdventureLevel: React.FC<AdventureLevelProps> = ({ level, onComplete }) => {
  const { t, language } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<{ text: string; explanation: string; correct: boolean; }[]>([]);

  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  useEffect(() => {
    const options = level.challenge.options.map((text, idx) => ({
      text,
      explanation: '', 
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

  const getLocalizedText = (textObj: { en: string; es: string; fr: string }) => {
    return textObj[language as keyof typeof textObj] || textObj.en;
  };

  return (
    <div className="adventure-level">
      <div className="level-header">
        <h2>{t('adventure.level')} {level.id}: {getLocalizedText(level.title)}</h2>
      </div>
      <div className="level-content">
        <div className="challenge-narrative">
          <h3>{getLocalizedText(level.challenge.scenario)}</h3>
        </div>
   
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

        {showResult && (
          <div className="result-container" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h4>{isCorrect ? t('adventure.correct') : t('adventure.incorrect')}</h4>
            <p style={{ fontWeight: 500, marginBottom: '2.5rem' }}>
              {getLocalizedText(level.challenge.explanation)}
            </p>
            <button className="continue-button" onClick={handleContinue}>
              {t('adventure.next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdventureLevel; 