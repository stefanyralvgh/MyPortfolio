import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface TerminalCommand {
  command: string;
  output: string;
  delay?: number;
}

interface TerminalContextType {
  commandHistory: TerminalCommand[];
  setCommandHistory: (history: TerminalCommand[] | ((prev: TerminalCommand[]) => TerminalCommand[])) => void;
  addCommand: (command: TerminalCommand) => void;
  updateCommandOutput: (commandIndex: number, newOutput: string) => void;
  clearHistory: () => void;
  isInitialized: boolean;
  setIsInitialized: (initialized: boolean) => void;
  initializeTerminal: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

const STORAGE_KEY = 'terminal_state';
const SESSION_FLAG = 'terminal_session_active';

export const TerminalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check if this is a page reload vs navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionActive = sessionStorage.getItem(SESSION_FLAG);
      
      if (!sessionActive) {
        // This is a fresh page load/reload - clear everything
        localStorage.removeItem(STORAGE_KEY);
        setCommandHistory([]);
        setIsInitialized(false);
        // Set session flag to indicate we're in a session
        sessionStorage.setItem(SESSION_FLAG, 'true');
      } else {
        // This is navigation within the same session - load state
        loadFromLocalStorage();
      }
    }
  }, []);

  // Save to localStorage whenever commandHistory changes
  useEffect(() => {
    if (isInitialized) {
      saveToLocalStorage();
    }
  }, [commandHistory, isInitialized]);

  const saveToLocalStorage = () => {
    try {
      const stateToSave = {
        commandHistory,
        isInitialized
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving terminal state to localStorage:', error);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setCommandHistory(parsedState.commandHistory || []);
        setIsInitialized(parsedState.isInitialized || false);
      }
    } catch (error) {
      console.error('Error loading terminal state from localStorage:', error);
      // Fallback to default state
      setCommandHistory([]);
      setIsInitialized(false);
    }
  };

  const addCommand = (command: TerminalCommand) => {
    setCommandHistory(prev => {
      // If this is the same command as the last one, update it instead of adding
      if (prev.length > 0 && prev[prev.length - 1].command === command.command) {
        return [...prev.slice(0, -1), command];
      }
      return [...prev, command];
    });
  };

  const updateCommandOutput = (commandIndex: number, newOutput: string) => {
    setCommandHistory(prev => {
      const newHistory = [...prev];
      if (newHistory[commandIndex]) {
        newHistory[commandIndex] = {
          ...newHistory[commandIndex],
          output: newOutput
        };
      }
      return newHistory;
    });
  };

  const clearHistory = () => {
    setCommandHistory([{
      command: 'ssh stef@portfolio.dev',
      output: 'Welcome to Stef Portfolio Terminal!\nType "help" for available commands.',
      delay: 0
    }]);
    setIsInitialized(true);
  };

  const initializeTerminal = () => {
    if (!isInitialized) {
      setCommandHistory([{
        command: 'ssh stef@portfolio.dev',
        output: 'Welcome to Stef Portfolio Terminal!\nType "help" for available commands.',
        delay: 0
      }]);
      setIsInitialized(true);
    }
  };

  return (
    <TerminalContext.Provider value={{
      commandHistory,
      setCommandHistory,
      addCommand,
      updateCommandOutput,
      clearHistory,
      isInitialized,
      setIsInitialized,
      initializeTerminal,
      saveToLocalStorage,
      loadFromLocalStorage
    }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = (): TerminalContextType => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}; 