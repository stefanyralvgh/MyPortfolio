import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdventureLevel from '../components/AdventureLevel';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchLevels } from '../utils/api';
import { Level } from '../types';

const AdventurePage: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [showFinale, setShowFinale] = useState(false);
  const [dbLevels, setDbLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { language, t } = useLanguage();

  // Interactive challenges (these stay the same)
  const interactiveChallenges = [
    {
      id: 1,
      title: "Debug Detective",
      type: "debug",
      challenge: {
        scenario: "Clerk authentication is broken! Users can't log in.",
        error: "TypeError: Cannot read property 'keys' of undefined",
        options: [
          "Check if Clerk is properly initialized",
          "Verify the API keys are correctly set",
          "Look for typos in the authentication flow",
          "Restart the server"
        ],
        correctAnswer: 1,
        explanation: "The error suggests that 'keys' is undefined, which typically means the API keys aren't properly configured in the environment variables."
      }
    },
    {
      id: 2,
      title: "API Explorer",
      type: "api",
      challenge: {
        scenario: "The API endpoint is returning 404 errors. Fix the URL!",
        brokenUrl: "GET /api/users/123",
        options: [
          "/api/user/123",
          "/api/users/123",
          "/api/users?id=123",
          "/api/user?id=123"
        ],
        correctAnswer: 0,
        explanation: "The endpoint should be singular 'user' not plural 'users' based on the API documentation."
      }
    },
    {
      id: 3,
      title: "Database Detective",
      type: "database",
      challenge: {
        scenario: "This SQL query is running very slowly. What's wrong?",
        query: "SELECT * FROM users WHERE email LIKE '%@gmail.com'",
        options: [
          "Missing WHERE clause",
          "No index on email column",
          "Using SELECT * instead of specific columns",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "The query lacks an index on the email column, and using SELECT * is inefficient. Both issues contribute to poor performance."
      }
    },
    {
      id: 4,
      title: "Code Review Master",
      type: "code_review",
      challenge: {
        scenario: "Review this code snippet. What security issue do you spot?",
        code: `app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.findUser(username, password);
  if (user) {
    res.json({ success: true, user });
  }
});`,
        options: [
          "No input validation",
          "Passwords stored in plain text",
          "No rate limiting",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "The code lacks input validation, likely stores passwords in plain text, and has no rate limiting - all major security issues."
      }
    }
  ];

  // Fetch levels from PostgreSQL
  useEffect(() => {
    const loadLevels = async () => {
      try {
        setLoading(true);
        const levels = await fetchLevels(language);
        setDbLevels(levels);
      } catch (error) {
        console.error('Error loading levels:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLevels();
  }, [language]);

  // Combine interactive challenges with database levels
  const getCurrentLevelData = () => {
    if (currentLevel <= interactiveChallenges.length) {
      // Use interactive challenge
      const challenge = interactiveChallenges[currentLevel - 1];
      const dbLevel = dbLevels[currentLevel - 1];
      
      return {
        ...challenge,
        story: {
          title: dbLevel?.title || challenge.title,
          description: dbLevel?.description || "Historia personal de debugging y resolución de problemas.",
          tech: dbLevel?.tech || ["Debugging", "Problem Solving", "Technical Skills"]
        }
      };
    } else {
      // Use database level only
      const dbLevel = dbLevels[currentLevel - 1];
      if (!dbLevel) return null;

      return {
        id: currentLevel,
        title: dbLevel.title,
        type: "story",
        challenge: {
          scenario: "Un nuevo desafío técnico",
          options: ["Continuar"],
          correctAnswer: 0,
          explanation: "¡Excelente trabajo!"
        },
        story: {
          title: dbLevel.title,
          description: dbLevel.description,
          tech: dbLevel.tech
        }
      };
    }
  };

  const handleLevelComplete = (levelId: number) => {
    setCompletedLevels(prev => new Set(Array.from(prev).concat(levelId)));
    
    const totalLevels = Math.max(interactiveChallenges.length, dbLevels.length);
    
    if (levelId < totalLevels) {
      setTimeout(() => {
        setCurrentLevel(levelId + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowFinale(true);
      }, 2000);
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

  if (loading) {
    return (
      <div className="adventure-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (showFinale) {
    return (
      <div className="finale-container">
        <div className="finale-content">
          <h1>🎉 {t('adventure.completed')}</h1>
          <p className="finale-message">
            {t('adventure.finale.message')}
          </p>
          
          <div className="finale-stats">
            <div className="stat">
              <span className="stat-number">{Math.max(interactiveChallenges.length, dbLevels.length)}</span>
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
          
          <div className="finale-actions">
            <button 
              className="finale-button cv"
              onClick={() => handleFinaleAction('cv')}
            >
              {t('adventure.actions.cv')}
            </button>
            <button 
              className="finale-button linkedin"
              onClick={() => handleFinaleAction('linkedin')}
            >
              {t('adventure.actions.linkedin')}
            </button>
            <button 
              className="finale-button repo"
              onClick={() => handleFinaleAction('repo')}
            >
              {t('adventure.actions.repo')}
            </button>
            <button 
              className="finale-button restart"
              onClick={() => handleFinaleAction('restart')}
            >
              {t('adventure.actions.restart')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentLevelData = getCurrentLevelData();
  const totalLevels = Math.max(interactiveChallenges.length, dbLevels.length);

  return (
    <div className="adventure-container">
      <div className="adventure-header">
        <h1>{t('adventure.title')}</h1>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(completedLevels.size / totalLevels) * 100}%` }}
          ></div>
        </div>
        <p>{t('adventure.level')} {currentLevel} {t('adventure.of')} {totalLevels}</p>
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
    </div>
  );
};

export default AdventurePage; 