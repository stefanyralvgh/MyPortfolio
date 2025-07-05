import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TerminalCommand {
  command: string;
  output: string;
  delay?: number;
}

interface TerminalContextType {
  commandHistory: TerminalCommand[];
  setCommandHistory: (history: TerminalCommand[] | ((prev: TerminalCommand[]) => TerminalCommand[])) => void;
  addCommand: (command: TerminalCommand) => void;
  clearHistory: () => void;
  isInitialized: boolean;
  setIsInitialized: (initialized: boolean) => void;
  initializeTerminal: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const addCommand = (command: TerminalCommand) => {
    setCommandHistory(prev => {
      // If this is the same command as the last one, update it instead of adding
      if (prev.length > 0 && prev[prev.length - 1].command === command.command) {
        return [...prev.slice(0, -1), command];
      }
      return [...prev, command];
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
      clearHistory,
      isInitialized,
      setIsInitialized,
      initializeTerminal
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